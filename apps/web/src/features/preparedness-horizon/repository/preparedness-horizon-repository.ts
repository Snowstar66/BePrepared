import { getAppDb, type BePreparedAppDb } from '../../../shared/lib/dexie/app-db'
import type { PreparednessHorizonRecord } from '../schemas/preparedness-horizon-schema'

export class PreparednessHorizonRepository {
  private readonly db: BePreparedAppDb

  constructor(db: BePreparedAppDb = getAppDb()) {
    this.db = db
  }

  async getSelection() {
    return (await this.db.preparednessHorizons.get('primary')) ?? null
  }

  async saveSelection(record: PreparednessHorizonRecord) {
    await this.db.preparednessHorizons.put(record)
    return record
  }
}
