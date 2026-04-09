import Dexie, { type Table } from 'dexie'
import type { PublishedGuide } from '@beprepared/shared'
import type { HouseholdProfileRecord } from '../../../features/household-profile/schemas/household-profile-schema'
import type { InventoryItemRecord } from '../../../features/inventory/schemas/inventory-item-schema'
import type { PreparednessHorizonRecord } from '../../../features/preparedness-horizon/schemas/preparedness-horizon-schema'
import type { ReminderSettingsRecord } from '../../../features/reminders/schemas/reminder-settings-schema'
import type { ShoppingOverviewSnapshotRecord } from '../../../features/shopping-overview/schemas/shopping-overview-schema'

const APP_DB_NAME = 'BePreparedAppDb'

export interface CachedGuideRecord {
  id: string
  scenario: PublishedGuide['scenario']
  title: PublishedGuide['title']
  summary: PublishedGuide['summary']
  steps: PublishedGuide['steps']
  sourceName: PublishedGuide['sourceName']
  sourceUrl: PublishedGuide['sourceUrl']
  publisher: PublishedGuide['publisher']
  reviewStatus: PublishedGuide['reviewStatus']
  reviewedAt: PublishedGuide['reviewedAt']
  updatedAt: PublishedGuide['updatedAt']
  version: PublishedGuide['version']
  cachedAt: string
}

export class BePreparedAppDb extends Dexie {
  householdProfiles!: Table<HouseholdProfileRecord, string>
  preparednessHorizons!: Table<PreparednessHorizonRecord, string>
  inventoryItems!: Table<InventoryItemRecord, string>
  shoppingOverviews!: Table<ShoppingOverviewSnapshotRecord, string>
  reminderSettings!: Table<ReminderSettingsRecord, string>
  cachedGuides!: Table<CachedGuideRecord, string>

  constructor(name = APP_DB_NAME) {
    super(name)

    this.version(1).stores({
      householdProfiles: '&id, updatedAt',
    })

    this.version(2).stores({
      householdProfiles: '&id, updatedAt',
      preparednessHorizons: '&id, updatedAt',
    })

    this.version(3).stores({
      householdProfiles: '&id, updatedAt',
      preparednessHorizons: '&id, updatedAt',
      inventoryItems: '&id, category, updatedAt',
    })

    this.version(4).stores({
      householdProfiles: '&id, updatedAt',
      preparednessHorizons: '&id, updatedAt',
      inventoryItems: '&id, category, updatedAt',
      shoppingOverviews: '&id, updatedAt',
    })

    this.version(5).stores({
      householdProfiles: '&id, updatedAt',
      preparednessHorizons: '&id, updatedAt',
      inventoryItems: '&id, category, updatedAt',
      shoppingOverviews: '&id, updatedAt',
      reminderSettings: '&id, updatedAt',
      cachedGuides: '&id, scenario, cachedAt',
    })
  }
}

let appDbInstance: BePreparedAppDb | null = null

export function getAppDb() {
  if (appDbInstance === null) {
    appDbInstance = new BePreparedAppDb()
  }

  return appDbInstance
}

export function createAppDb(name: string) {
  return new BePreparedAppDb(name)
}

export async function resetAppDbForTests() {
  if (appDbInstance !== null) {
    appDbInstance.close()
    appDbInstance = null
  }

  await Dexie.delete(APP_DB_NAME)
}
