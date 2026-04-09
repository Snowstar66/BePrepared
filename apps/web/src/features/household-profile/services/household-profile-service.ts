import {
  defaultHouseholdProfileFormValues,
  householdProfileFormSchema,
  toHouseholdProfileFormValues,
  toHouseholdProfileRecord,
  type HouseholdProfileFormValues,
} from '../schemas/household-profile-schema'
import { HouseholdProfileRepository } from '../repository/household-profile-repository'

export class HouseholdProfileService {
  private readonly repository: HouseholdProfileRepository

  constructor(
    repository: HouseholdProfileRepository = new HouseholdProfileRepository(),
  ) {
    this.repository = repository
  }

  async loadFormValues() {
    const profile = await this.repository.getProfile()

    if (profile === null) {
      return defaultHouseholdProfileFormValues
    }

    return toHouseholdProfileFormValues(profile)
  }

  async loadProfile() {
    return this.repository.getProfile()
  }

  async save(values: HouseholdProfileFormValues) {
    const parsedValues = householdProfileFormSchema.parse(values)
    const record = toHouseholdProfileRecord(parsedValues)

    await this.repository.saveProfile(record)

    return toHouseholdProfileFormValues(record)
  }
}
