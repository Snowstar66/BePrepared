import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HouseholdProfileService } from '../../household-profile/services/household-profile-service'
import { InventoryService } from '../../inventory/services/inventory-service'
import { PreparednessHorizonService } from '../../preparedness-horizon/services/preparedness-horizon-service'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'
import { ShoppingOverviewRoute } from '../../../app/routes/shopping-overview-route'

describe('Shopping overview route', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it('builds and saves a shopping overview locally', async () => {
    const householdProfileService = new HouseholdProfileService()
    const preparednessHorizonService = new PreparednessHorizonService()

    await householdProfileService.save({
      adults: '2',
      children: '0',
      hasPets: false,
    })
    await preparednessHorizonService.save({
      horizon: '72-hours',
    })

    render(
      <MemoryRouter>
        <ShoppingOverviewRoute />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(/^Vatten$/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/^Mat$/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /spara inköpsöversikt/i }))

    expect(
      await screen.findByText(/inköpsöversikten är sparad lokalt/i),
    ).toBeInTheDocument()
  })

  it('shows what is no longer missing after inventory has been updated', async () => {
    const householdProfileService = new HouseholdProfileService()
    const preparednessHorizonService = new PreparednessHorizonService()
    const inventoryService = new InventoryService()

    await householdProfileService.save({
      adults: '1',
      children: '0',
      hasPets: false,
    })
    await preparednessHorizonService.save({
      horizon: '72-hours',
    })

    const firstRender = render(
      <MemoryRouter>
        <ShoppingOverviewRoute />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(/^Vatten$/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /spara inköpsöversikt/i }))

    firstRender.unmount()

    await inventoryService.addItem({
      name: 'Vatten',
      category: 'water',
      quantity: '9',
      unit: 'liter',
      bestBefore: '',
    })
    await inventoryService.addItem({
      name: 'Mat',
      category: 'food',
      quantity: '9',
      unit: 'portioner',
      bestBefore: '',
    })

    render(
      <MemoryRouter>
        <ShoppingOverviewRoute />
      </MemoryRouter>,
    )

    expect(
      await screen.findByText(/det som inte längre saknas/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/vatten verkar inte längre vara en aktiv lucka/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/mat verkar inte längre vara en aktiv lucka/i),
    ).toBeInTheDocument()
  })
})
