export type ShoppingOverviewPriority = 'high' | 'medium'

export interface ShoppingOverviewEntry {
  key: 'water' | 'food'
  label: string
  priority: ShoppingOverviewPriority
  priorityLabel: string
  summary: string
  recommendation: string
}

export interface ShoppingOverviewSnapshotRecord {
  id: 'primary'
  entries: ShoppingOverviewEntry[]
  updatedAt: string
}
