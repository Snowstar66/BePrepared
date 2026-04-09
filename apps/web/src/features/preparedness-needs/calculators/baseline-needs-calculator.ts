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
        title: 'Maltider totalt',
        value: `${totalMeals} maltider`,
        description: 'Utga fran tre enkla maltider per person och dygn i MVP.',
      },
      {
        title: 'Per dygn',
        value: `${dailyMeals} maltider per dygn`,
        description: 'Bra som enkel vardagsnara planeringsniva for hushallet.',
      },
      {
        title: 'Mat som ar latt att planera',
        value: 'Stapelfood, enkla proteinkallor och sant som ar latt att tillaga',
        description: 'Hall planen robust och enkel i stallet for for detaljerad.',
      },
    ],
    methodNotes: [
      `Berakningen utgar fran ${peopleCount} person(er) i hushallet.`,
      'I MVP raknas varje barn som en egen person i grundnivans planeringsstod.',
    ],
    petsNote: householdProfile.hasPets
      ? 'Husdjur ar inte inraknade i siffrorna. Lag till extra vatten och mat utifran art och storlek.'
      : null,
    disclaimer:
      'Detta ar ett forenklat planeringsstod och inte medicinskt personligt rad.',
    nextStep:
      'Nasta steg ar att jamfora den har nivan med vad hushallet faktiskt redan har hemma.',
  }
}
