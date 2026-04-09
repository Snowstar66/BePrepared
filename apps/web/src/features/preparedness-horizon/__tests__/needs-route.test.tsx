import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NeedsRoute } from '../../../app/routes/needs-route'
import { HouseholdProfileService } from '../../household-profile/services/household-profile-service'
import { PreparednessHorizonService } from '../services/preparedness-horizon-service'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'

describe('Needs route prerequisite guard', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it('shows a prompt when no preparedness horizon has been selected yet', async () => {
    render(
      <MemoryRouter>
        <NeedsRoute />
      </MemoryRouter>,
    )

    expect(
      await screen.findByText(/valj planeringsperiod innan vi visar behov/i),
    ).toBeInTheDocument()
  })

  it('shows the needs placeholder when profile and horizon exist', async () => {
    const householdProfileService = new HouseholdProfileService()
    const preparednessHorizonService = new PreparednessHorizonService()

    await householdProfileService.save({
      adults: '2',
      children: '1',
      hasPets: true,
    })
    await preparednessHorizonService.save({
      horizon: '7-days',
    })

    render(
      <MemoryRouter>
        <NeedsRoute />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(/^vatten$/i)).toBeInTheDocument()
    })

    expect(
      screen.getByText(/detta ar ett forenklat planeringsstod och inte medicinskt personligt rad/i),
    ).toBeInTheDocument()
  })
})
