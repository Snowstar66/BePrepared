import { ReminderSettingsRepository } from '../repository/reminder-settings-repository'
import {
  defaultReminderSettingsFormValues,
  reminderSettingsFormSchema,
  toReminderSettingsRecord,
  type ReminderSettingsFormValues,
} from '../schemas/reminder-settings-schema'

function supportsSystemNotifications() {
  return typeof window !== 'undefined' && 'Notification' in window
}

export class ReminderSettingsService {
  private readonly repository: ReminderSettingsRepository

  constructor(
    repository: ReminderSettingsRepository = new ReminderSettingsRepository(),
  ) {
    this.repository = repository
  }

  async loadFormValues() {
    const settings = await this.repository.getSettings()

    if (settings === null) {
      return defaultReminderSettingsFormValues
    }

    return {
      cadence: settings.cadence,
    } satisfies ReminderSettingsFormValues
  }

  async loadSettings() {
    return this.repository.getSettings()
  }

  async save(values: ReminderSettingsFormValues) {
    const parsedValues = reminderSettingsFormSchema.parse(values)
    const notificationMode =
      supportsSystemNotifications() &&
      window.Notification.permission === 'granted'
        ? 'system'
        : 'in-app'

    const record = toReminderSettingsRecord(parsedValues, notificationMode)

    await this.repository.saveSettings(record)

    return record
  }

  async getNotificationSupportSummary() {
    if (!supportsSystemNotifications()) {
      return {
        mode: 'in-app',
        message:
          'Den här enheten erbjuder inte systemnotiser, så vi visar påminnelsen i appen i stället.',
      } as const
    }

    if (window.Notification.permission !== 'granted') {
      return {
        mode: 'in-app',
        message:
          'Systemnotiser är inte tillgängliga just nu. Påminnelsen finns kvar som en tydlig markering i appen.',
      } as const
    }

    return {
      mode: 'system',
      message:
        'Systemnotiser är tillgängliga. Appen visar också alltid nästa påminnelse i gränssnittet.',
    } as const
  }
}
