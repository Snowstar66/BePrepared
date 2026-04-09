import { HouseholdProfileService } from '../../household-profile/services/household-profile-service'
import { PreparednessHorizonService } from '../../preparedness-horizon/services/preparedness-horizon-service'
import { calculateBaselinePreparednessNeeds } from '../calculators/baseline-needs-calculator'

export class PreparednessNeedsService {
  private readonly householdProfileService: HouseholdProfileService
  private readonly preparednessHorizonService: PreparednessHorizonService

  constructor(
    householdProfileService: HouseholdProfileService = new HouseholdProfileService(),
    preparednessHorizonService: PreparednessHorizonService = new PreparednessHorizonService(),
  ) {
    this.householdProfileService = householdProfileService
    this.preparednessHorizonService = preparednessHorizonService
  }

  async loadNeeds() {
    const [profile, horizon] = await Promise.all([
      this.householdProfileService.loadProfile(),
      this.preparednessHorizonService.loadSelection(),
    ])

    if (profile === null || horizon === null) {
      return null
    }

    return calculateBaselinePreparednessNeeds(profile, horizon)
  }
}
