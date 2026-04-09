import type { InventoryItemRecord } from '../../inventory/schemas/inventory-item-schema'

const DELTA_FEEDBACK_STORAGE_KEY = 'bePrepared.preparednessDeltaFeedback'
const LITER_UNITS = new Set(['l', 'liter', 'liters', 'ltr'])
const MEAL_UNITS = new Set(['maltid', 'maltider', 'portion', 'portioner'])

export interface PreparednessDeltaFeedbackPayload {
  title: string
  body: string
}

function normalizeUnit(unit: string) {
  return unit.trim().toLowerCase()
}

function formatQuantity(value: number) {
  if (Number.isInteger(value)) {
    return String(value)
  }

  return value.toFixed(1).replace(/\.0$/, '')
}

function getExactCategoryDescriptor(item: InventoryItemRecord) {
  if (item.category === 'water' && LITER_UNITS.has(normalizeUnit(item.unit))) {
    return {
      noun: 'vattengapet',
      unit: 'liter',
    }
  }

  if (item.category === 'food' && MEAL_UNITS.has(normalizeUnit(item.unit))) {
    return {
      noun: 'matgapet',
      unit: 'maltider',
    }
  }

  return null
}

function savePreparednessDeltaFeedback(payload: PreparednessDeltaFeedbackPayload) {
  window.sessionStorage.setItem(
    DELTA_FEEDBACK_STORAGE_KEY,
    JSON.stringify(payload),
  )
}

export function consumePreparednessDeltaFeedback() {
  const rawPayload = window.sessionStorage.getItem(DELTA_FEEDBACK_STORAGE_KEY)

  if (rawPayload === null) {
    return null
  }

  window.sessionStorage.removeItem(DELTA_FEEDBACK_STORAGE_KEY)

  try {
    return JSON.parse(rawPayload) as PreparednessDeltaFeedbackPayload
  } catch {
    return null
  }
}

export function recordFeedbackForAddedItem(item: InventoryItemRecord) {
  const exactDescriptor = getExactCategoryDescriptor(item)

  if (exactDescriptor !== null) {
    savePreparednessDeltaFeedback({
      title: 'Beredskapen har uppdaterats',
      body: `${formatQuantity(item.quantity)} ${exactDescriptor.unit} lades till och ${exactDescriptor.noun} raknades om direkt.`,
    })
    return
  }

  savePreparednessDeltaFeedback({
    title: 'Lagret har uppdaterats',
    body: `${item.name} lades till i kategorin ${item.category}. Statusen ar omraknad, men enheten ger inte en exakt delta for gapet.`,
  })
}

export function recordFeedbackForUpdatedItem(
  previousItem: InventoryItemRecord,
  nextItem: InventoryItemRecord,
) {
  const previousDescriptor = getExactCategoryDescriptor(previousItem)
  const nextDescriptor = getExactCategoryDescriptor(nextItem)

  if (
    previousDescriptor !== null &&
    nextDescriptor !== null &&
    previousItem.category === nextItem.category
  ) {
    const delta = nextItem.quantity - previousItem.quantity

    if (delta > 0) {
      savePreparednessDeltaFeedback({
        title: 'Beredskapen har forstarkts',
        body: `${formatQuantity(delta)} ${nextDescriptor.unit} lades till i uppdateringen och ${nextDescriptor.noun} raknades om.`,
      })
      return
    }

    if (delta < 0) {
      savePreparednessDeltaFeedback({
        title: 'Beredskapen har andrats',
        body: `${formatQuantity(Math.abs(delta))} ${nextDescriptor.unit} togs bort i uppdateringen och ${nextDescriptor.noun} raknades om.`,
      })
      return
    }
  }

  savePreparednessDeltaFeedback({
    title: 'Lagret har uppdaterats',
    body: `${nextItem.name} andrades och statusen ar omraknad. Enheten eller kategorin gor att effekten visas utan falsk precision.`,
  })
}

export function recordFeedbackForDeletedItem(item: InventoryItemRecord) {
  const exactDescriptor = getExactCategoryDescriptor(item)

  if (exactDescriptor !== null) {
    savePreparednessDeltaFeedback({
      title: 'Beredskapen har andrats',
      body: `${formatQuantity(item.quantity)} ${exactDescriptor.unit} togs bort och ${exactDescriptor.noun} kan nu vara storre an tidigare.`,
    })
    return
  }

  savePreparednessDeltaFeedback({
    title: 'Lagret har uppdaterats',
    body: `${item.name} togs bort. Statusen ar omraknad, men effekten visas utan exakt delta eftersom enheten inte gar att tolka entydigt.`,
  })
}
