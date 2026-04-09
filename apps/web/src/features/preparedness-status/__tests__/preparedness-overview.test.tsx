import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'
import { PreparednessOverview } from '../components/preparedness-overview'

describe('PreparednessOverview', () => {
  beforeEach(async () => {
    window.sessionStorage.clear()
    await resetAppDbForTests()
  })

  afterEach(async () => {
    window.sessionStorage.clear()
    await resetAppDbForTests()
  })

  it('shows delta feedback when a recent inventory change exists', async () => {
    window.sessionStorage.setItem(
      'bePrepared.preparednessDeltaFeedback',
      JSON.stringify({
        title: 'Beredskapen har uppdaterats',
        body: '6 liter lades till och vattengapet räknades om direkt.',
      }),
    )

    render(
      <MemoryRouter>
        <PreparednessOverview />
      </MemoryRouter>,
    )

    expect(await screen.findByText(/senaste förändringen/i)).toBeInTheDocument()
    expect(
      screen.getByText(/6 liter lades till och vattengapet räknades om direkt/i),
    ).toBeInTheDocument()
  })
})
