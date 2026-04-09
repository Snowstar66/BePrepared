import { Link } from 'react-router-dom'
import { MaintenanceOverview } from '../../features/reminders/components/maintenance-overview'

export function MaintenanceRoute() {
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
        aria-labelledby="maintenance-title"
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
            Underhall
          </p>
          <h1 id="maintenance-title" style={{ margin: 0, color: '#173042' }}>
            Hall beredskapen levande over tid
          </h1>
          <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
            Har samlar vi paminnelser och en tydlig lista over varor som snart behover
            granskas, roteras eller ersattas.
          </p>
        </header>
        <MaintenanceOverview />
      </section>
    </main>
  )
}
