import { Router } from 'express'
import {
  isGuideScenarioId,
  publishedGuides,
  type PublishedGuideListResponse,
  type PublishedGuideResponse,
} from '@beprepared/shared'

export const guidesRouter = Router()

guidesRouter.get('/guides', (req, res) => {
  const scenario =
    typeof req.query.scenario === 'string' ? req.query.scenario : undefined

  const guides =
    scenario && isGuideScenarioId(scenario)
      ? publishedGuides.filter((guide) => guide.scenario === scenario)
      : publishedGuides

  const response: PublishedGuideListResponse = {
    guides,
  }

  res.status(200).json(response)
})

guidesRouter.get('/guides/:guideId', (req, res) => {
  const guide = publishedGuides.find((entry) => entry.id === req.params.guideId)

  if (!guide) {
    res.status(404).json({
      error: 'GuideNotFound',
      traceId:
        typeof res.locals.traceId === 'string' ? res.locals.traceId : 'unknown',
    })
    return
  }

  const response: PublishedGuideResponse = {
    guide,
  }

  res.status(200).json(response)
})
