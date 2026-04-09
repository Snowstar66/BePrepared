import type { HouseholdProfileRecord } from '../../household-profile/schemas/household-profile-schema'
import {
  getPreparednessHorizonDays,
  type PreparednessHorizonRecord,
} from '../../preparedness-horizon/schemas/preparedness-horizon-schema'

export interface BaselinePreparednessNeeds {
  horizonLabel: string
  days: number
  peopleCount: number
  dailyWaterLiters: number
  totalWaterLiters: number
  dailyMeals: number
  totalMeals: number
  foodCategories: Array<{
    title: string
    value: string
    description: string
  }>
  methodNotes: string[]
  petsNote: string | null
  disclaimer: string
  nextStep: string
}

export function calculateBaselinePreparednessNeeds(
  householdProfile: HouseholdProfileRecord,
  preparednessHorizon: PreparednessHorizonRecord,
): BaselinePreparednessNeeds {
  const peopleCount = householdProfile.adults + householdProfile.children
  const days = getPreparednessHorizonDays(preparednessHorizon.horizon)
  const dailyWaterLiters = peopleCount * 3
  const totalWaterLiters = dailyWaterLiters * days
  const dailyMeals = peopleCount * 3
  const totalMeals = dailyMeals * days

  return {
    horizonLabel: preparednessHorizon.label,
    days,
    peopleCount,
    dailyWaterLiters,
    totalWaterLiters,
    dailyMeals,
    totalMeals,
    foodCategories: [
      {
        title: 'Måltider totalt',
        value: `${totalMeals} måltider`,
        description: 'Utgå från tre enkla måltider per person och dygn i MVP.',
      },
      {
        title: 'Per dygn',
        value: `${dailyMeals} måltider per dygn`,
        description: 'En bra och vardagsnära nivå att planera utifrån.',
      },
      {
        title: 'Mat som är lätt att planera',
        value: 'Basvaror, enkla proteinkällor och sådant som är lätt att tillaga',
        description: 'Håll planen robust och enkel i stället för onödigt detaljerad.',
      },
    ],
    methodNotes: [
      `Beräkningen utgår från ${peopleCount} person(er) i hushållet.`,
      'I MVP räknas varje barn som en egen person i grundnivåns planeringsstöd.',
    ],
    petsNote: householdProfile.hasPets
      ? 'Husdjur är inte inräknade i siffrorna. Lägg till extra vatten och mat utifrån art och storlek.'
      : null,
    disclaimer:
      'Detta är ett förenklat planeringsstöd och inte personligt medicinskt råd.',
    nextStep:
      'Nästa steg är att jämföra den här nivån med vad hushållet faktiskt redan har hemma.',
  }
}
