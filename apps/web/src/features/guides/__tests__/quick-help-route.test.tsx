import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QuickHelpRoute } from '../../../app/routes/quick-help-route'

describe('QuickHelpRoute', () => {
  it('shows the three primary quick-help scenarios', async () => {
    render(
      <MemoryRouter>
        <QuickHelpRoute />
      </MemoryRouter>,
    )

    expect(
      await screen.findByRole('heading', { name: /stromavbrott/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /vattenbrist/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /allman kris/i })).toBeInTheDocument()
  })
})
