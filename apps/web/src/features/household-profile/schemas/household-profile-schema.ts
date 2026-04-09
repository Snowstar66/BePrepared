import { z } from 'zod'

const requiredPositiveInteger = z
  .string()
  .trim()
  .min(1, 'Ange antal vuxna.')
  .refine((value) => Number.isInteger(Number(value)) && Number(value) >= 1, {
    message: 'Antal vuxna maste vara minst 1.',
  })

const optionalNonNegativeInteger = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === '' ||
      (Number.isInteger(Number(value)) && Number(value) >= 0),
    {
      message: 'Antal barn maste vara 0 eller hoger.',
    },
  )

export const householdProfileFormSchema = z.object({
  adults: requiredPositiveInteger,
  children: optionalNonNegativeInteger,
  hasPets: z.boolean(),
})

export type HouseholdProfileFormValues = z.infer<
  typeof householdProfileFormSchema
>

export interface HouseholdProfileRecord {
  id: 'primary'
  adults: number
  children: number
  hasPets: boolean
  updatedAt: string
}

export const defaultHouseholdProfileFormValues: HouseholdProfileFormValues = {
  adults: '',
  children: '',
  hasPets: false,
}

export function toHouseholdProfileRecord(
  values: HouseholdProfileFormValues,
): HouseholdProfileRecord {
  return {
    id: 'primary',
    adults: Number(values.adults),
    children: values.children === '' ? 0 : Number(values.children),
    hasPets: values.hasPets,
    updatedAt: new Date().toISOString(),
  }
}

export function toHouseholdProfileFormValues(
  record: HouseholdProfileRecord,
): HouseholdProfileFormValues {
  return {
    adults: String(record.adults),
    children: record.children === 0 ? '' : String(record.children),
    hasPets: record.hasPets,
  }
}
