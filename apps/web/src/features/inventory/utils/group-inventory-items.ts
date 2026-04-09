import {
  getInventoryCategoryLabel,
  inventoryCategoryOptions,
  type InventoryCategory,
  type InventoryItemRecord,
} from '../schemas/inventory-item-schema'

export interface InventoryCategorySummary {
  itemCount: number
  quantityLabel: string | null
}

export interface InventoryCategoryGroupData {
  category: InventoryCategory
  label: string
  items: InventoryItemRecord[]
  summary: InventoryCategorySummary
}

export function buildInventoryCategorySummary(
  items: InventoryItemRecord[],
): InventoryCategorySummary {
  if (items.length === 0) {
    return {
      itemCount: 0,
      quantityLabel: null,
    }
  }

  const units = new Set(items.map((item) => item.unit))

  if (units.size === 1) {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
    const unit = items[0]?.unit ?? ''

    return {
      itemCount: items.length,
      quantityLabel: `${totalQuantity} ${unit}`,
    }
  }

  return {
    itemCount: items.length,
    quantityLabel: null,
  }
}

export function groupInventoryItems(
  items: InventoryItemRecord[],
): InventoryCategoryGroupData[] {
  return inventoryCategoryOptions.map((option) => {
    const categoryItems = items.filter((item) => item.category === option.value)

    return {
      category: option.value,
      label: getInventoryCategoryLabel(option.value),
      items: categoryItems,
      summary: buildInventoryCategorySummary(categoryItems),
    }
  })
}
