import { PreparednessGapService } from '../../preparedness-gap/services/preparedness-gap-service'
import { ShoppingOverviewRepository } from '../repository/shopping-overview-repository'
import type {
  ShoppingOverviewEntry,
  ShoppingOverviewSnapshotRecord,
} from '../schemas/shopping-overview-schema'
import { createShoppingOverviewEntries } from '../utils/create-shopping-overview'

export interface ShoppingOverviewResult {
  entries: ShoppingOverviewEntry[]
  resolvedEntries: ShoppingOverviewEntry[]
  snapshot: ShoppingOverviewSnapshotRecord | null
}

export class ShoppingOverviewService {
  private readonly preparednessGapService: PreparednessGapService
  private readonly shoppingOverviewRepository: ShoppingOverviewRepository

  constructor(
    preparednessGapService: PreparednessGapService = new PreparednessGapService(),
    shoppingOverviewRepository: ShoppingOverviewRepository = new ShoppingOverviewRepository(),
  ) {
    this.preparednessGapService = preparednessGapService
    this.shoppingOverviewRepository = shoppingOverviewRepository
  }

  async loadOverview(): Promise<ShoppingOverviewResult | null> {
    const [analysis, snapshot] = await Promise.all([
      this.preparednessGapService.loadAnalysis(),
      this.shoppingOverviewRepository.getSnapshot(),
    ])

    if (analysis === null) {
      return null
    }

    const entries = createShoppingOverviewEntries(analysis)
    const resolvedEntries =
      snapshot?.entries.filter(
        (savedEntry) => !entries.some((entry) => entry.key === savedEntry.key),
      ) ?? []

    return {
      entries,
      resolvedEntries,
      snapshot,
    }
  }

  async saveOverview(entries: ShoppingOverviewEntry[]) {
    const snapshot: ShoppingOverviewSnapshotRecord = {
      id: 'primary',
      entries,
      updatedAt: new Date().toISOString(),
    }

    await this.shoppingOverviewRepository.saveSnapshot(snapshot)

    return snapshot
  }
}
