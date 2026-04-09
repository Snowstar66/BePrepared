import { useEffect, useState } from 'react'

function readOnlineState() {
  if (typeof navigator === 'undefined') {
    return true
  }

  return navigator.onLine
}

export function OfflineStateBanner() {
  const [isOnline, setIsOnline] = useState(readOnlineState)

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }

    function handleOffline() {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) {
    return null
  }

  return (
    <section
      role="status"
      aria-live="polite"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        padding: '12px 16px',
        background: '#fff4e8',
        color: '#173042',
        borderBottom: '1px solid #e3c9a6',
      }}
    >
      Offline-lage aktivt. Sparad hushallsdata, lageroversikt och tidigare laddade guider
      fortsatter fungera lokalt.
    </section>
  )
}
