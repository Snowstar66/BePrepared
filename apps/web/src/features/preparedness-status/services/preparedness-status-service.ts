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
    missingParts.push('hushallsprofil')
  }

  if (!hasHorizon) {
    missingParts.push('planeringsperiod')
  }

  return {
    state: 'missing',
    statusTitle: 'Beredskapsbilden ar inte igang an',
    statusBody: `Vi saknar fortfarande ${missingParts.join(' och ')} innan vi kan visa en palitlig status for hushallet.`,
    statusLabel: 'Starta med grunden',
    gapHighlights: [
      {
        label: 'Det som behovs forst',
        summary:
          'Fyll i hushallsprofilen och valj planeringsperiod sa att behov och gap kan raknas pa ratt niva.',
        statusLabel: 'Ofullstandig grund',
      },
    ],
    nextStepTitle: 'Basta nasta steg',
    nextStepBody:
      'Borja i hushallsprofilen. Darifran far du ocksa valt planeringsperiod innan vi fortsatter till status och gap.',
    nextStepHref: '/profil',
    nextStepLabel: 'Ga till hushallsprofilen',
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
      title: 'Grundnivan ar pa plats',
      body: `Vatten och mat ar registrerade pa eller over hushallets planeringsniva for ${analysis.horizonLabel.toLowerCase()}.`,
      label: 'Stabil grundniva',
    }
  }

  const hasUncertainCategory = analysis.categories.some(
    (category) => category.status === 'uncertain',
  )

  return {
    title: hasUncertainCategory
      ? 'Du har en lovande men delvis osaker statusbild'
      : 'Det finns fortfarande tydliga gap att fylla',
    body: hasUncertainCategory
      ? 'Hushallet har en tydlig start, men nagra poster behover tydligare enheter innan statusen blir helt tillforlitlig.'
      : 'Statusbilden visar vad som saknas mest just nu, sa att du kan ta ett tydligt nasta steg utan att gissa.',
    label: hasUncertainCategory ? 'Delvis kartlagt' : 'Fortsatt att bygga',
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
      nextStepTitle: 'Basta nasta steg',
      nextStepBody: `Forbattra enheterna i ${uncertainCategory.label.toLowerCase()} sa att statusen kan bli mer exakt och handlingsbar.`,
      nextStepHref: '/forrad',
      nextStepLabel: 'Se over lagret',
    }
  }

  const incompleteCategory = categories.find((category) =>
    ['missing', 'partial'].includes(category.status),
  )

  if (incompleteCategory !== undefined) {
    return {
      nextStepTitle: 'Basta nasta steg',
      nextStepBody: `Komplettera ${incompleteCategory.label.toLowerCase()} for att minska hushallets viktigaste gap.`,
      nextStepHref: '/forrad/ny',
      nextStepLabel: 'Lagg till vara',
    }
  }

  return {
    nextStepTitle: 'Basta nasta steg',
    nextStepBody:
      'Grundnivan ser bra ut. Fortsatt hall lagret uppdaterat och anvand gap-analysen for att folja forandringar over tid.',
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
          ? `${statusCopy.body} Inga varor ar registrerade an, sa statusen bygger just nu helt pa behovsbilden.`
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
