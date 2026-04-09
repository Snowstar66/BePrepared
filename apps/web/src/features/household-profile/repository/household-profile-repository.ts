import { getAppDb, type BePreparedAppDb } from '../../../shared/lib/dexie/app-db'
import type { HouseholdProfileRecord } from '../schemas/household-profile-schema'

export class HouseholdProfileRepository {
  private readonly db: BePreparedAppDb

  constructor(db: BePreparedAppDb = getAppDb()) {
    this.db = db
  }

  async getProfile() {
    return (await this.db.householdProfiles.get('primary')) ?? null
  }

  async saveProfile(record: HouseholdProfileRecord) {
    await this.db.householdProfiles.put(record)
    return record
  }
}
