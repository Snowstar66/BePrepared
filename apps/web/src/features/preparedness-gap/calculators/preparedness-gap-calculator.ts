import type { InventoryItemRecord } from '../../inventory/schemas/inventory-item-schema'
import type { BaselinePreparednessNeeds } from '../../preparedness-needs/calculators/baseline-needs-calculator'

const LITER_UNITS = new Set(['l', 'liter', 'liters', 'ltr'])
const MEAL_UNITS = new Set(['maltid', 'maltider', 'portion', 'portioner'])

export type PreparednessGapStatus = 'covered' | 'partial' | 'missing' | 'uncertain'

export interface PreparednessGapCategoryAnalysis {
  key: 'water' | 'food'
  label: string
  status: PreparednessGapStatus
  statusLabel: string
  needLabel: string
  inventoryLabel: string
  gapLabel: string
  notes: string[]
}

export interface PreparednessGapAnalysis {
  horizonLabel: string
  categories: PreparednessGapCategoryAnalysis[]
  summary: string
  nextStep: string
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

function pluralize(count: number, singular: string, plural: string) {
  if (count === 1) {
    return singular
  }

  return plural
}

function buildWaterGapAnalysis(
  needs: BaselinePreparednessNeeds,
  items: InventoryItemRecord[],
): PreparednessGapCategoryAnalysis {
  const waterItems = items.filter((item) => item.category === 'water')
  const measurableWaterItems = waterItems.filter((item) =>
    LITER_UNITS.has(normalizeUnit(item.unit)),
  )
  const uncertainWaterItems = waterItems.length - measurableWaterItems.length
  const measuredLiters = measurableWaterItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  )
  const exactGap = Math.max(needs.totalWaterLiters - measuredLiters, 0)

  if (uncertainWaterItems > 0) {
    return {
      key: 'water',
      label: 'Vatten',
      status: 'uncertain',
      statusLabel: 'Osaker jamforelse',
      needLabel: `${needs.totalWaterLiters} liter behov for ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel: `${formatQuantity(measuredLiters)} liter registrerat + ${uncertainWaterItems} ${pluralize(
        uncertainWaterItems,
        'vattenpost',
        'vattenposter',
      )} med osaker enhet`,
      gapLabel:
        exactGap === 0
          ? 'Det registrerade vattnet kan redan racka, men osakra enheter hindrar en exakt jamforelse.'
          : `Minst ${formatQuantity(exactGap)} liter saknas, men osakra enheter gor totalen osaker.`,
      notes: [
        'Vi raknar bara vattenposter exakt nar enheten kan tolkas som liter.',
        'Poster med enheter som flaska, dunk eller liknande markeras som osakra tills de preciseras.',
      ],
    }
  }

  if (measuredLiters === 0) {
    return {
      key: 'water',
      label: 'Vatten',
      status: 'missing',
      statusLabel: 'Inget registrerat an',
      needLabel: `${needs.totalWaterLiters} liter behov for ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel: '0 liter registrerat',
      gapLabel: `${needs.totalWaterLiters} liter saknas for att na grundnivan.`,
      notes: ['Borja med att registrera vatten i liter for att fa en tydlig gapbild.'],
    }
  }

  if (exactGap === 0) {
    return {
      key: 'water',
      label: 'Vatten',
      status: 'covered',
      statusLabel: 'Grundnivan ar tackt',
      needLabel: `${needs.totalWaterLiters} liter behov for ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel: `${formatQuantity(measuredLiters)} liter registrerat`,
      gapLabel: 'Det registrerade vattnet motsvarar eller overstiger grundnivan.',
      notes: ['Jamforelsen ar exakt eftersom alla registrerade vattenposter ar angivna i liter.'],
    }
  }

  return {
    key: 'water',
    label: 'Vatten',
    status: 'partial',
    statusLabel: 'Delvis tackt',
    needLabel: `${needs.totalWaterLiters} liter behov for ${needs.horizonLabel.toLowerCase()}`,
    inventoryLabel: `${formatQuantity(measuredLiters)} liter registrerat`,
    gapLabel: `${formatQuantity(exactGap)} liter saknas for att na grundnivan.`,
    notes: ['Jamforelsen ar exakt eftersom alla registrerade vattenposter ar angivna i liter.'],
  }
}

function buildFoodGapAnalysis(
  needs: BaselinePreparednessNeeds,
  items: InventoryItemRecord[],
): PreparednessGapCategoryAnalysis {
  const foodItems = items.filter((item) => item.category === 'food')
  const measurableFoodItems = foodItems.filter((item) =>
    MEAL_UNITS.has(normalizeUnit(item.unit)),
  )
  const uncertainFoodItems = foodItems.length - measurableFoodItems.length
  const measuredMeals = measurableFoodItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  )
  const exactGap = Math.max(needs.totalMeals - measuredMeals, 0)

  if (uncertainFoodItems > 0) {
    return {
      key: 'food',
      label: 'Mat',
      status: 'uncertain',
      statusLabel: 'Osaker jamforelse',
      needLabel: `${needs.totalMeals} maltider behov for ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel:
        measuredMeals > 0
          ? `${formatQuantity(measuredMeals)} maltider registrerat + ${uncertainFoodItems} ${pluralize(
              uncertainFoodItems,
              'matpost',
              'matposter',
            )} med osaker omsattning`
          : `${uncertainFoodItems} ${pluralize(
              uncertainFoodItems,
              'matpost',
              'matposter',
            )} registrerade, men de ar inte omsatta till maltider`,
      gapLabel:
        exactGap === 0
          ? 'Det registrerade matlagret kan redan racka, men flera poster saknar en enhet som gar att oversatta exakt.'
          : `Minst ${formatQuantity(exactGap)} maltider saknas, men flera poster gar inte att omsatta exakt.`,
      notes: [
        'Vi raknar bara matposter exakt nar enheten uttryckligen motsvarar maltider eller portioner.',
        'Poster i styck, paket eller fritext visas som osakerhet i stallet for falsk precision.',
      ],
    }
  }

  if (measuredMeals === 0) {
    return {
      key: 'food',
      label: 'Mat',
      status: 'missing',
      statusLabel: 'Inget registrerat an',
      needLabel: `${needs.totalMeals} maltider behov for ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel: '0 maltider registrerat',
      gapLabel: `${needs.totalMeals} maltider saknas for att na grundnivan.`,
      notes: ['Registrera mat i maltider eller portioner om du vill kunna folja gapet exakt.'],
    }
  }

  if (exactGap === 0) {
    return {
      key: 'food',
      label: 'Mat',
      status: 'covered',
      statusLabel: 'Grundnivan ar tackt',
      needLabel: `${needs.totalMeals} maltider behov for ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel: `${formatQuantity(measuredMeals)} maltider registrerat`,
      gapLabel: 'Det registrerade matlagret motsvarar eller overstiger grundnivan.',
      notes: ['Jamforelsen ar exakt eftersom alla registrerade matposter ar angivna i maltider eller portioner.'],
    }
  }

  return {
    key: 'food',
    label: 'Mat',
    status: 'partial',
    statusLabel: 'Delvis tackt',
    needLabel: `${needs.totalMeals} maltider behov for ${needs.horizonLabel.toLowerCase()}`,
    inventoryLabel: `${formatQuantity(measuredMeals)} maltider registrerat`,
    gapLabel: `${formatQuantity(exactGap)} maltider saknas for att na grundnivan.`,
    notes: ['Jamforelsen ar exakt eftersom alla registrerade matposter ar angivna i maltider eller portioner.'],
  }
}

export function calculatePreparednessGapAnalysis(
  needs: BaselinePreparednessNeeds,
  items: InventoryItemRecord[],
): PreparednessGapAnalysis {
  return {
    horizonLabel: needs.horizonLabel,
    categories: [
      buildWaterGapAnalysis(needs, items),
      buildFoodGapAnalysis(needs, items),
    ],
    summary:
      'Gap-analysen jamfor hushallets planeringsniva med det registrerade lagret och markerar osakerhet nar datan inte racker for exakta slutsatser.',
    nextStep:
      'Anvand gapen som underlag for att komplettera lagret eller precisera poster med otydliga enheter.',
  }
}
