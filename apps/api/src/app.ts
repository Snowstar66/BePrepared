import express from 'express'
import { guidesRouter } from './features/content/routes/guides-routes.js'
import { healthRouter } from './features/health/routes/health-routes.js'
import { requestContextMiddleware } from './middleware/request-context-middleware.js'

export function createApp() {
  const app = express()

  app.use(express.json())
  app.use(requestContextMiddleware)
  app.use('/api/v1', healthRouter)
  app.use('/api/v1/content', guidesRouter)

  return app
}
