import { useEffect, useState, type CSSProperties } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { OfflineStateBanner } from '../features/offline-sync/components/offline-state-banner'
import { AppIcon, BuffertkollMark } from '../shared/ui/app-icons'

const navigationItems = [
  { to: '/', label: 'Dashboard', icon: 'home' },
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

const layoutRootStyle: CSSProperties = {
  minHeight: '100vh',
  display: 'grid',
  alignContent: 'start',
}

const appHeaderStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 30,
  padding: '14px 16px 8px',
}

const appHeaderShellStyle: CSSProperties = {
  width: '100%',
  maxWidth: '760px',
  margin: '0 auto',
  padding: '14px 18px 12px',
  display: 'grid',
  gap: '10px',
  background: 'rgba(238,245,247,0.92)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(151,178,190,0.35)',
  borderRadius: '24px',
  boxShadow: '0 16px 34px rgba(23,48,66,0.08)',
}

const appHeaderInnerStyle: CSSProperties = {
  width: '100%',
  display: 'flex',
  gap: '14px',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
}

const brandLinkStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  color: '#173042',
  minWidth: 0,
}

const brandCopyStyle: CSSProperties = {
  display: 'grid',
  gap: '2px',
}

const headerActionsStyle: CSSProperties = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  flexWrap: 'wrap',
}

const menuButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  minHeight: '48px',
  padding: '0 16px',
  border: 'none',
  borderRadius: '16px',
  background: '#173042',
  color: '#f6fbfd',
  boxShadow: '0 14px 28px rgba(23,48,66,0.16)',
  cursor: 'pointer',
  fontWeight: 700,
}

const layoutContentStyle: CSSProperties = {
  width: '100%',
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 34,
  border: 'none',
  background: 'rgba(18,41,56,0.34)',
  backdropFilter: 'blur(4px)',
  cursor: 'pointer',
}

const drawerStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 35,
  width: 'min(380px, 100vw)',
  height: '100vh',
  padding: '24px 20px 28px',
  display: 'grid',
  alignContent: 'start',
  gap: '18px',
  background: 'linear-gradient(180deg, #fbfdfd 0%, #ecf4f7 100%)',
  boxShadow: '-24px 0 60px rgba(18,41,56,0.22)',
}

function getNavigationLinkStyle(isActive: boolean): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    borderRadius: '18px',
    textDecoration: 'none',
    background: isActive ? '#d7e7ee' : '#ffffff',
    color: '#173042',
    border: isActive ? '1px solid #90afbd' : '1px solid #d6e4ea',
    boxShadow: isActive ? '0 12px 24px rgba(23,48,66,0.08)' : '0 8px 18px rgba(23,48,66,0.04)',
    fontWeight: isActive ? 700 : 600,
  }
}

function getDashboardLinkStyle(isHome: boolean): CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    minHeight: '48px',
    padding: '0 16px',
    borderRadius: '16px',
    textDecoration: 'none',
    fontWeight: 700,
    background: isHome ? '#dcecf2' : '#ffffff',
    color: '#173042',
    border: isHome ? '1px solid #9ab6c4' : '1px solid #d6e4ea',
    boxShadow: '0 10px 22px rgba(23,48,66,0.06)',
  }
}

function getCurrentView(pathname: string) {
  if (pathname === '/') {
    return {
      label: 'Dashboard',
      description: 'Startskärmen med hushållets samlade översikt.',
    }
  }

  if (pathname.startsWith('/profil')) {
    return {
      label: 'Hushållsprofil',
      description: 'Uppgifter om hushållet och vald beredskapshorisont.',
    }
  }

  if (pathname.startsWith('/behov')) {
    return {
      label: 'Grundbehov',
      description: 'Basnivåer för vatten och mat utifrån hushållet.',
    }
  }

  if (pathname.startsWith('/forrad/ny')) {
    return {
      label: 'Lägg till vara',
      description: 'Snabb registrering av nya artiklar i förrådet.',
    }
  }

  if (pathname.startsWith('/forrad/')) {
    return {
      label: 'Redigera förråd',
      description: 'Justera eller ta bort en registrerad vara.',
    }
  }

  if (pathname.startsWith('/forrad')) {
    return {
      label: 'Förråd',
      description: 'Se vad som finns hemma och vad som behöver fyllas på.',
    }
  }

  if (pathname.startsWith('/gap-analys')) {
    return {
      label: 'Gap-analys',
      description: 'Jämför behovet mot registrerat lager.',
    }
  }

  if (pathname.startsWith('/inkopsoversikt')) {
    return {
      label: 'Inköpsöversikt',
      description: 'Prioriterade inköp utifrån dagens luckor.',
    }
  }

  if (pathname.startsWith('/underhall')) {
    return {
      label: 'Underhåll',
      description: 'Rotation, påminnelser och löpande uppföljning.',
    }
  }

  if (pathname.startsWith('/guider/')) {
    return {
      label: 'Guide',
      description: 'Steg-för-steg-stöd i ett valt scenario.',
    }
  }

  if (pathname.startsWith('/snabbhjalp')) {
    return {
      label: 'Snabbhjälp',
      description: 'Akuta scenarier och korta vägledningar.',
    }
  }

  if (pathname.startsWith('/installningar/data')) {
    return {
      label: 'Datahantering',
      description: 'Export, import och lokal återställning.',
    }
  }

  return {
    label: 'Buffertkoll',
    description: 'Översikt över hushållets beredskap.',
  }
}

export function AppLayout() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currentView = getCurrentView(location.pathname)
  const isHome = location.pathname === '/'

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
    <div style={layoutRootStyle}>
      <OfflineStateBanner />

      <header style={appHeaderStyle}>
        <div
          style={appHeaderShellStyle}
        >
          <div style={appHeaderInnerStyle}>
            <Link to="/" aria-label="Gå till Buffertkoll dashboard" style={brandLinkStyle}>
              <BuffertkollMark size={48} />
              <div style={brandCopyStyle}>
                <strong style={{ fontSize: '1.05rem', lineHeight: 1.1 }}>Buffertkoll</strong>
                <span style={{ color: '#355263', lineHeight: 1.3 }}>{currentView.label}</span>
              </div>
            </Link>

            <div style={headerActionsStyle}>
              <Link to="/" style={getDashboardLinkStyle(isHome)}>
                <AppIcon kind="home" size={18} color="currentColor" />
                <span>{isHome ? 'Dashboard aktiv' : 'Till dashboard'}</span>
              </Link>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isMenuOpen}
                aria-controls="app-navigation-drawer"
                aria-label={isMenuOpen ? 'Stäng meny' : 'Öppna meny'}
                onClick={() => {
                  setIsMenuOpen((current) => !current)
                }}
                style={menuButtonStyle}
              >
                <AppIcon kind={isMenuOpen ? 'close' : 'menu'} size={22} color="currentColor" />
                <span>Meny</span>
              </button>
            </div>
          </div>
          <div
            style={{
              color: '#4b6575',
              lineHeight: 1.45,
              fontSize: '0.95rem',
            }}
          >
            {currentView.description}
          </div>
        </div>
      </header>

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
                paddingRight: '56px',
              }}
            >
              <BuffertkollMark size={64} />
              <div style={{ display: 'grid', gap: '4px' }}>
                <strong style={{ color: '#173042', fontSize: '1.15rem' }}>
                  Buffertkoll
                </strong>
                <span style={{ color: '#4b6575', lineHeight: 1.5 }}>
                  Växla vy snabbt, även när du står mitt i ett formulär eller en guide.
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

      <div style={layoutContentStyle}>
        <Outlet />
      </div>
    </div>
  )
}
