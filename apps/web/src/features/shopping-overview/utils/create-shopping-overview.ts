import type { PreparednessGapAnalysis } from '../../preparedness-gap/calculators/preparedness-gap-calculator'
import type { ShoppingOverviewEntry } from '../schemas/shopping-overview-schema'

function getPriorityForCategory(
  key: ShoppingOverviewEntry['key'],
  status: 'covered' | 'partial' | 'missing' | 'uncertain',
) {
  if (status === 'uncertain') {
    return {
      priority: 'medium' as const,
      priorityLabel: 'Medel prioritet',
    }
  }

  if (key === 'water') {
    return {
      priority: 'high' as const,
      priorityLabel: 'Hög prioritet',
    }
  }

  return {
    priority: 'medium' as const,
    priorityLabel: 'Medel prioritet',
  }
}

function getRecommendationForCategory(
  key: ShoppingOverviewEntry['key'],
  status: 'covered' | 'partial' | 'missing' | 'uncertain',
) {
  if (status === 'uncertain') {
    return key === 'water'
      ? 'Förtydliga enheterna för vattenposter så att översikten blir mer exakt innan du handlar mer.'
      : 'Förtydliga enheterna för matposter så att översikten blir mer exakt innan du handlar mer.'
  }

  if (key === 'water') {
    return 'Börja med att fylla vattenluckan eftersom den är grundläggande för hushållets planeringsnivå.'
  }

  return 'Komplettera matberedskapen med enkla måltider eller portioner som är lätta att följa upp.'
}

export function createShoppingOverviewEntries(
  analysis: PreparednessGapAnalysis,
): ShoppingOverviewEntry[] {
  return analysis.categories
    .filter((category) => category.status !== 'covered')
    .map((category) => {
      const priority = getPriorityForCategory(category.key, category.status)

      return {
        key: category.key,
        label: category.label,
        priority: priority.priority,
        priorityLabel: priority.priorityLabel,
        summary: category.gapLabel,
        recommendation: getRecommendationForCategory(category.key, category.status),
      }
    })
}
