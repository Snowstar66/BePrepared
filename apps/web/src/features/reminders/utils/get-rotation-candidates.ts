import type { InventoryItemRecord } from '../../inventory/schemas/inventory-item-schema'

export interface RotationCandidate {
  item: InventoryItemRecord
  daysUntilBestBefore: number
  statusLabel: string
}

function differenceInDays(from: Date, to: Date) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  return Math.ceil((to.getTime() - from.getTime()) / millisecondsPerDay)
}

function wasRecentlyRotated(item: InventoryItemRecord, now: Date) {
  if (item.lastRotatedAt == null) {
    return false
  }

  return differenceInDays(new Date(item.lastRotatedAt), now) < 14
}

export function getRotationCandidates(
  items: InventoryItemRecord[],
  now = new Date(),
) {
  return items
    .filter((item) => item.bestBefore !== null)
    .filter((item) => !wasRecentlyRotated(item, now))
    .map((item) => {
      const daysUntilBestBefore = differenceInDays(now, new Date(item.bestBefore!))

      return {
        item,
        daysUntilBestBefore,
        statusLabel:
          daysUntilBestBefore < 0
            ? 'Har passerat datum'
            : daysUntilBestBefore <= 14
              ? 'Borde granskas snart'
              : 'Planera in kontroll',
      } satisfies RotationCandidate
    })
    .filter((candidate) => candidate.daysUntilBestBefore <= 30)
    .sort((left, right) => left.daysUntilBestBefore - right.daysUntilBestBefore)
}
