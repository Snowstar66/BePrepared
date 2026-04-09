import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QuickAddItemSheet } from '../components/quick-add-item-sheet'
import { InventoryService } from '../services/inventory-service'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'

describe('QuickAddItemSheet', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it('shows validation without clearing input and stores the item locally', async () => {
    const inventoryService = new InventoryService()

    render(<QuickAddItemSheet />)

    fireEvent.change(screen.getByLabelText(/namn pa vara/i), {
      target: { value: 'Ris' },
    })
    fireEvent.click(screen.getByRole('button', { name: /lagg till vara/i }))

    expect(await screen.findByText(/valj en kategori/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/namn pa vara/i)).toHaveValue('Ris')

    fireEvent.change(screen.getByLabelText(/kategori/i), {
      target: { value: 'food' },
    })
    fireEvent.change(screen.getByLabelText(/antal/i), {
      target: { value: '3' },
    })
    fireEvent.change(screen.getByLabelText(/enhet/i), {
      target: { value: 'kg' },
    })
    fireEvent.click(screen.getByRole('button', { name: /lagg till vara/i }))

    expect(await screen.findByText(/ris ar lagd i ditt forrad/i)).toBeInTheDocument()

    await waitFor(async () => {
      await expect(inventoryService.listItems()).resolves.toHaveLength(1)
    })
  })
})
