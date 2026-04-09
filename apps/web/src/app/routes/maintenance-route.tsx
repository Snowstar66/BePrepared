import { Link } from 'react-router-dom'
import { MaintenanceOverview } from '../../features/reminders/components/maintenance-overview'
import {
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
} from '../../shared/ui/styles'

export function MaintenanceRoute() {
  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="maintenance-title" style={pagePanelStyle}>
        <Link to="/" style={{ color: '#173042' }}>
          Tillbaka till hem
        </Link>
        <header style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Underhåll</p>
          <h1 id="maintenance-title" style={pageTitleStyle}>
            Håll beredskapen levande över tid
          </h1>
          <p style={pageIntroStyle}>
            Här samlar vi påminnelser och en tydlig lista över varor som snart
            behöver ses över, roteras eller ersättas.
          </p>
        </header>
        <MaintenanceOverview />
      </section>
    </main>
  )
}
