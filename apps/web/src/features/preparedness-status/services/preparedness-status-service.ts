import { HouseholdProfileService } from '../../household-profile/services/household-profile-service'
import { InventoryService } from '../../inventory/services/inventory-service'
import { PreparednessGapService } from '../../preparedness-gap/services/preparedness-gap-service'
import type {
  PreparednessGapAnalysis,
  PreparednessGapCategoryAnalysis,
} from '../../preparedness-gap/calculators/preparedness-gap-calculator'
import { PreparednessHorizonService } from '../../preparedness-horizon/services/preparedness-horizon-service'

export type PreparednessOverviewState = 'missing' | 'partial' | 'complete'

export interface PreparednessOverview {
  state: PreparednessOverviewState
  statusTitle: string
  statusBody: string
  statusLabel: string
  gapHighlights: Array<{
    label: string
    summary: string
    statusLabel: string
  }>
  nextStepTitle: string
  nextStepBody: string
  nextStepHref: string
  nextStepLabel: string
}

function getMissingSetupOverview(
  hasProfile: boolean,
  hasHorizon: boolean,
): PreparednessOverview {
  const missingParts = []

  if (!hasProfile) {
    missingParts.push('hushållsprofil')
  }

  if (!hasHorizon) {
    missingParts.push('planeringsperiod')
  }

  return {
    state: 'missing',
    statusTitle: 'Beredskapsbilden är inte igång än',
    statusBody: `Vi saknar fortfarande ${missingParts.join(' och ')} innan vi kan visa en pålitlig status för hushållet.`,
    statusLabel: 'Starta med grunderna',
    gapHighlights: [
      {
        label: 'Det som behöver göras först',
        summary:
          'Fyll i hushållsprofilen och välj planeringsperiod så att behov och luckor kan beräknas på rätt nivå.',
        statusLabel: 'Ofullständig grund',
      },
    ],
    nextStepTitle: 'Börja med profilen',
    nextStepBody:
      'Öppna hushållsprofilen och välj planeringsperiod. Därefter kan vi visa en tydlig statusbild och mer träffsäkra råd.',
    nextStepHref: '/profil',
    nextStepLabel: 'Gå till hushållsprofilen',
  }
}

function deriveOverallState(categories: PreparednessGapCategoryAnalysis[]) {
  const allCovered = categories.every((category) => category.status === 'covered')

  return allCovered ? 'complete' : 'partial'
}

function buildStatusCopy(
  analysis: PreparednessGapAnalysis,
  state: PreparednessOverviewState,
) {
  if (state === 'complete') {
    return {
      title: 'Grundnivån är på plats',
      body: `Vatten och mat är registrerade på eller över hushållets planeringsnivå för ${analysis.horizonLabel.toLowerCase()}.`,
      label: 'Stabil grundnivå',
    }
  }

  const hasUncertainCategory = analysis.categories.some(
    (category) => category.status === 'uncertain',
  )

  return {
    title: hasUncertainCategory
      ? 'Du har en bra start, men underlaget är inte helt tydligt än'
      : 'Det finns fortfarande tydliga luckor att fylla',
    body: hasUncertainCategory
      ? 'En del poster behöver tydligare enheter innan statusen blir helt tillförlitlig.'
      : 'Statusbilden visar vad som saknas mest just nu, så att du kan prioritera nästa steg med lugn och tydlighet.',
    label: hasUncertainCategory ? 'Delvis kartlagt' : 'Fortsätt bygga',
  }
}

function getNextStepForCategories(
  categories: PreparednessGapCategoryAnalysis[],
): Pick<
  PreparednessOverview,
  'nextStepTitle' | 'nextStepBody' | 'nextStepHref' | 'nextStepLabel'
> {
  const uncertainCategory = categories.find(
    (category) => category.status === 'uncertain',
  )

  if (uncertainCategory !== undefined) {
    return {
      nextStepTitle: 'Förtydliga det som är oklart',
      nextStepBody: `Se över enheterna i ${uncertainCategory.label.toLowerCase()} så att statusen blir mer exakt och lättare att lita på.`,
      nextStepHref: '/forrad',
      nextStepLabel: 'Se över lagret',
    }
  }

  const incompleteCategory = categories.find((category) =>
    ['missing', 'partial'].includes(category.status),
  )

  if (incompleteCategory !== undefined) {
    return {
      nextStepTitle: 'Minska den viktigaste luckan',
      nextStepBody: `Komplettera ${incompleteCategory.label.toLowerCase()} först för att stärka hushållets beredskap där det gör mest nytta.`,
      nextStepHref: '/forrad/ny',
      nextStepLabel: 'Lägg till vara',
    }
  }

  return {
    nextStepTitle: 'Fortsätt hålla nivån stabil',
    nextStepBody:
      'Grundnivån ser bra ut. Fortsätt uppdatera lagret och använd gap-analysen om hushållets förutsättningar förändras.',
    nextStepHref: '/gap-analys',
    nextStepLabel: 'Se full gap-analys',
  }
}

export class PreparednessStatusService {
  private readonly householdProfileService: HouseholdProfileService
  private readonly preparednessHorizonService: PreparednessHorizonService
  private readonly inventoryService: InventoryService
  private readonly preparednessGapService: PreparednessGapService

  constructor(
    householdProfileService: HouseholdProfileService = new HouseholdProfileService(),
    preparednessHorizonService: PreparednessHorizonService = new PreparednessHorizonService(),
    inventoryService: InventoryService = new InventoryService(),
    preparednessGapService: PreparednessGapService = new PreparednessGapService(),
  ) {
    this.householdProfileService = householdProfileService
    this.preparednessHorizonService = preparednessHorizonService
    this.inventoryService = inventoryService
    this.preparednessGapService = preparednessGapService
  }

  async loadOverview(): Promise<PreparednessOverview> {
    const [profile, horizon] = await Promise.all([
      this.householdProfileService.loadProfile(),
      this.preparednessHorizonService.loadSelection(),
    ])

    if (profile === null || horizon === null) {
      return getMissingSetupOverview(profile !== null, horizon !== null)
    }

    const [analysis, inventoryItems] = await Promise.all([
      this.preparednessGapService.loadAnalysis(),
      this.inventoryService.listItems(),
    ])

    if (analysis === null) {
      return getMissingSetupOverview(false, false)
    }

    const overallState = deriveOverallState(analysis.categories)
    const statusCopy = buildStatusCopy(analysis, overallState)
    const nextStep = getNextStepForCategories(analysis.categories)

    return {
      state: overallState,
      statusTitle: statusCopy.title,
      statusBody:
        inventoryItems.length === 0
          ? `${statusCopy.body} Inga varor är registrerade ännu, så statusen bygger just nu helt på behovsbilden.`
          : statusCopy.body,
      statusLabel: statusCopy.label,
      gapHighlights: analysis.categories.map((category) => ({
        label: category.label,
        summary: category.gapLabel,
        statusLabel: category.statusLabel,
      })),
      ...nextStep,
    }
  }
}
