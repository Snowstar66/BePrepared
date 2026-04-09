import { Link } from 'react-router-dom'
import { QuickAddItemSheet } from '../../features/inventory/components/quick-add-item-sheet'

export function InventoryQuickAddRoute() {
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
        aria-labelledby="inventory-quick-add-title"
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
            Förråd
          </p>
          <h1
            id="inventory-quick-add-title"
            style={{ margin: 0, fontSize: 'clamp(2rem, 6vw, 3rem)' }}
          >
            Lägg till en vara snabbt
          </h1>
          <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
            Den här vyn är gjord för snabb registrering i mobilen, utan onödiga
            steg.
          </p>
        </div>

        <QuickAddItemSheet />

        <Link
          to="/forrad"
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
          Se lageröversikten
        </Link>
      </section>
    </main>
  )
}
