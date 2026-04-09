import { Router } from 'express'
import type { HealthResponse } from '@beprepared/shared'

export const healthRouter = Router()

healthRouter.get('/health', (_req, res) => {
  const response: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    traceId:
      typeof res.locals.traceId === 'string' ? res.locals.traceId : 'unknown',
  }

  res.status(200).json(response)
})
