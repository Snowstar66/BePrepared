import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App shell', () => {
  it(
    'renders the preparedness overview shell on the home route',
    async () => {
      render(<App />)

      expect(
        await screen.findByRole('heading', {
          name: /buffertkoll/i,
        }),
      ).toBeInTheDocument()

      expect(await screen.findByText(/buffertstatus/i)).toBeInTheDocument()

      expect(
        screen.getByRole('button', {
          name: /öppna meny/i,
        }),
      ).toBeInTheDocument()

      expect(
        screen.getByRole('button', {
          name: /hushållsprofil/i,
        }),
      ).toBeInTheDocument()
    },
    10000,
  )
})
