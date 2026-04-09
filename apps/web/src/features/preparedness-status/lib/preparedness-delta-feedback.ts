import type { InventoryItemRecord } from '../../inventory/schemas/inventory-item-schema'

const DELTA_FEEDBACK_STORAGE_KEY = 'bePrepared.preparednessDeltaFeedback'
const LITER_UNITS = new Set(['l', 'liter', 'liters', 'ltr'])
const MEAL_UNITS = new Set(['måltid', 'måltider', 'maltid', 'maltider', 'portion', 'portioner'])

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
      noun: 'matluckan',
      unit: 'måltider',
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
      body: `${formatQuantity(item.quantity)} ${exactDescriptor.unit} lades till och ${exactDescriptor.noun} räknades om direkt.`,
    })
    return
  }

  savePreparednessDeltaFeedback({
    title: 'Lagret har uppdaterats',
    body: `${item.name} lades till i kategorin ${item.category}. Statusen har räknats om, men enheten ger inte ett exakt mått på förändringen.`,
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
        title: 'Beredskapen har stärkts',
        body: `${formatQuantity(delta)} ${nextDescriptor.unit} lades till i uppdateringen och ${nextDescriptor.noun} räknades om.`,
      })
      return
    }

    if (delta < 0) {
      savePreparednessDeltaFeedback({
        title: 'Beredskapen har förändrats',
        body: `${formatQuantity(Math.abs(delta))} ${nextDescriptor.unit} togs bort i uppdateringen och ${nextDescriptor.noun} räknades om.`,
      })
      return
    }
  }

  savePreparednessDeltaFeedback({
    title: 'Lagret har uppdaterats',
    body: `${nextItem.name} ändrades och statusen räknades om. Effekten visas utan falsk precision eftersom enhet eller kategori inte går att tolka exakt.`,
  })
}

export function recordFeedbackForDeletedItem(item: InventoryItemRecord) {
  const exactDescriptor = getExactCategoryDescriptor(item)

  if (exactDescriptor !== null) {
    savePreparednessDeltaFeedback({
      title: 'Beredskapen har förändrats',
      body: `${formatQuantity(item.quantity)} ${exactDescriptor.unit} togs bort och ${exactDescriptor.noun} kan nu vara större än tidigare.`,
    })
    return
  }

  savePreparednessDeltaFeedback({
    title: 'Lagret har uppdaterats',
    body: `${item.name} togs bort. Statusen räknades om, men effekten visas utan exakt förändring eftersom enheten inte går att tolka entydigt.`,
  })
}
