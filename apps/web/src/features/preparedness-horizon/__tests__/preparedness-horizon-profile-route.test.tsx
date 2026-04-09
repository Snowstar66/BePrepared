import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProfileRoute } from '../../../app/routes/profile-route'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'

describe('Preparedness horizon on the profile route', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it(
    'lets the user save and reload the selected horizon',
    async () => {
      const firstRender = render(
        <MemoryRouter>
          <ProfileRoute />
        </MemoryRouter>,
      )

      const saveButton = await screen.findByRole('button', {
        name: /spara planeringsperiod/i,
      })

      await act(async () => {
        fireEvent.click(screen.getByLabelText(/72 timmar/i))
        fireEvent.click(saveButton)
      })

      expect(
        await screen.findByText(/planeringsperioden 72 timmar ar sparad lokalt/i),
      ).toBeInTheDocument()

      await waitFor(() => {
        expect(
          screen.getByText(/vald planeringsperiod: 72 timmar/i),
        ).toBeInTheDocument()
      })

      firstRender.unmount()

      render(
        <MemoryRouter>
          <ProfileRoute />
        </MemoryRouter>,
      )

      await waitFor(() => {
        expect(
          screen.getByText(/vald planeringsperiod: 72 timmar/i),
        ).toBeInTheDocument()
      })
    },
    10000,
  )
})
