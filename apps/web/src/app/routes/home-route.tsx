import { useNavigate } from 'react-router-dom'
import {
  accentButtonStyle,
  actionGridStyle,
  pageEyebrowStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
  pageHeaderStyle,
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
          <p style={pageEyebrowStyle}>BePrepared</p>
          <h1 id="app-shell-title" style={pageTitleStyle}>
            Hushållets beredskap i lugn överblick
          </h1>
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
