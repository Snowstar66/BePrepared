import { useEffect, useRef, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { OfflineStateBanner } from './features/offline-sync/components/offline-state-banner'
import { DataRecoveryPanel } from './features/settings-export/components/data-recovery-panel'
import { LocalDataManagementService } from './features/settings-export/services/local-data-management-service'
import { router } from './app/router'
import {
  createUiLanguageController,
  readStoredUiLanguage,
  storeUiLanguage,
  type UiLanguage,
} from './shared/i18n/swedish-text-normalizer'

const languageSwitchContainerStyle = {
  position: 'fixed',
  top: '16px',
  right: '16px',
  zIndex: 1000,
  display: 'inline-flex',
  gap: '6px',
  padding: '6px',
  borderRadius: '999px',
  background: 'rgba(255,255,255,0.92)',
  boxShadow: '0 12px 32px rgba(23,48,66,0.16)',
} as const

function LanguageSwitch(props: {
  language: UiLanguage
  onChange: (language: UiLanguage) => void
}) {
  const { language, onChange } = props

  return (
    <div aria-label="Sprakval" role="group" style={languageSwitchContainerStyle}>
      {(['sv', 'en'] as const).map((option) => {
        const isActive = option === language

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              onChange(option)
            }}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              padding: '10px 14px',
              borderRadius: '999px',
              border: isActive ? 'none' : '1px solid #9bb2c0',
              background: isActive ? '#173042' : '#f6fbfd',
              color: isActive ? '#f6fbfd' : '#173042',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

function App() {
  const [localDataManagementService] = useState(
    () => new LocalDataManagementService(),
  )
  const [uiLanguage, setUiLanguage] = useState<UiLanguage>(() =>
    readStoredUiLanguage(),
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
  const uiLanguageControllerRef = useRef<ReturnType<
    typeof createUiLanguageController
  > | null>(null)

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

    const controller = createUiLanguageController(rootElement, uiLanguage)
    uiLanguageControllerRef.current = controller

    return () => {
      controller.disconnect()
      uiLanguageControllerRef.current = null
    }
  }, [])

  useEffect(() => {
    storeUiLanguage(uiLanguage)
    uiLanguageControllerRef.current?.setLanguage(uiLanguage)
  }, [uiLanguage])

  if (integrityState.isChecking) {
    return (
      <>
        <LanguageSwitch language={uiLanguage} onChange={setUiLanguage} />
        <p style={{ margin: '24px', color: '#355263' }}>Validerar lokal data...</p>
      </>
    )
  }

  if (!integrityState.isValid) {
    return (
      <>
        <LanguageSwitch language={uiLanguage} onChange={setUiLanguage} />
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
      </>
    )
  }

  return (
    <>
      <LanguageSwitch language={uiLanguage} onChange={setUiLanguage} />
      <OfflineStateBanner />
      <RouterProvider router={router} />
    </>
  )
}

export default App
