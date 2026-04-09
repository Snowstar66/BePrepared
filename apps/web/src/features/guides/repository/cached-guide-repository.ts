import { getAppDb, type CachedGuideRecord } from '../../../shared/lib/dexie/app-db'
import type { PublishedGuide } from '@beprepared/shared'

function toCachedGuideRecord(guide: PublishedGuide): CachedGuideRecord {
  return {
    id: guide.id,
    scenario: guide.scenario,
    title: guide.title,
    summary: guide.summary,
    steps: guide.steps,
    sourceName: guide.sourceName,
    sourceUrl: guide.sourceUrl,
    publisher: guide.publisher,
    reviewStatus: guide.reviewStatus,
    reviewedAt: guide.reviewedAt,
    updatedAt: guide.updatedAt,
    version: guide.version,
    cachedAt: new Date().toISOString(),
  }
}

export class CachedGuideRepository {
  async getGuideByScenario(scenario: PublishedGuide['scenario']) {
    const records = await getAppDb().cachedGuides.where('scenario').equals(scenario).toArray()
    return records[0] ?? null
  }

  async cacheGuide(guide: PublishedGuide) {
    await getAppDb().cachedGuides.put(toCachedGuideRecord(guide))
  }

  async listCachedGuides() {
    return getAppDb().cachedGuides.toArray()
  }
}
