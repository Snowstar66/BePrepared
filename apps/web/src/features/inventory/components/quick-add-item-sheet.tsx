import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { recordFeedbackForAddedItem } from '../../preparedness-status/lib/preparedness-delta-feedback'
import { InventoryService } from '../services/inventory-service'
import {
  defaultInventoryItemFormValues,
  inventoryCategoryOptions,
  inventoryItemFormSchema,
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

export function QuickAddItemSheet() {
  const [saveMessage, setSaveMessage] = useState('')
  const [inventoryService] = useState(() => new InventoryService())
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InventoryItemFormValues>({
    defaultValues: defaultInventoryItemFormValues,
    resolver: zodResolver(inventoryItemFormSchema),
  })

  async function onSubmit(values: InventoryItemFormValues) {
    const savedItem = await inventoryService.addItem(values)
    recordFeedbackForAddedItem(savedItem)
    reset({
      ...defaultInventoryItemFormValues,
      unit: savedItem.unit === 'st' ? '' : savedItem.unit,
    })
    setSaveMessage(`${savedItem.name} ar lagd i ditt forrad.`)
  }

  return (
    <section
      aria-labelledby="quick-add-item-title"
      style={{
        display: 'grid',
        gap: '20px',
        padding: '20px',
        borderRadius: '20px',
        background: '#f7fbfc',
        border: '1px solid #d7e5eb',
      }}
    >
      <div style={{ display: 'grid', gap: '8px' }}>
        <h2 id="quick-add-item-title" style={{ margin: 0, color: '#173042' }}>
          QuickAddItemSheet
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Registrera en vara med sa fa falt som mojligt. Namn, kategori och antal
          ar nog for att komma vidare.
        </p>
      </div>

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
          <select id="category" style={inputStyle} defaultValue="" {...register('category')}>
            <option value="" disabled>
              Valj kategori
            </option>
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
            <input
              id="unit"
              placeholder="t.ex. liter eller st"
              style={inputStyle}
              {...register('unit')}
            />
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
            {isSubmitting ? 'Sparar...' : 'Lagg till vara'}
          </button>

          {saveMessage ? (
            <p role="status" style={{ margin: 0, color: '#1d5b3a' }}>
              {saveMessage}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  )
}
