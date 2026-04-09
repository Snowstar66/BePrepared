import { useEffect, useState, type CSSProperties } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { OfflineStateBanner } from '../features/offline-sync/components/offline-state-banner'
import { AppIcon, BuffertkollMark } from '../shared/ui/app-icons'

const navigationItems = [
  { to: '/', label: 'Översikt', icon: 'home' },
  { to: '/profil', label: 'Hushållsprofil', icon: 'profile' },
  { to: '/behov', label: 'Grundbehov', icon: 'needs' },
  { to: '/forrad', label: 'Förråd', icon: 'inventory' },
  { to: '/forrad/ny', label: 'Lägg till vara', icon: 'add' },
  { to: '/gap-analys', label: 'Gap-analys', icon: 'gap' },
  { to: '/inkopsoversikt', label: 'Inköpsöversikt', icon: 'shopping' },
  { to: '/underhall', label: 'Underhåll', icon: 'maintenance' },
  { to: '/snabbhjalp', label: 'Snabbhjälp', icon: 'help' },
  { to: '/installningar/data', label: 'Datahantering', icon: 'data' },
] as const

const floatingButtonStyle: CSSProperties = {
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: 40,
  width: '56px',
  height: '56px',
  border: 'none',
  borderRadius: '18px',
  background: '#173042',
  color: '#f6fbfd',
  boxShadow: '0 16px 36px rgba(23,48,66,0.24)',
  cursor: 'pointer',
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 41,
  border: 'none',
  background: 'rgba(23,48,66,0.28)',
  backdropFilter: 'blur(3px)',
  cursor: 'pointer',
}

const drawerStyle: CSSProperties = {
  position: 'fixed',
  top: '0',
  right: '0',
  zIndex: 42,
  width: 'min(360px, calc(100vw - 24px))',
  height: '100vh',
  padding: '24px',
  display: 'grid',
  alignContent: 'start',
  gap: '18px',
  background: 'linear-gradient(180deg, #f9fcfd 0%, #eef5f7 100%)',
  boxShadow: '-20px 0 48px rgba(23,48,66,0.18)',
}

function getNavigationLinkStyle(isActive: boolean): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    borderRadius: '16px',
    textDecoration: 'none',
    background: isActive ? '#dcebf0' : '#ffffff',
    color: '#173042',
    border: isActive ? '1px solid #8fb1c0' : '1px solid #d7e5eb',
    boxShadow: isActive ? '0 12px 24px rgba(23,48,66,0.08)' : 'none',
    fontWeight: isActive ? 700 : 600,
  }
}

export function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <>
      <OfflineStateBanner />
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isMenuOpen}
        aria-controls="app-navigation-drawer"
        aria-label={isMenuOpen ? 'Stäng meny' : 'Öppna meny'}
        onClick={() => {
          setIsMenuOpen((current) => !current)
        }}
        style={floatingButtonStyle}
      >
        <AppIcon kind={isMenuOpen ? 'close' : 'menu'} size={24} color="currentColor" />
      </button>

      {isMenuOpen ? (
        <>
          <button
            type="button"
            aria-label="Stäng menyn"
            onClick={() => {
              setIsMenuOpen(false)
            }}
            style={overlayStyle}
          />
          <aside
            id="app-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Buffertkoll navigation"
            style={drawerStyle}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                paddingRight: '52px',
              }}
            >
              <BuffertkollMark size={68} />
              <div style={{ display: 'grid', gap: '4px' }}>
                <strong style={{ color: '#173042', fontSize: '1.15rem' }}>
                  Buffertkoll
                </strong>
                <span style={{ color: '#4b6575', lineHeight: 1.5 }}>
                  Snabb väg till alla viktiga vyer i appen.
                </span>
              </div>
            </div>

            <nav aria-label="Huvudnavigation" style={{ display: 'grid', gap: '10px' }}>
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  style={({ isActive }) => getNavigationLinkStyle(isActive)}
                  onClick={() => {
                    setIsMenuOpen(false)
                  }}
                >
                  <AppIcon kind={item.icon} size={20} color="#325f7f" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </>
      ) : null}

      <Outlet />
    </>
  )
}
