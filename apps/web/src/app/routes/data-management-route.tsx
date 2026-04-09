import { Link } from 'react-router-dom'
import { DataManagementPanel } from '../../features/settings-export/components/data-management-panel'

export function DataManagementRoute() {
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '24px',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <section
        aria-labelledby="data-management-page-title"
        style={{
          width: '100%',
          maxWidth: '720px',
          display: 'grid',
          gap: '16px',
          padding: '24px',
          borderRadius: '20px',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(242,247,249,0.96))',
          boxShadow: '0 24px 60px rgba(23,48,66,0.12)',
        }}
      >
        <Link to="/" style={{ color: '#173042' }}>
          Tillbaka till hem
        </Link>
        <header style={{ display: 'grid', gap: '8px' }}>
          <p
            style={{
              margin: 0,
              color: '#4b6575',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Datahantering
          </p>
          <h1 id="data-management-page-title" style={{ margin: 0, color: '#173042' }}>
            Behåll kontrollen över din lokala data
          </h1>
          <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
            Exportera en backup, importera tidigare data och fortsätt använda
            appen utan konto eller inloggning.
          </p>
        </header>
        <DataManagementPanel />
      </section>
    </main>
  )
}
