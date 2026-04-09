import { NeedsPrerequisiteGuard } from '../../features/preparedness-horizon/components/needs-prerequisite-guard'
import { PreparednessNeedsOverview } from '../../features/preparedness-needs/components/preparedness-needs-overview'

export function NeedsRoute() {
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
        aria-labelledby="needs-route-title"
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
            Grundbehov
          </p>
          <h1
            id="needs-route-title"
            style={{ margin: 0, fontSize: 'clamp(2rem, 6vw, 3rem)' }}
          >
            Se hushållets grundbehov
          </h1>
          <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
            Här ser du hushållets grundnivå för vatten och mat när profil och
            planeringsperiod är sparade.
          </p>
        </div>

        <NeedsPrerequisiteGuard>
          <PreparednessNeedsOverview />
        </NeedsPrerequisiteGuard>
      </section>
    </main>
  )
}
