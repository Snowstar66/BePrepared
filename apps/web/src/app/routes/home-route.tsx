import { useNavigate } from 'react-router-dom'
import {
  accentButtonStyle,
  actionGridStyle,
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from '../../shared/ui/styles'
import { PreparednessOverview } from '../../features/preparedness-status/components/preparedness-overview'

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
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <img
              src="/buffertkoll-logo.svg"
              alt="Buffertkoll"
              width="84"
              height="84"
              style={{ width: '84px', height: '84px' }}
            />
            <div style={{ display: 'grid', gap: '8px', flex: '1 1 240px' }}>
              <p style={pageEyebrowStyle}>Din hushållsbuffer</p>
              <h1 id="app-shell-title" style={pageTitleStyle}>
                Buffertkoll
              </h1>
            </div>
          </div>
          <p style={pageIntroStyle}>
            Här ser du hushållets aktuella läge, de viktigaste luckorna och vilket
            nästa steg som gör störst nytta just nu.
          </p>
        </div>

        <PreparednessOverview />

        <div style={actionGridStyle}>
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
            Underhåll och rotation
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
    </main>
  )
}
