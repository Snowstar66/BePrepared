import { groupInventoryItems } from '../utils/group-inventory-items'

describe('groupInventoryItems', () => {
  it('groups inventory items into water, food and other with simple summaries', () => {
    const groups = groupInventoryItems([
      {
        id: '1',
        name: 'Vattenflaska',
        category: 'water',
        quantity: 6,
        unit: 'liter',
        bestBefore: null,
        createdAt: '2026-04-08T00:00:00.000Z',
        updatedAt: '2026-04-08T00:00:00.000Z',
      },
      {
        id: '2',
        name: 'Konserv',
        category: 'food',
        quantity: 4,
        unit: 'st',
        bestBefore: null,
        createdAt: '2026-04-08T00:01:00.000Z',
        updatedAt: '2026-04-08T00:01:00.000Z',
      },
      {
        id: '3',
        name: 'Ficklampa',
        category: 'other',
        quantity: 1,
        unit: 'st',
        bestBefore: null,
        createdAt: '2026-04-08T00:02:00.000Z',
        updatedAt: '2026-04-08T00:02:00.000Z',
      },
    ])

    expect(groups.map((group) => group.category)).toEqual([
      'water',
      'food',
      'other',
    ])
    expect(groups[0]?.summary.quantityLabel).toBe('6 liter')
    expect(groups[1]?.summary.quantityLabel).toBe('4 st')
    expect(groups[2]?.summary.itemCount).toBe(1)
  })

  it('avoids false precision when units differ inside a category', () => {
    const [waterGroup] = groupInventoryItems([
      {
        id: '1',
        name: 'Vattendunk',
        category: 'water',
        quantity: 10,
        unit: 'liter',
        bestBefore: null,
        createdAt: '2026-04-08T00:00:00.000Z',
        updatedAt: '2026-04-08T00:00:00.000Z',
      },
      {
        id: '2',
        name: 'Vattenflaska',
        category: 'water',
        quantity: 2,
        unit: 'st',
        bestBefore: null,
        createdAt: '2026-04-08T00:01:00.000Z',
        updatedAt: '2026-04-08T00:01:00.000Z',
      },
    ])

    expect(waterGroup?.summary.itemCount).toBe(2)
    expect(waterGroup?.summary.quantityLabel).toBeNull()
  })
})
