import { Link } from 'react-router-dom'
import { InventoryOverview } from '../../features/inventory/components/inventory-overview'

export function InventoryOverviewRoute() {
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
        aria-labelledby="inventory-overview-title"
        style={{
          width: '100%',
          maxWidth: '720px',
          padding: '24px',
          borderRadius: '20px',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(242,247,249,0.96))',
          boxShadow: '0 24px 60px rgba(23,48,66,0.12)',
          display: 'grid',
          gap: '20px',
        }}
      >
        <div style={{ display: 'grid', gap: '12px' }}>
          <p
            style={{
              margin: 0,
              color: '#4b6575',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Forrad
          </p>
          <h1
            id="inventory-overview-title"
            style={{ margin: 0, fontSize: 'clamp(2rem, 6vw, 3rem)' }}
          >
            Se ditt lager i tydliga kategorier
          </h1>
          <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
            Har kan du skanna vad hushallet redan har hemma och vilken kategori som
            behover lite mer uppmarksamhet.
          </p>
        </div>

        <InventoryOverview />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            to="/forrad/ny"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              background: '#173042',
              color: '#f6fbfd',
              textDecoration: 'none',
            }}
          >
            Lagg till vara
          </Link>
          <Link
            to="/behov"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1px solid #173042',
              background: '#f6fbfd',
              color: '#173042',
              textDecoration: 'none',
            }}
          >
            Tillbaka till behovsvyn
          </Link>
        </div>
      </section>
    </main>
  )
}
