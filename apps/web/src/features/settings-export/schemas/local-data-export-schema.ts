import { z } from 'zod'

const householdProfileRecordSchema = z.object({
  id: z.literal('primary'),
  adults: z.number(),
  children: z.number(),
  hasPets: z.boolean(),
  updatedAt: z.string(),
})

const preparednessHorizonRecordSchema = z.object({
  id: z.literal('primary'),
  horizon: z.enum(['72-hours', '7-days']),
  label: z.string(),
  updatedAt: z.string(),
})

const inventoryItemRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['water', 'food', 'other']),
  quantity: z.number(),
  unit: z.string(),
  bestBefore: z.string().nullable(),
  lastRotatedAt: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const shoppingOverviewEntrySchema = z.object({
  key: z.enum(['water', 'food']),
  label: z.string(),
  summary: z.string(),
  recommendation: z.string(),
  priority: z.enum(['high', 'medium']),
  priorityLabel: z.string(),
})

const shoppingOverviewSnapshotSchema = z.object({
  id: z.literal('primary'),
  entries: z.array(shoppingOverviewEntrySchema),
  updatedAt: z.string(),
})

const reminderSettingsRecordSchema = z.object({
  id: z.literal('primary'),
  cadence: z.enum(['monthly', 'quarterly']),
  nextReminderAt: z.string(),
  notificationMode: z.enum(['system', 'in-app']),
  updatedAt: z.string(),
})

const guideStepSchema = z.object({
  title: z.string(),
  body: z.string(),
})

const cachedGuideRecordSchema = z.object({
  id: z.string(),
  scenario: z.enum(['stromavbrott', 'vattenbrist', 'allman-kris']),
  title: z.string(),
  summary: z.string(),
  steps: z.array(guideStepSchema),
  sourceName: z.string(),
  sourceUrl: z.string(),
  publisher: z.string(),
  reviewStatus: z.enum(['reviewed', 'updated']),
  reviewedAt: z.string(),
  updatedAt: z.string(),
  version: z.number(),
  cachedAt: z.string(),
})

export const localDataExportSchema = z.object({
  version: z.literal(1),
  exportedAt: z.string(),
  householdProfile: householdProfileRecordSchema.nullable(),
  preparednessHorizon: preparednessHorizonRecordSchema.nullable(),
  inventoryItems: z.array(inventoryItemRecordSchema),
  shoppingOverview: shoppingOverviewSnapshotSchema.nullable(),
  reminderSettings: reminderSettingsRecordSchema.nullable(),
  cachedGuides: z.array(cachedGuideRecordSchema),
})

export type LocalDataExport = z.infer<typeof localDataExportSchema>
