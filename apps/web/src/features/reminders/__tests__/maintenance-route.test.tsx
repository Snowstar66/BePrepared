import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MaintenanceRoute } from '../../../app/routes/maintenance-route'
import { InventoryService } from '../../inventory/services/inventory-service'
import { ReminderSettingsService } from '../services/reminder-settings-service'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'

describe('MaintenanceRoute', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it('saves reminder settings and shows the next planned review', async () => {
    render(
      <MemoryRouter>
        <MaintenanceRoute />
      </MemoryRouter>,
    )

    fireEvent.change(await screen.findByLabelText(/paminnelserytm/i), {
      target: { value: 'quarterly' },
    })
    fireEvent.click(screen.getByRole('button', { name: /spara paminnelse/i }))

    expect(
      await screen.findByText(/paminnelsen ar sparad och visas nu i din underhallsplan/i),
    ).toBeInTheDocument()

    const savedSettings = await new ReminderSettingsService().loadSettings()
    expect(savedSettings?.cadence).toBe('quarterly')
    expect(screen.getByText(/nasta planerade genomgang/i)).toBeInTheDocument()
  })

  it('shows rotation candidates and lets the user mark an item as consumed', async () => {
    const inventoryService = new InventoryService()

    await inventoryService.addItem({
      name: 'Havredryck',
      category: 'food',
      quantity: '2',
      unit: 'st',
      bestBefore: '2026-04-15',
    })

    render(
      <MemoryRouter>
        <MaintenanceRoute />
      </MemoryRouter>,
    )

    expect(await screen.findByText(/havredryck/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /markera som forbrukad/i }))

    await waitFor(async () => {
      const updatedItems = await inventoryService.listItems()
      expect(updatedItems[0]?.quantity).toBe(1)
    })
  })
})
