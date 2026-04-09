import { getRotationCandidates } from '../utils/get-rotation-candidates'
import type { InventoryItemRecord } from '../../inventory/schemas/inventory-item-schema'

function createItem(overrides: Partial<InventoryItemRecord>): InventoryItemRecord {
  return {
    id: overrides.id ?? crypto.randomUUID(),
    name: overrides.name ?? 'Testvara',
    category: overrides.category ?? 'food',
    quantity: overrides.quantity ?? 2,
    unit: overrides.unit ?? 'st',
    bestBefore:
      Object.hasOwn(overrides, 'bestBefore') && overrides.bestBefore !== undefined
        ? overrides.bestBefore
        : '2026-05-10',
    lastRotatedAt: overrides.lastRotatedAt ?? null,
    createdAt: overrides.createdAt ?? '2026-04-01T10:00:00.000Z',
    updatedAt: overrides.updatedAt ?? '2026-04-01T10:00:00.000Z',
  }
}

describe('getRotationCandidates', () => {
  it('returns items with upcoming best-before dates and ignores items without dates', () => {
    const candidates = getRotationCandidates(
      [
        createItem({ name: 'Pasta', bestBefore: '2026-04-20' }),
        createItem({ name: 'Ris', bestBefore: null }),
      ],
      new Date('2026-04-10T00:00:00.000Z'),
    )

    expect(candidates).toHaveLength(1)
    expect(candidates[0]?.item.name).toBe('Pasta')
  })

  it('hides items that were recently rotated', () => {
    const candidates = getRotationCandidates(
      [
        createItem({
          name: 'Konservburk',
          bestBefore: '2026-04-18',
          lastRotatedAt: '2026-04-05T00:00:00.000Z',
        }),
      ],
      new Date('2026-04-10T00:00:00.000Z'),
    )

    expect(candidates).toHaveLength(0)
  })
})
