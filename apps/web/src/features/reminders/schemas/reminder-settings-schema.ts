import { z } from 'zod'

export const reminderCadenceOptions = [
  { value: 'monthly', label: 'Månadsvis' },
  { value: 'quarterly', label: 'Kvartalsvis' },
] as const

export type ReminderCadence = (typeof reminderCadenceOptions)[number]['value']

export interface ReminderSettingsFormValues {
  cadence: string
}

export interface ReminderSettingsRecord {
  id: string
  cadence: ReminderCadence
  nextReminderAt: string
  notificationMode: 'system' | 'in-app'
  updatedAt: string
}

export const reminderSettingsFormSchema = z.object({
  cadence: z
    .string()
    .trim()
    .refine(
      (value): value is ReminderCadence =>
        reminderCadenceOptions.some((option) => option.value === value),
      'Välj en giltig påminnelserytm.',
    ),
})

export const defaultReminderSettingsFormValues: ReminderSettingsFormValues = {
  cadence: 'monthly',
}

export function calculateNextReminderAt(cadence: ReminderCadence, now = new Date()) {
  const nextReminder = new Date(now)

  nextReminder.setMonth(
    nextReminder.getMonth() + (cadence === 'monthly' ? 1 : 3),
  )

  return nextReminder.toISOString()
}

export function toReminderSettingsRecord(
  values: ReminderSettingsFormValues,
  notificationMode: ReminderSettingsRecord['notificationMode'],
) {
  const parsedValues = reminderSettingsFormSchema.parse(values)

  return {
    id: 'primary',
    cadence: parsedValues.cadence,
    nextReminderAt: calculateNextReminderAt(parsedValues.cadence),
    notificationMode,
    updatedAt: new Date().toISOString(),
  } satisfies ReminderSettingsRecord
}
