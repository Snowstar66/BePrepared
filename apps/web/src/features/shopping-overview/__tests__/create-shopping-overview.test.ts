import { createShoppingOverviewEntries } from '../utils/create-shopping-overview'
import type { PreparednessGapAnalysis } from '../../preparedness-gap/calculators/preparedness-gap-calculator'

const baseAnalysis: PreparednessGapAnalysis = {
  horizonLabel: '72 timmar',
  summary: 'Sammanfattning',
  nextStep: 'Nasta steg',
  categories: [
    {
      key: 'water',
      label: 'Vatten',
      status: 'partial',
      statusLabel: 'Delvis tackt',
      needLabel: '18 liter behov',
      inventoryLabel: '6 liter registrerat',
      gapLabel: '12 liter saknas for att na grundnivan.',
      notes: [],
    },
    {
      key: 'food',
      label: 'Mat',
      status: 'uncertain',
      statusLabel: 'Osaker jamforelse',
      needLabel: '18 maltider behov',
      inventoryLabel: '2 matposter registrerade',
      gapLabel: 'Minst 8 maltider saknas, men flera poster gar inte att omsatta exakt.',
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
