import { useNavigate } from 'react-router-dom'
import { PreparednessOverview } from '../../features/preparedness-status/components/preparedness-overview'
import { BuffertkollMark } from '../../shared/ui/app-icons'
import {
  accentButtonStyle,
  actionGridStyle,
  mutedCardStyle,
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from '../../shared/ui/styles'

export function HomeRoute() {
  const navigate = useNavigate()

  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="app-shell-title" style={pagePanelStyle}>
        <div style={pageHeaderStyle}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              flexWrap: 'wrap',
            }}
          >
            <BuffertkollMark size={88} />
            <div style={{ display: 'grid', gap: '8px', flex: '1 1 260px' }}>
              <p style={pageEyebrowStyle}>Dashboard</p>
              <h1 id="app-shell-title" style={pageTitleStyle}>
                Buffertkoll översikt
              </h1>
            </div>
          </div>
          <p style={pageIntroStyle}>
            Det här är din startsida i appen. Härifrån ser du hushållets läge, de
            viktigaste luckorna och hoppar snabbt vidare till rätt vy när du använder
            menyn eller snabbvägarna nedan.
          </p>
        </div>

        <section
          aria-label="Startintroduktion"
          style={{
            ...mutedCardStyle,
            gap: '10px',
            background: 'linear-gradient(180deg, #eef6f8 0%, #e7f1f4 100%)',
          }}
        >
          <strong style={{ fontSize: '1rem', color: '#173042' }}>Det här är din dashboard</strong>
          <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
            Toppraden visar alltid var du är i appen. Använd knappen <strong>Meny</strong>{' '}
            för att nå profil, förråd, behov, snabbhjälp och övriga vyer direkt, även på mobil.
          </p>
        </section>

        <PreparednessOverview />

        <section
          aria-labelledby="dashboard-shortcuts-title"
          style={{ display: 'grid', gap: '14px' }}
        >
          <div style={{ display: 'grid', gap: '6px' }}>
            <h2
              id="dashboard-shortcuts-title"
              style={{ margin: 0, color: '#173042', fontSize: '1.5rem' }}
            >
              Snabbvägar från dashboarden
            </h2>
            <p style={{ margin: 0, color: '#4b6575', lineHeight: 1.6 }}>
              Välj nästa steg utan att behöva leta efter rätt vy.
            </p>
          </div>

          <div style={actionGridStyle}>
            <button
              type="button"
              onClick={() => {
                void navigate('/profil')
              }}
              style={primaryButtonStyle}
            >
              Hushållsprofil
            </button>
            <button
              type="button"
              onClick={() => {
                void navigate('/forrad')
              }}
              style={secondaryButtonStyle}
            >
              Se förråd
            </button>
            <button
              type="button"
              onClick={() => {
                void navigate('/forrad/ny')
              }}
              style={secondaryButtonStyle}
            >
              Lägg till vara
            </button>
            <button
              type="button"
              onClick={() => {
                void navigate('/behov')
              }}
              style={secondaryButtonStyle}
            >
              Grundbehov
            </button>
            <button
              type="button"
              onClick={() => {
                void navigate('/gap-analys')
              }}
              style={secondaryButtonStyle}
            >
              Se gap-analys
            </button>
            <button
              type="button"
              onClick={() => {
                void navigate('/underhall')
              }}
              style={secondaryButtonStyle}
            >
              Underhåll
            </button>
            <button
              type="button"
              onClick={() => {
                void navigate('/snabbhjalp')
              }}
              style={accentButtonStyle}
            >
              Snabbhjälp
            </button>
            <button
              type="button"
              onClick={() => {
                void navigate('/installningar/data')
              }}
              style={secondaryButtonStyle}
            >
              Datahantering
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}
