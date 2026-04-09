import { getAppDb } from '../../../shared/lib/dexie/app-db'
import type { ReminderSettingsRecord } from '../schemas/reminder-settings-schema'

export class ReminderSettingsRepository {
  async getSettings() {
    return (await getAppDb().reminderSettings.get('primary')) ?? null
  }

  async saveSettings(record: ReminderSettingsRecord) {
    await getAppDb().reminderSettings.put(record)
    return record
  }
}
