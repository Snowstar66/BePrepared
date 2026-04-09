import {
  householdProfileFormSchema,
  toHouseholdProfileFormValues,
  toHouseholdProfileRecord,
} from '../schemas/household-profile-schema'

describe('householdProfileFormSchema', () => {
  it('requires at least one adult', () => {
    const result = householdProfileFormSchema.safeParse({
      adults: '0',
      children: '',
      hasPets: false,
    })

    expect(result.success).toBe(false)
  })

  it('allows blank optional children input and maps persisted values', () => {
    const parsed = householdProfileFormSchema.parse({
      adults: '2',
      children: '',
      hasPets: true,
    })

    const record = toHouseholdProfileRecord(parsed)

    expect(record.adults).toBe(2)
    expect(record.children).toBe(0)
    expect(record.hasPets).toBe(true)

    expect(toHouseholdProfileFormValues(record)).toEqual({
      adults: '2',
      children: '',
      hasPets: true,
    })
  })
})
