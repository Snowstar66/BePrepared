import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { GapAnalysisRoute } from '../../../app/routes/gap-analysis-route'
import { HouseholdProfileService } from '../../household-profile/services/household-profile-service'
import { InventoryService } from '../../inventory/services/inventory-service'
import { PreparednessHorizonService } from '../../preparedness-horizon/services/preparedness-horizon-service'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'

describe('Gap analysis route', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it('shows the prerequisite prompt when planning data is missing', async () => {
    render(
      <MemoryRouter>
        <GapAnalysisRoute />
      </MemoryRouter>,
    )

    expect(
      await screen.findByText(/välj planeringsperiod innan vi visar behov/i),
    ).toBeInTheDocument()
  })

  it('shows needs, registered inventory and gap for water and food', async () => {
    const householdProfileService = new HouseholdProfileService()
    const preparednessHorizonService = new PreparednessHorizonService()
    const inventoryService = new InventoryService()

    await householdProfileService.save({
      adults: '2',
      children: '0',
      hasPets: false,
    })
    await preparednessHorizonService.save({
      horizon: '72-hours',
    })
    await inventoryService.addItem({
      name: 'Vattendunk',
      category: 'water',
      quantity: '3',
      unit: 'liter',
      bestBefore: '',
    })
    await inventoryService.addItem({
      name: 'Nudlar',
      category: 'food',
      quantity: '2',
      unit: 'portioner',
      bestBefore: '',
    })

    render(
      <MemoryRouter>
        <GapAnalysisRoute />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(/gap-analys för 72 timmar/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/^Vatten$/i)).toBeInTheDocument()
    expect(screen.getByText(/^Mat$/i)).toBeInTheDocument()
    expect(screen.getByText(/18 liter behov/i)).toBeInTheDocument()
    expect(screen.getByText(/3 liter registrerat/i)).toBeInTheDocument()
    expect(screen.getByText(/15 liter saknas/i)).toBeInTheDocument()
    expect(screen.getByText(/18 måltider behov/i)).toBeInTheDocument()
    expect(screen.getByText(/2 måltider registrerat/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /lägg till vara/i }),
    ).toBeInTheDocument()
  })
})
