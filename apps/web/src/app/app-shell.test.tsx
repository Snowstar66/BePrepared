import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App shell', () => {
  it(
    'renders the preparedness overview shell on the home route',
    async () => {
      render(<App />)

      expect(
        await screen.findByRole('heading', {
          name: /hushallets beredskap i ett lugnt overblickslage/i,
        }),
      ).toBeInTheDocument()

      expect(
        await screen.findByText(/preparednessstatuscard/i),
      ).toBeInTheDocument()

      expect(
        screen.getByRole('button', {
          name: /hushallsprofil/i,
        }),
      ).toBeInTheDocument()
    },
    10000,
  )
})
