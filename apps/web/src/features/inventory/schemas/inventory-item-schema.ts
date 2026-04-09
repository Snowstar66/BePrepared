import { z } from 'zod'

export const inventoryCategoryOptions = [
  { value: 'water', label: 'Vatten' },
  { value: 'food', label: 'Mat' },
  { value: 'other', label: 'Ovrigt' },
] as const

export type InventoryCategory = (typeof inventoryCategoryOptions)[number]['value']

export interface InventoryItemFormValues {
  name: string
  category: string
  quantity: string
  unit: string
  bestBefore: string
}

export interface InventoryItemRecord {
  id: string
  name: string
  category: InventoryCategory
  quantity: number
  unit: string
  bestBefore: string | null
  lastRotatedAt?: string | null
  createdAt: string
  updatedAt: string
}

export const defaultInventoryItemFormValues: InventoryItemFormValues = {
  name: '',
  category: '',
  quantity: '',
  unit: '',
  bestBefore: '',
}

export const inventoryItemFormSchema = z.object({
  name: z.string().trim().min(1, 'Ange ett namn for varan.'),
  category: z
    .string()
    .trim()
    .min(1, 'Valj en kategori.')
    .refine(
      (value): value is InventoryCategory =>
        inventoryCategoryOptions.some((option) => option.value === value),
      'Valj en giltig kategori.',
    ),
  quantity: z
    .string()
    .trim()
    .min(1, 'Ange antal.')
    .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, {
      message: 'Antal maste vara storre an 0.',
    }),
  unit: z.string().trim(),
  bestBefore: z.string().trim(),
})

export function getInventoryCategoryLabel(category: InventoryCategory) {
  return (
    inventoryCategoryOptions.find((option) => option.value === category)?.label ??
    category
  )
}

export function toInventoryItemRecord(
  values: InventoryItemFormValues,
): InventoryItemRecord {
  const parsedValues = inventoryItemFormSchema.parse(values)
  const now = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    name: parsedValues.name,
    category: parsedValues.category as InventoryCategory,
    quantity: Number(parsedValues.quantity),
    unit: parsedValues.unit === '' ? 'st' : parsedValues.unit,
    bestBefore: parsedValues.bestBefore === '' ? null : parsedValues.bestBefore,
    lastRotatedAt: null,
    createdAt: now,
    updatedAt: now,
  }
}
