import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { GuideRoute } from '../../../app/routes/guide-route'

describe('GuideRoute', () => {
  it(
    'renders the power outage guide with source metadata',
    async () => {
      render(
        <MemoryRouter initialEntries={['/guider/stromavbrott']}>
          <Routes>
            <Route path="/guider/:scenarioId" element={<GuideRoute />} />
          </Routes>
        </MemoryRouter>,
      )

      expect(
        await screen.findByRole('heading', { name: /guide vid strömavbrott/i }),
      ).toBeInTheDocument()
      expect(screen.getByText(/källa: msb/i)).toBeInTheDocument()
      expect(screen.getByText(/prioriterade steg/i)).toBeInTheDocument()
    },
    10000,
  )
})
