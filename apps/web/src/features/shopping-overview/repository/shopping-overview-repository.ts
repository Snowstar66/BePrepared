import { getAppDb } from '../../../shared/lib/dexie/app-db'
import type { ShoppingOverviewSnapshotRecord } from '../schemas/shopping-overview-schema'

export class ShoppingOverviewRepository {
  async getSnapshot() {
    const appDb = getAppDb()

    return (await appDb.shoppingOverviews.get('primary')) ?? null
  }

  async saveSnapshot(record: ShoppingOverviewSnapshotRecord) {
    const appDb = getAppDb()

    await appDb.shoppingOverviews.put(record)
  }
}
