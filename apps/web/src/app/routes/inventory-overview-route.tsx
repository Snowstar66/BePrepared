import { Link } from 'react-router-dom'
import { InventoryOverview } from '../../features/inventory/components/inventory-overview'
import {
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

export function InventoryOverviewRoute() {
  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="inventory-overview-title" style={pagePanelStyle}>
        <div style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Förråd</p>
          <h1 id="inventory-overview-title" style={pageTitleStyle}>
            Se ditt lager i tydliga kategorier
          </h1>
          <p style={pageIntroStyle}>
            Här får du en tydlig överblick över vad hushållet redan har hemma och
            vilka kategorier som behöver mest uppmärksamhet.
          </p>
        </div>

        <InventoryOverview />

        <div style={actionGridStyle}>
          <Link to="/forrad/ny" style={primaryButtonStyle}>
            Lägg till vara
          </Link>
          <Link to="/behov" style={secondaryButtonStyle}>
            Tillbaka till behovsöversikten
          </Link>
        </div>
      </section>
    </main>
  )
}
