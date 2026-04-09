import {
  guideScenarios,
  isGuideScenarioId,
  publishedGuides,
  type GuideScenarioId,
} from '@beprepared/shared'
import { CachedGuideRepository } from '../repository/cached-guide-repository'

export class GuideCatalogService {
  private readonly cachedGuideRepository: CachedGuideRepository

  constructor(
    cachedGuideRepository: CachedGuideRepository = new CachedGuideRepository(),
  ) {
    this.cachedGuideRepository = cachedGuideRepository
  }

  async listScenarios() {
    return guideScenarios
  }

  async listGuides() {
    return publishedGuides
  }

  async getGuideByScenario(scenario: string) {
    if (!isGuideScenarioId(scenario)) {
      return null
    }

    const publishedGuide = publishedGuides.find((guide) => guide.scenario === scenario)

    if (publishedGuide !== undefined) {
      void this.cachedGuideRepository.cacheGuide(publishedGuide)
      return publishedGuide
    }

    return this.cachedGuideRepository.getGuideByScenario(scenario)
  }

  async getGuideByScenarioId(scenario: GuideScenarioId) {
    const publishedGuide = publishedGuides.find((guide) => guide.scenario === scenario)

    if (publishedGuide !== undefined) {
      void this.cachedGuideRepository.cacheGuide(publishedGuide)
      return publishedGuide
    }

    return this.cachedGuideRepository.getGuideByScenario(scenario)
  }
}
