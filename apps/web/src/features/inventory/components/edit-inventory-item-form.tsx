import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  recordFeedbackForDeletedItem,
  recordFeedbackForUpdatedItem,
} from '../../preparedness-status/lib/preparedness-delta-feedback'
import { InventoryService } from '../services/inventory-service'
import {
  defaultInventoryItemFormValues,
  inventoryCategoryOptions,
  inventoryItemFormSchema,
  type InventoryItemRecord,
  type InventoryItemFormValues,
} from '../schemas/inventory-item-schema'

const fieldStyle = {
  display: 'grid',
  gap: '8px',
}

const inputStyle = {
  minHeight: '44px',
  width: '100%',
  padding: '10px 12px',
  borderRadius: '12px',
  border: '1px solid #b7c8d4',
  background: '#f8fbfc',
  color: '#173042',
}

export function EditInventoryItemForm() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const [inventoryService] = useState(() => new InventoryService())
  const [isLoading, setIsLoading] = useState(() => itemId !== undefined)
  const [saveMessage, setSaveMessage] = useState('')
  const [deleteMessage, setDeleteMessage] = useState('')
  const [isDeleteArmed, setIsDeleteArmed] = useState(false)
  const [itemMissing, setItemMissing] = useState(() => itemId === undefined)
  const [loadedItem, setLoadedItem] = useState<InventoryItemRecord | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InventoryItemFormValues>({
    defaultValues: defaultInventoryItemFormValues,
    resolver: zodResolver(inventoryItemFormSchema),
  })

  useEffect(() => {
    let isMounted = true

    if (!itemId) {
      return
    }

    void inventoryService.loadFormValues(itemId).then((values) => {
      if (!isMounted) {
        return
      }

      if (values === null) {
        setItemMissing(true)
        setIsLoading(false)
        return
      }

      void inventoryService.getItem(itemId).then((item) => {
        if (!isMounted) {
          return
        }

        setLoadedItem(item)
        reset(values)
        setIsLoading(false)
      })
    })

    return () => {
      isMounted = false
    }
  }, [inventoryService, itemId, reset])

  async function onSubmit(values: InventoryItemFormValues) {
    if (!itemId) {
      return
    }

    const updatedItem = await inventoryService.updateItem(itemId, values)

    if (updatedItem === null) {
      setItemMissing(true)
      return
    }

    if (loadedItem !== null) {
      recordFeedbackForUpdatedItem(loadedItem, updatedItem)
    }

    reset({
      name: updatedItem.name,
      category: updatedItem.category,
      quantity: String(updatedItem.quantity),
      unit: updatedItem.unit === 'st' ? '' : updatedItem.unit,
      bestBefore: updatedItem.bestBefore ?? '',
    })
    setLoadedItem(updatedItem)
    setDeleteMessage('')
    setSaveMessage(`${updatedItem.name} ar uppdaterad i ditt forrad.`)
  }

  async function handleDelete() {
    if (!itemId || !isDeleteArmed) {
      return
    }

    if (loadedItem !== null) {
      recordFeedbackForDeletedItem(loadedItem)
    }
    await inventoryService.deleteItem(itemId)
    setDeleteMessage('Varan ar borttagen fran ditt forrad.')
    setTimeout(() => {
      void navigate('/forrad')
    }, 0)
  }

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Laddar varan...</p>
  }

  if (itemMissing) {
    return (
      <section
        style={{
          display: 'grid',
          gap: '12px',
          padding: '16px',
          borderRadius: '16px',
          background: '#eef5f7',
        }}
      >
        <h2 style={{ margin: 0, color: '#173042' }}>Varan kunde inte hittas</h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Den kan redan vara borttagen. Ga tillbaka till lageroversikten och valj en
          annan artikel.
        </p>
        <Link
          to="/forrad"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '44px',
            minHeight: '44px',
            padding: '12px 18px',
            borderRadius: '999px',
            background: '#173042',
            color: '#f6fbfd',
            textDecoration: 'none',
          }}
        >
          Tillbaka till forradet
        </Link>
      </section>
    )
  }

  return (
    <section style={{ display: 'grid', gap: '24px' }}>
      <form
        onSubmit={(event) => {
          setSaveMessage('')
          void handleSubmit(onSubmit)(event)
        }}
        style={{ display: 'grid', gap: '16px' }}
      >
        <div style={fieldStyle}>
          <label htmlFor="name">Namn pa vara</label>
          <input id="name" style={inputStyle} {...register('name')} />
          {errors.name ? (
            <p role="alert" style={{ margin: 0, color: '#9b1c1c' }}>
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label htmlFor="category">Kategori</label>
          <select id="category" style={inputStyle} {...register('category')}>
            {inventoryCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.category ? (
            <p role="alert" style={{ margin: 0, color: '#9b1c1c' }}>
              {errors.category.message}
            </p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label htmlFor="quantity">Antal</label>
          <input
            id="quantity"
            inputMode="decimal"
            type="number"
            min="0.1"
            step="0.1"
            style={inputStyle}
            {...register('quantity')}
          />
          {errors.quantity ? (
            <p role="alert" style={{ margin: 0, color: '#9b1c1c' }}>
              {errors.quantity.message}
            </p>
          ) : null}
        </div>

        <div
          style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          }}
        >
          <div style={fieldStyle}>
            <label htmlFor="unit">Enhet (valfritt)</label>
            <input id="unit" style={inputStyle} {...register('unit')} />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="bestBefore">Bast fore (valfritt)</label>
            <input
              id="bestBefore"
              type="date"
              style={inputStyle}
              {...register('bestBefore')}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: 'none',
              background: '#173042',
              color: '#f6fbfd',
            }}
          >
            {isSubmitting ? 'Sparar...' : 'Spara andringar'}
          </button>

          {saveMessage ? (
            <p role="status" style={{ margin: 0, color: '#1d5b3a' }}>
              {saveMessage}
            </p>
          ) : null}
        </div>
      </form>

      <section
        aria-labelledby="delete-item-title"
        style={{
          display: 'grid',
          gap: '12px',
          padding: '16px',
          borderRadius: '16px',
          background: '#fff4e8',
        }}
      >
        <h2 id="delete-item-title" style={{ margin: 0, color: '#173042' }}>
          Ta bort varan
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Den har handlingen ar destruktiv. Bekrafta att du verkligen vill ta bort
          varan innan vi gor andringen.
        </p>
        <label
          htmlFor="confirm-delete"
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <input
            id="confirm-delete"
            type="checkbox"
            checked={isDeleteArmed}
            onChange={(event) => {
              setIsDeleteArmed(event.target.checked)
              setSaveMessage('')
            }}
            style={{ minWidth: '20px', minHeight: '20px' }}
          />
          <span>Jag vill ta bort den har varan fran forradet</span>
        </label>
        <button
          type="button"
          disabled={!isDeleteArmed}
          onClick={() => {
            void handleDelete()
          }}
          style={{
            minWidth: '44px',
            minHeight: '44px',
            padding: '12px 18px',
            borderRadius: '999px',
            border: '1px solid #8a2d1f',
            background: isDeleteArmed ? '#8a2d1f' : '#f9e6e2',
            color: isDeleteArmed ? '#fff8f6' : '#8a2d1f',
          }}
        >
          Ta bort vara
        </button>

        {deleteMessage ? (
          <p role="status" style={{ margin: 0, color: '#1d5b3a' }}>
            {deleteMessage}
          </p>
        ) : null}
      </section>
    </section>
  )
}
