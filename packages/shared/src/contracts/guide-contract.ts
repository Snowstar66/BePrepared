export const guideScenarios = [
  {
    id: 'stromavbrott',
    title: 'Stromavbrott',
    summary: 'Fa en snabb ordning pa de viktigaste stegen nar elen forsvinner.',
  },
  {
    id: 'vattenbrist',
    title: 'Vattenbrist',
    summary: 'Prioritera dricksvatten, hygien och hushallets viktigaste behov.',
  },
  {
    id: 'allman-kris',
    title: 'Allman kris',
    summary: 'Fa en lugn oversikt nar laget ar oklart eller flera saker hander samtidigt.',
  },
] as const

export type GuideScenarioId = (typeof guideScenarios)[number]['id']

export type GuideReviewStatus = 'reviewed' | 'updated'

export interface GuideStep {
  title: string
  body: string
}

export interface PublishedGuide {
  id: string
  scenario: GuideScenarioId
  title: string
  summary: string
  steps: GuideStep[]
  sourceName: string
  sourceUrl: string
  publisher: string
  reviewStatus: GuideReviewStatus
  reviewedAt: string
  updatedAt: string
  version: number
}

export interface PublishedGuideListResponse {
  guides: PublishedGuide[]
}

export interface PublishedGuideResponse {
  guide: PublishedGuide
}

export function isGuideScenarioId(value: string): value is GuideScenarioId {
  return guideScenarios.some((scenario) => scenario.id === value)
}
