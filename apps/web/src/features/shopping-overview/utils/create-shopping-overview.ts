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
      priorityLabel: 'Hog prioritet',
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
      ? 'Forbattra enheterna for vattenposter sa att oversikten blir mer exakt innan du handlar mer.'
      : 'Forbattra enheterna for matposter sa att oversikten blir mer exakt innan du handlar mer.'
  }

  if (key === 'water') {
    return 'Borja med att fylla vattengapet eftersom det ar grundlaggande for hushallets planeringsniva.'
  }

  return 'Komplettera matberedskapen med enkla maltider eller portioner som ar latt att folja upp.'
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
