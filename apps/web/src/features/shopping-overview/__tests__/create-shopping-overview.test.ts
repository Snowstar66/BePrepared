import { createShoppingOverviewEntries } from '../utils/create-shopping-overview'
import type { PreparednessGapAnalysis } from '../../preparedness-gap/calculators/preparedness-gap-calculator'

const baseAnalysis: PreparednessGapAnalysis = {
  horizonLabel: '72 timmar',
  summary: 'Sammanfattning',
  nextStep: 'Nästa steg',
  categories: [
    {
      key: 'water',
      label: 'Vatten',
      status: 'partial',
      statusLabel: 'Delvis täckt',
      needLabel: '18 liter behov',
      inventoryLabel: '6 liter registrerat',
      gapLabel: '12 liter saknas för att nå grundnivån.',
      notes: [],
    },
    {
      key: 'food',
      label: 'Mat',
      status: 'uncertain',
      statusLabel: 'Osäker jämförelse',
      needLabel: '18 måltider behov',
      inventoryLabel: '2 matposter registrerade',
      gapLabel: 'Minst 8 måltider saknas, men flera poster går inte att översätta exakt.',
      notes: [],
    },
  ],
}

describe('createShoppingOverviewEntries', () => {
  it('creates prioritized shopping rows from active gaps', () => {
    const entries = createShoppingOverviewEntries(baseAnalysis)

    expect(entries).toHaveLength(2)
    expect(entries[0]).toMatchObject({
      key: 'water',
      priority: 'high',
    })
    expect(entries[1]).toMatchObject({
      key: 'food',
      priority: 'medium',
    })
  })

  it('omits categories that are already covered', () => {
    const entries = createShoppingOverviewEntries({
      ...baseAnalysis,
      categories: [
        {
          ...baseAnalysis.categories[0],
          status: 'covered',
        },
      ],
    })

    expect(entries).toHaveLength(0)
  })
})
