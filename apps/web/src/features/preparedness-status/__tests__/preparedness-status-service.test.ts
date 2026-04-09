import { PreparednessStatusService } from '../services/preparedness-status-service'
import { HouseholdProfileService } from '../../household-profile/services/household-profile-service'
import { InventoryService } from '../../inventory/services/inventory-service'
import { PreparednessHorizonService } from '../../preparedness-horizon/services/preparedness-horizon-service'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'

describe('PreparednessStatusService', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it('returns missing state when setup data is not complete', async () => {
    const service = new PreparednessStatusService()

    const overview = await service.loadOverview()

    expect(overview.state).toBe('missing')
    expect(overview.nextStepHref).toBe('/profil')
  })

  it('returns complete state when water and food cover the baseline exactly', async () => {
    const householdProfileService = new HouseholdProfileService()
    const preparednessHorizonService = new PreparednessHorizonService()
    const inventoryService = new InventoryService()
    const service = new PreparednessStatusService()

    await householdProfileService.save({
      adults: '1',
      children: '0',
      hasPets: false,
    })
    await preparednessHorizonService.save({
      horizon: '72-hours',
    })
    await inventoryService.addItem({
      name: 'Vatten',
      category: 'water',
      quantity: '9',
      unit: 'liter',
      bestBefore: '',
    })
    await inventoryService.addItem({
      name: 'Matkit',
      category: 'food',
      quantity: '9',
      unit: 'portioner',
      bestBefore: '',
    })

    const overview = await service.loadOverview()

    expect(overview.state).toBe('complete')
    expect(overview.statusTitle).toMatch(/grundnivan ar pa plats/i)
  })
})
