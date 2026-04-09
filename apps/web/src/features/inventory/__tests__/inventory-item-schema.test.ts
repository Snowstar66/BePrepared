import {
  inventoryItemFormSchema,
  toInventoryItemRecord,
} from '../schemas/inventory-item-schema'

describe('inventoryItemFormSchema', () => {
  it('requires name, category and quantity', () => {
    const result = inventoryItemFormSchema.safeParse({
      name: '',
      category: '',
      quantity: '',
      unit: '',
      bestBefore: '',
    })

    expect(result.success).toBe(false)
  })

  it('maps a valid inventory item to a persisted record', () => {
    const parsed = inventoryItemFormSchema.parse({
      name: 'Vattenflaska',
      category: 'water',
      quantity: '6',
      unit: 'liter',
      bestBefore: '',
    })

    const record = toInventoryItemRecord(parsed)

    expect(record.name).toBe('Vattenflaska')
    expect(record.category).toBe('water')
    expect(record.quantity).toBe(6)
    expect(record.unit).toBe('liter')
    expect(record.bestBefore).toBeNull()
  })
})
