import { getAppDb, type BePreparedAppDb } from '../../../shared/lib/dexie/app-db'
import type { InventoryItemRecord } from '../schemas/inventory-item-schema'

export class InventoryRepository {
  private readonly db: BePreparedAppDb

  constructor(db: BePreparedAppDb = getAppDb()) {
    this.db = db
  }

  async addItem(record: InventoryItemRecord) {
    await this.db.inventoryItems.put(record)
    return record
  }

  async getItem(id: string) {
    return (await this.db.inventoryItems.get(id)) ?? null
  }

  async updateItem(record: InventoryItemRecord) {
    await this.db.inventoryItems.put(record)
    return record
  }

  async deleteItem(id: string) {
    await this.db.inventoryItems.delete(id)
  }

  async listItems() {
    const items = await this.db.inventoryItems.toArray()

    return items.sort((left, right) =>
      left.createdAt.localeCompare(right.createdAt),
    )
  }
}
