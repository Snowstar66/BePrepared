import { calculatePreparednessGapAnalysis } from '../calculators/preparedness-gap-calculator'
import type { BaselinePreparednessNeeds } from '../../preparedness-needs/calculators/baseline-needs-calculator'
import type { InventoryItemRecord } from '../../inventory/schemas/inventory-item-schema'

function createInventoryItem(
  overrides: Partial<InventoryItemRecord>,
): InventoryItemRecord {
  return {
    id: crypto.randomUUID(),
    name: 'Testvara',
    category: 'other',
    quantity: 1,
    unit: 'st',
    bestBefore: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }
}

const baseNeeds: BaselinePreparednessNeeds = {
  horizonLabel: '72 timmar',
  days: 3,
  peopleCount: 2,
  dailyWaterLiters: 6,
  totalWaterLiters: 18,
  dailyMeals: 6,
  totalMeals: 18,
  foodCategories: [],
  methodNotes: [],
  petsNote: null,
  disclaimer: 'Planeringsstöd',
  nextStep: 'Jämför med lagret.',
}

describe('calculatePreparednessGapAnalysis', () => {
  it('calculates exact gaps when the units support exact comparison', () => {
    const analysis = calculatePreparednessGapAnalysis(baseNeeds, [
      createInventoryItem({
        category: 'water',
        quantity: 12,
        unit: 'liter',
      }),
      createInventoryItem({
        category: 'food',
        quantity: 6,
        unit: 'portioner',
      }),
    ])

    expect(analysis.categories[0]?.status).toBe('partial')
    expect(analysis.categories[0]?.gapLabel).toMatch(/6 liter saknas/i)
    expect(analysis.categories[1]?.status).toBe('partial')
    expect(analysis.categories[1]?.gapLabel).toMatch(/12 måltider saknas/i)
  })

  it('marks uncertain units instead of pretending to know the exact gap', () => {
    const analysis = calculatePreparednessGapAnalysis(baseNeeds, [
      createInventoryItem({
        category: 'water',
        quantity: 4,
        unit: 'flaskor',
      }),
      createInventoryItem({
        category: 'food',
        quantity: 3,
        unit: 'st',
      }),
    ])

    expect(analysis.categories[0]?.status).toBe('uncertain')
    expect(analysis.categories[0]?.inventoryLabel).toMatch(/osäker enhet/i)
    expect(analysis.categories[1]?.status).toBe('uncertain')
    expect(analysis.categories[1]?.gapLabel).toMatch(/går inte att översätta exakt/i)
  })
})
