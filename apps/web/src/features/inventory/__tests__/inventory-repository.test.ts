import { createAppDb } from '../../../shared/lib/dexie/app-db'
import { InventoryRepository } from '../repository/inventory-repository'

describe('InventoryRepository', () => {
  it('stores and lists locally added inventory items', async () => {
    const db = createAppDb(`inventory-test-${crypto.randomUUID()}`)
    const repository = new InventoryRepository(db)

    await repository.addItem({
      id: 'inventory-1',
      name: 'Konserver',
      category: 'food',
      quantity: 4,
      unit: 'st',
      bestBefore: null,
      createdAt: '2026-04-08T00:00:00.000Z',
      updatedAt: '2026-04-08T00:00:00.000Z',
    })

    await expect(repository.listItems()).resolves.toEqual([
      {
        id: 'inventory-1',
        name: 'Konserver',
        category: 'food',
        quantity: 4,
        unit: 'st',
        bestBefore: null,
        createdAt: '2026-04-08T00:00:00.000Z',
        updatedAt: '2026-04-08T00:00:00.000Z',
      },
    ])

    db.close()
    await db.delete()
  })
})
