import { calculateBaselinePreparednessNeeds } from '../calculators/baseline-needs-calculator'

describe('calculateBaselinePreparednessNeeds', () => {
  it('calculates baseline water and food needs from profile and horizon', () => {
    const result = calculateBaselinePreparednessNeeds(
      {
        id: 'primary',
        adults: 2,
        children: 1,
        hasPets: true,
        updatedAt: '2026-04-08T00:00:00.000Z',
      },
      {
        id: 'primary',
        horizon: '72-hours',
        label: '72 timmar',
        updatedAt: '2026-04-08T00:00:00.000Z',
      },
    )

    expect(result.days).toBe(3)
    expect(result.dailyWaterLiters).toBe(9)
    expect(result.totalWaterLiters).toBe(27)
    expect(result.dailyMeals).toBe(9)
    expect(result.totalMeals).toBe(27)
    expect(result.petsNote).toMatch(/husdjur är inte inräknade/i)
  })
})
