import { z } from 'zod'

export const preparednessHorizonOptions = [
  {
    value: '72-hours',
    label: '72 timmar',
    description: 'Bra nar du vill planera for den kortare grundnivan.',
  },
  {
    value: '7-days',
    label: '7 dagar',
    description: 'Bra nar du vill planera for en langre och mer robust period.',
  },
] as const

export type PreparednessHorizon =
  (typeof preparednessHorizonOptions)[number]['value']

export interface PreparednessHorizonFormValues {
  horizon: string
}

export interface PreparednessHorizonRecord {
  id: 'primary'
  horizon: PreparednessHorizon
  label: string
  updatedAt: string
}

export const defaultPreparednessHorizonFormValues: PreparednessHorizonFormValues =
  {
    horizon: '',
  }

export const preparednessHorizonFormSchema = z.object({
  horizon: z
    .string()
    .trim()
    .min(1, 'Valj en beredskapshorisont.')
    .refine(
      (value): value is PreparednessHorizon =>
        preparednessHorizonOptions.some((option) => option.value === value),
      'Valj en giltig beredskapshorisont.',
    ),
})

export function getPreparednessHorizonLabel(horizon: PreparednessHorizon) {
  return (
    preparednessHorizonOptions.find((option) => option.value === horizon)?.label ??
    horizon
  )
}

export function getPreparednessHorizonDays(horizon: PreparednessHorizon) {
  if (horizon === '7-days') {
    return 7
  }

  return 3
}

export function toPreparednessHorizonRecord(
  values: PreparednessHorizonFormValues,
): PreparednessHorizonRecord {
  const parsedValues = preparednessHorizonFormSchema.parse(values)
  const horizon = parsedValues.horizon as PreparednessHorizon

  return {
    id: 'primary',
    horizon,
    label: getPreparednessHorizonLabel(horizon),
    updatedAt: new Date().toISOString(),
  }
}

export function toPreparednessHorizonFormValues(
  record: PreparednessHorizonRecord,
): PreparednessHorizonFormValues {
  return {
    horizon: record.horizon,
  }
}
