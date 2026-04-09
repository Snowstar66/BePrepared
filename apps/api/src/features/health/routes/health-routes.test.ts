import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from '../../../app.js'
import { logger } from '../../../config/logger.js'

describe('GET /api/v1/health', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns a health payload with a trace id', async () => {
    const response = await request(createApp()).get('/api/v1/health')

    expect(response.status).toBe(200)
    expect(response.body.status).toBe('ok')
    expect(response.body.timestamp).toEqual(expect.any(String))
    expect(response.body.traceId).toEqual(expect.any(String))
    expect(response.headers['x-trace-id']).toBe(response.body.traceId)
  })

  it('logs the request with pino and traceId', async () => {
    const infoSpy = vi
      .spyOn(logger, 'info')
      .mockImplementation(() => undefined as never)

    await request(createApp()).get('/api/v1/health')

    expect(infoSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        traceId: expect.any(String),
        method: 'GET',
        route: '/api/v1/health',
        statusCode: 200,
      }),
      'request completed',
    )
  })
})
