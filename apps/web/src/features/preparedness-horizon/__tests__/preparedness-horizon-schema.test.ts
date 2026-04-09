import {
  preparednessHorizonFormSchema,
  toPreparednessHorizonFormValues,
  toPreparednessHorizonRecord,
} from '../schemas/preparedness-horizon-schema'

describe('preparednessHorizonFormSchema', () => {
  it('accepts the required horizon options and maps them to persisted data', () => {
    const parsed = preparednessHorizonFormSchema.parse({
      horizon: '72-hours',
    })

    const record = toPreparednessHorizonRecord(parsed)

    expect(record.horizon).toBe('72-hours')
    expect(record.label).toBe('72 timmar')
    expect(toPreparednessHorizonFormValues(record)).toEqual({
      horizon: '72-hours',
    })
  })

  it('requires a selected horizon before save', () => {
    const result = preparednessHorizonFormSchema.safeParse({
      horizon: '',
    })

    expect(result.success).toBe(false)
  })
})
