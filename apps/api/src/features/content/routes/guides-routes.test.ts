import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp } from '../../../app.js'

describe('GET /api/v1/content/guides', () => {
  it('returns published guides with metadata', async () => {
    const response = await request(createApp()).get('/api/v1/content/guides')

    expect(response.status).toBe(200)
    expect(response.body.guides).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          scenario: 'stromavbrott',
          sourceName: expect.any(String),
          reviewedAt: expect.any(String),
          version: expect.any(Number),
        }),
      ]),
    )
  })

  it('filters guides by scenario', async () => {
    const response = await request(createApp()).get(
      '/api/v1/content/guides?scenario=vattenbrist',
    )

    expect(response.status).toBe(200)
    expect(response.body.guides).toHaveLength(1)
    expect(response.body.guides[0]?.scenario).toBe('vattenbrist')
  })
})

describe('GET /api/v1/content/guides/:guideId', () => {
  it('returns a single guide with steps and metadata', async () => {
    const response = await request(createApp()).get(
      '/api/v1/content/guides/guide-stromavbrott',
    )

    expect(response.status).toBe(200)
    expect(response.body.guide).toEqual(
      expect.objectContaining({
        id: 'guide-stromavbrott',
        steps: expect.arrayContaining([
          expect.objectContaining({
            title: expect.any(String),
            body: expect.any(String),
          }),
        ]),
      }),
    )
  })

  it('returns 404 when the guide does not exist', async () => {
    const response = await request(createApp()).get(
      '/api/v1/content/guides/not-found',
    )

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('GuideNotFound')
  })
})
