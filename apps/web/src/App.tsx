import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { OfflineStateBanner } from './features/offline-sync/components/offline-state-banner'
import { DataRecoveryPanel } from './features/settings-export/components/data-recovery-panel'
import { LocalDataManagementService } from './features/settings-export/services/local-data-management-service'
import { router } from './app/router'
import { startSwedishTextNormalizer } from './shared/i18n/swedish-text-normalizer'

function App() {
  const [localDataManagementService] = useState(
    () => new LocalDataManagementService(),
  )
  const [integrityState, setIntegrityState] = useState<{
    isChecking: boolean
    isValid: boolean
    message: string
  }>({
    isChecking: true,
    isValid: true,
    message: '',
  })

  useEffect(() => {
    let isMounted = true

    void localDataManagementService.validateCurrentData().then((result) => {
      if (!isMounted) {
        return
      }

      setIntegrityState({
        isChecking: false,
        isValid: result.isValid,
        message: result.message,
      })
    })

    return () => {
      isMounted = false
    }
  }, [localDataManagementService])

  useEffect(() => {
    if (import.meta.env.MODE === 'test') {
      return undefined
    }

    const rootElement = document.getElementById('root')

    if (rootElement === null) {
      return undefined
    }

    return startSwedishTextNormalizer(rootElement)
  }, [])

  if (integrityState.isChecking) {
    return <p style={{ margin: '24px', color: '#355263' }}>Validerar lokal data...</p>
  }

  if (!integrityState.isValid) {
    return (
      <DataRecoveryPanel
        reason={integrityState.message}
        onRecovered={() => {
          setIntegrityState({
            isChecking: false,
            isValid: true,
            message: '',
          })
        }}
      />
    )
  }

  return (
    <>
      <OfflineStateBanner />
      <RouterProvider router={router} />
    </>
  )
}

export default App
