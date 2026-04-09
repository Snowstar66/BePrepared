import { InventoryRepository } from '../repository/inventory-repository'
import {
  inventoryItemFormSchema,
  type InventoryItemRecord,
  toInventoryItemRecord,
  type InventoryItemFormValues,
} from '../schemas/inventory-item-schema'

export class InventoryService {
  private readonly repository: InventoryRepository

  constructor(repository: InventoryRepository = new InventoryRepository()) {
    this.repository = repository
  }

  async addItem(values: InventoryItemFormValues) {
    const parsedValues = inventoryItemFormSchema.parse(values)
    const record = toInventoryItemRecord(parsedValues)

    await this.repository.addItem(record)

    return record
  }

  async getItem(id: string) {
    return this.repository.getItem(id)
  }

  async loadFormValues(id: string) {
    const item = await this.repository.getItem(id)

    if (item === null) {
      return null
    }

    return {
      name: item.name,
      category: item.category,
      quantity: String(item.quantity),
      unit: item.unit === 'st' ? '' : item.unit,
      bestBefore: item.bestBefore ?? '',
    }
  }

  async updateItem(id: string, values: InventoryItemFormValues) {
    const existingItem = await this.repository.getItem(id)

    if (existingItem === null) {
      return null
    }

    const parsedValues = inventoryItemFormSchema.parse(values)
    const updatedRecord: InventoryItemRecord = {
      ...existingItem,
      name: parsedValues.name,
      category: parsedValues.category as InventoryItemRecord['category'],
      quantity: Number(parsedValues.quantity),
      unit: parsedValues.unit === '' ? 'st' : parsedValues.unit,
      bestBefore: parsedValues.bestBefore === '' ? null : parsedValues.bestBefore,
      updatedAt: new Date().toISOString(),
    }

    await this.repository.updateItem(updatedRecord)

    return updatedRecord
  }

  async markItemAsRotated(id: string) {
    const existingItem = await this.repository.getItem(id)

    if (existingItem === null) {
      return null
    }

    const updatedRecord: InventoryItemRecord = {
      ...existingItem,
      lastRotatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await this.repository.updateItem(updatedRecord)

    return updatedRecord
  }

  async consumeItem(id: string) {
    const existingItem = await this.repository.getItem(id)

    if (existingItem === null) {
      return null
    }

    if (existingItem.quantity <= 1) {
      await this.repository.deleteItem(id)
      return null
    }

    const updatedRecord: InventoryItemRecord = {
      ...existingItem,
      quantity: existingItem.quantity - 1,
      updatedAt: new Date().toISOString(),
    }

    await this.repository.updateItem(updatedRecord)

    return updatedRecord
  }

  async deleteItem(id: string) {
    await this.repository.deleteItem(id)
  }

  async listItems() {
    return this.repository.listItems()
  }
}
