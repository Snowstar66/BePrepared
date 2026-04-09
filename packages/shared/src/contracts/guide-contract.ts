export const guideScenarios = [
  {
    id: 'stromavbrott',
    title: 'Strömavbrott',
    summary: 'Få snabb överblick över de viktigaste stegen när elen försvinner.',
  },
  {
    id: 'vattenbrist',
    title: 'Vattenbrist',
    summary: 'Prioritera dricksvatten, hygien och hushållets viktigaste behov.',
  },
  {
    id: 'allman-kris',
    title: 'Allmän kris',
    summary: 'Få en lugn överblick när läget är oklart eller flera saker händer samtidigt.',
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
