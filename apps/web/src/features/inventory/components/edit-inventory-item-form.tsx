import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  actionStackStyle,
  fieldStyle,
  getDangerButtonStyle,
  inputStyle,
  mutedCardStyle,
  pageIntroStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
  warmCardStyle,
} from '../../../shared/ui/styles'
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
    setSaveMessage(`${updatedItem.name} är uppdaterad i ditt förråd.`)
  }

  async function handleDelete() {
    if (!itemId || !isDeleteArmed) {
      return
    }

    if (loadedItem !== null) {
      recordFeedbackForDeletedItem(loadedItem)
    }
    await inventoryService.deleteItem(itemId)
    setDeleteMessage('Varan är borttagen från ditt förråd.')
    setTimeout(() => {
      void navigate('/forrad')
    }, 0)
  }

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Laddar varan...</p>
  }

  if (itemMissing) {
    return (
      <section style={mutedCardStyle}>
        <h2 style={{ margin: 0, color: '#173042' }}>Varan kunde inte hittas</h2>
        <p style={pageIntroStyle}>
          Den kan redan ha tagits bort. Gå tillbaka till lageröversikten och välj
          en annan artikel.
        </p>
        <Link to="/forrad" style={secondaryButtonStyle}>
          Tillbaka till förrådet
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
        style={mutedCardStyle}
      >
        <div style={fieldStyle}>
          <label htmlFor="name">Varans namn</label>
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
            <label htmlFor="unit">Enhet, valfritt</label>
            <input id="unit" style={inputStyle} {...register('unit')} />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="bestBefore">Bäst före, valfritt</label>
            <input
              id="bestBefore"
              type="date"
              style={inputStyle}
              {...register('bestBefore')}
            />
          </div>
        </div>

        <div style={actionStackStyle}>
          <button type="submit" disabled={isSubmitting} style={primaryButtonStyle}>
            {isSubmitting ? 'Sparar...' : 'Spara ändringar'}
          </button>

          {saveMessage ? (
            <p role="status" style={{ margin: 0, color: '#1d5b3a' }}>
              {saveMessage}
            </p>
          ) : null}
        </div>
      </form>

      <section aria-labelledby="delete-item-title" style={warmCardStyle}>
        <h2 id="delete-item-title" style={{ margin: 0, color: '#173042' }}>
          Ta bort varan
        </h2>
        <p style={pageIntroStyle}>
          Det här är en permanent ändring. Bekräfta att du verkligen vill ta bort
          varan innan vi genomför den.
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
          <span>Jag vill ta bort den här varan från förrådet</span>
        </label>
        <button
          type="button"
          disabled={!isDeleteArmed}
          onClick={() => {
            void handleDelete()
          }}
          style={getDangerButtonStyle(isDeleteArmed)}
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
