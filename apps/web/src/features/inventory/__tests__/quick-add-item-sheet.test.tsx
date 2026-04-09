import { fireEvent, render, screen } from '@testing-library/react'
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

  it(
    'shows validation without clearing input and stores the item locally',
    async () => {
      const inventoryService = new InventoryService()

      render(<QuickAddItemSheet />)

      fireEvent.change(screen.getByLabelText(/varans namn/i), {
        target: { value: 'Ris' },
      })
      fireEvent.click(screen.getByRole('button', { name: /lägg till vara/i }))

      expect(await screen.findByText(/välj en kategori/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/varans namn/i)).toHaveValue('Ris')

      fireEvent.change(screen.getByLabelText(/kategori/i), {
        target: { value: 'food' },
      })
      fireEvent.change(screen.getByLabelText(/antal/i), {
        target: { value: '3' },
      })
      fireEvent.change(screen.getByLabelText(/enhet/i), {
        target: { value: 'kg' },
      })
      fireEvent.click(screen.getByRole('button', { name: /lägg till vara/i }))

      expect(await screen.findByText(/ris är tillagd i ditt förråd/i)).toBeInTheDocument()

      const items = await inventoryService.listItems()
      expect(items).toHaveLength(1)
    },
    10000,
  )
})
