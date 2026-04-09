import { HouseholdProfileService } from '../../household-profile/services/household-profile-service'
import { InventoryService } from '../../inventory/services/inventory-service'
import { PreparednessHorizonService } from '../../preparedness-horizon/services/preparedness-horizon-service'
import { ReminderSettingsService } from '../../reminders/services/reminder-settings-service'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'
import {
  LocalDataCorruptionError,
  LocalDataManagementService,
} from '../services/local-data-management-service'

describe('LocalDataManagementService', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it('exports and imports validated local data', async () => {
    await new HouseholdProfileService().save({
      adults: '2',
      children: '1',
      hasPets: false,
    })
    await new PreparednessHorizonService().save({ horizon: '72-hours' })
    await new InventoryService().addItem({
      name: 'Vattendunk',
      category: 'water',
      quantity: '6',
      unit: 'liter',
      bestBefore: '',
    })
    await new ReminderSettingsService().save({ cadence: 'monthly' })

    const service = new LocalDataManagementService()
    const exportedJson = await service.exportToJson()

    await service.clearAllData()
    await service.importFromJson(exportedJson)

    expect(await new HouseholdProfileService().loadProfile()).not.toBeNull()
    expect((await new InventoryService().listItems())).toHaveLength(1)
  })

  it('rejects invalid import payloads with a recovery-friendly error', async () => {
    const service = new LocalDataManagementService()

    await expect(
      service.importFromJson(JSON.stringify({ version: 999 })),
    ).rejects.toBeInstanceOf(LocalDataCorruptionError)
  })
})
