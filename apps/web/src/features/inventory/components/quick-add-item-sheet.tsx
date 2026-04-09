import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  actionStackStyle,
  fieldStyle,
  inputStyle,
  pageIntroStyle,
  primaryButtonStyle,
  surfaceCardStyle,
} from '../../../shared/ui/styles'
import { recordFeedbackForAddedItem } from '../../preparedness-status/lib/preparedness-delta-feedback'
import { InventoryService } from '../services/inventory-service'
import {
  defaultInventoryItemFormValues,
  inventoryCategoryOptions,
  inventoryItemFormSchema,
  type InventoryItemFormValues,
} from '../schemas/inventory-item-schema'

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
    setSaveMessage(`${savedItem.name} är tillagd i ditt förråd.`)
  }

  return (
    <section aria-labelledby="quick-add-item-title" style={surfaceCardStyle}>
      <div style={{ display: 'grid', gap: '8px' }}>
        <h2 id="quick-add-item-title" style={{ margin: 0, color: '#173042' }}>
          Lägg till vara
        </h2>
        <p style={pageIntroStyle}>
          Registrera en vara med så få fält som möjligt. Namn, kategori och antal
          räcker för att komma igång.
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
          <select id="category" style={inputStyle} defaultValue="" {...register('category')}>
            <option value="" disabled>
              Välj kategori
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
            <label htmlFor="unit">Enhet, valfritt</label>
            <input
              id="unit"
              placeholder="t.ex. liter eller st"
              style={inputStyle}
              {...register('unit')}
            />
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
            {isSubmitting ? 'Sparar...' : 'Lägg till vara'}
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
