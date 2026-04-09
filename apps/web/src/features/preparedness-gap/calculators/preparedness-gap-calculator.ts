import type { InventoryItemRecord } from '../../inventory/schemas/inventory-item-schema'
import type { BaselinePreparednessNeeds } from '../../preparedness-needs/calculators/baseline-needs-calculator'

const LITER_UNITS = new Set(['l', 'liter', 'liters', 'ltr'])
const MEAL_UNITS = new Set(['måltid', 'måltider', 'maltid', 'maltider', 'portion', 'portioner'])

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
      statusLabel: 'Osäker jämförelse',
      needLabel: `${needs.totalWaterLiters} liter behov för ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel: `${formatQuantity(measuredLiters)} liter registrerat + ${uncertainWaterItems} ${pluralize(
        uncertainWaterItems,
        'vattenpost',
        'vattenposter',
      )} med osäker enhet`,
      gapLabel:
        exactGap === 0
          ? 'Det registrerade vattnet kan redan räcka, men osäkra enheter hindrar en exakt jämförelse.'
          : `Minst ${formatQuantity(exactGap)} liter saknas, men osäkra enheter gör totalen osäker.`,
      notes: [
        'Vi räknar bara vattenposter exakt när enheten kan tolkas som liter.',
        'Poster med enheter som flaska, dunk eller liknande markeras som osäkra tills de preciseras.',
      ],
    }
  }

  if (measuredLiters === 0) {
    return {
      key: 'water',
      label: 'Vatten',
      status: 'missing',
      statusLabel: 'Inget registrerat ännu',
      needLabel: `${needs.totalWaterLiters} liter behov för ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel: '0 liter registrerat',
      gapLabel: `${needs.totalWaterLiters} liter saknas för att nå grundnivån.`,
      notes: ['Börja med att registrera vatten i liter för att få en tydlig bild av luckan.'],
    }
  }

  if (exactGap === 0) {
    return {
      key: 'water',
      label: 'Vatten',
      status: 'covered',
      statusLabel: 'Grundnivån är täckt',
      needLabel: `${needs.totalWaterLiters} liter behov för ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel: `${formatQuantity(measuredLiters)} liter registrerat`,
      gapLabel: 'Det registrerade vattnet motsvarar eller överstiger grundnivån.',
      notes: ['Jämförelsen är exakt eftersom alla registrerade vattenposter är angivna i liter.'],
    }
  }

  return {
    key: 'water',
    label: 'Vatten',
    status: 'partial',
    statusLabel: 'Delvis täckt',
    needLabel: `${needs.totalWaterLiters} liter behov för ${needs.horizonLabel.toLowerCase()}`,
    inventoryLabel: `${formatQuantity(measuredLiters)} liter registrerat`,
    gapLabel: `${formatQuantity(exactGap)} liter saknas för att nå grundnivån.`,
    notes: ['Jämförelsen är exakt eftersom alla registrerade vattenposter är angivna i liter.'],
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
      statusLabel: 'Osäker jämförelse',
      needLabel: `${needs.totalMeals} måltider behov för ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel:
        measuredMeals > 0
          ? `${formatQuantity(measuredMeals)} måltider registrerat + ${uncertainFoodItems} ${pluralize(
              uncertainFoodItems,
              'matpost',
              'matposter',
            )} med osäker omräkning`
          : `${uncertainFoodItems} ${pluralize(
              uncertainFoodItems,
              'matpost',
              'matposter',
            )} registrerade, men de är inte omräknade till måltider`,
      gapLabel:
        exactGap === 0
          ? 'Det registrerade matlagret kan redan räcka, men flera poster saknar en enhet som går att översätta exakt.'
          : `Minst ${formatQuantity(exactGap)} måltider saknas, men flera poster går inte att översätta exakt.`,
      notes: [
        'Vi räknar bara matposter exakt när enheten uttryckligen motsvarar måltider eller portioner.',
        'Poster i styck, paket eller fritext visas som osäkerhet i stället för falsk precision.',
      ],
    }
  }

  if (measuredMeals === 0) {
    return {
      key: 'food',
      label: 'Mat',
      status: 'missing',
      statusLabel: 'Inget registrerat ännu',
      needLabel: `${needs.totalMeals} måltider behov för ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel: '0 måltider registrerat',
      gapLabel: `${needs.totalMeals} måltider saknas för att nå grundnivån.`,
      notes: ['Registrera mat i måltider eller portioner om du vill kunna följa luckan exakt.'],
    }
  }

  if (exactGap === 0) {
    return {
      key: 'food',
      label: 'Mat',
      status: 'covered',
      statusLabel: 'Grundnivån är täckt',
      needLabel: `${needs.totalMeals} måltider behov för ${needs.horizonLabel.toLowerCase()}`,
      inventoryLabel: `${formatQuantity(measuredMeals)} måltider registrerat`,
      gapLabel: 'Det registrerade matlagret motsvarar eller överstiger grundnivån.',
      notes: ['Jämförelsen är exakt eftersom alla registrerade matposter är angivna i måltider eller portioner.'],
    }
  }

  return {
    key: 'food',
    label: 'Mat',
    status: 'partial',
    statusLabel: 'Delvis täckt',
    needLabel: `${needs.totalMeals} måltider behov för ${needs.horizonLabel.toLowerCase()}`,
    inventoryLabel: `${formatQuantity(measuredMeals)} måltider registrerat`,
    gapLabel: `${formatQuantity(exactGap)} måltider saknas för att nå grundnivån.`,
    notes: ['Jämförelsen är exakt eftersom alla registrerade matposter är angivna i måltider eller portioner.'],
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
      'Gap-analysen jämför hushållets planeringsnivå med det registrerade lagret och markerar osäkerhet när datan inte räcker för exakta slutsatser.',
    nextStep:
      'Använd luckorna som underlag för att komplettera lagret eller förtydliga poster med otydliga enheter.',
  }
}
