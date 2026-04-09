import { render, screen } from '@testing-library/react'
import { OfflineStateBanner } from '../components/offline-state-banner'

describe('OfflineStateBanner', () => {
  afterEach(() => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: true,
    })
  })

  it('shows a calm offline message when the browser is offline', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: false,
    })

    render(<OfflineStateBanner />)

    expect(screen.getByRole('status')).toHaveTextContent(/offline-lage aktivt/i)
  })
})
