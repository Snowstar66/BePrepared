import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { InventoryOverviewRoute } from '../../../app/routes/inventory-overview-route'
import { InventoryService } from '../services/inventory-service'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'

describe('Inventory overview route', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it('shows a guided empty state when the inventory is empty', async () => {
    render(
      <MemoryRouter>
        <InventoryOverviewRoute />
      </MemoryRouter>,
    )

    expect(
      await screen.findByText(/ditt forrad ar fortfarande tomt/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /lagg till din forsta vara/i }),
    ).toBeInTheDocument()
  })

  it('shows grouped inventory categories and category-level empty states', async () => {
    const inventoryService = new InventoryService()

    await inventoryService.addItem({
      name: 'Vattenflaska',
      category: 'water',
      quantity: '6',
      unit: 'liter',
      bestBefore: '',
    })
    await inventoryService.addItem({
      name: 'Pasta',
      category: 'food',
      quantity: '4',
      unit: 'st',
      bestBefore: '',
    })

    render(
      <MemoryRouter>
        <InventoryOverviewRoute />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(/^Vatten$/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/^Mat$/i)).toBeInTheDocument()
    expect(screen.getByText(/^Ovrigt$/i)).toBeInTheDocument()
    expect(screen.getByText(/totalt 6 liter/i)).toBeInTheDocument()
    expect(screen.getByText(/totalt 4 st/i)).toBeInTheDocument()
    expect(
      screen.getByText(/inga varor ligger i ovrigt an/i),
    ).toBeInTheDocument()
  })
})
