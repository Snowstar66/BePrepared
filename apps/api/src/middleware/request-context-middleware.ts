import { randomUUID } from 'node:crypto'
import type { RequestHandler } from 'express'
import { logger } from '../config/logger.js'

export const requestContextMiddleware: RequestHandler = (req, res, next) => {
  const traceIdHeader = req.header('x-trace-id')
  const traceId =
    typeof traceIdHeader === 'string' && traceIdHeader.length > 0
      ? traceIdHeader
      : randomUUID()

  res.locals.traceId = traceId
  res.setHeader('x-trace-id', traceId)

  res.on('finish', () => {
    logger.info(
      {
        traceId,
        method: req.method,
        route: req.originalUrl,
        statusCode: res.statusCode,
      },
      'request completed',
    )
  })

  next()
}
