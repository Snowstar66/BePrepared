import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { InventoryItemEditRoute } from '../../../app/routes/inventory-item-edit-route'
import { InventoryService } from '../services/inventory-service'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'

describe('EditInventoryItemForm', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it(
    'updates an existing inventory item',
    async () => {
      const inventoryService = new InventoryService()
      const createdItem = await inventoryService.addItem({
        name: 'Pasta',
        category: 'food',
        quantity: '2',
        unit: 'st',
        bestBefore: '',
      })

      render(
        <MemoryRouter initialEntries={[`/forrad/${createdItem.id}/redigera`]}>
          <Routes>
            <Route path="/forrad/:itemId/redigera" element={<InventoryItemEditRoute />} />
          </Routes>
        </MemoryRouter>,
      )

      await waitFor(() => {
        expect(screen.getByLabelText(/namn pa vara/i)).toHaveValue('Pasta')
      })

      fireEvent.change(screen.getByLabelText(/namn pa vara/i), {
        target: { value: 'Fullkornspasta' },
      })
      fireEvent.change(screen.getByLabelText(/antal/i), {
        target: { value: '4' },
      })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /spara andringar/i }))
      })

      expect(
        await screen.findByText(/fullkornspasta ar uppdaterad i ditt forrad/i),
      ).toBeInTheDocument()

      await expect(inventoryService.getItem(createdItem.id)).resolves.toMatchObject({
        name: 'Fullkornspasta',
        quantity: 4,
      })
    },
    10000,
  )

  it('requires explicit confirmation before deleting an item', async () => {
    const inventoryService = new InventoryService()
    const createdItem = await inventoryService.addItem({
      name: 'Konserv',
      category: 'food',
      quantity: '3',
      unit: 'st',
      bestBefore: '',
    })

    render(
      <MemoryRouter initialEntries={[`/forrad/${createdItem.id}/redigera`]}>
        <Routes>
          <Route path="/forrad/:itemId/redigera" element={<InventoryItemEditRoute />} />
        </Routes>
      </MemoryRouter>,
    )

    const deleteButton = await screen.findByRole('button', { name: /ta bort vara/i })
    expect(deleteButton).toBeDisabled()

    fireEvent.click(
      screen.getByLabelText(/jag vill ta bort den har varan fran forradet/i),
    )
    expect(deleteButton).toBeEnabled()

    await act(async () => {
      fireEvent.click(deleteButton)
    })

    await waitFor(async () => {
      await expect(inventoryService.getItem(createdItem.id)).resolves.toBeNull()
    })
  })
})
