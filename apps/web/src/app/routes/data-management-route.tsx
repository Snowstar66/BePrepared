import { Link } from 'react-router-dom'
import { DataManagementPanel } from '../../features/settings-export/components/data-management-panel'
import {
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
} from '../../shared/ui/styles'

export function DataManagementRoute() {
  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="data-management-page-title" style={pagePanelStyle}>
        <Link to="/" style={{ color: '#173042' }}>
          Tillbaka till hem
        </Link>
        <header style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Datahantering</p>
          <h1 id="data-management-page-title" style={pageTitleStyle}>
            Behåll kontrollen över din lokala data
          </h1>
          <p style={pageIntroStyle}>
            Exportera en backup, importera tidigare data och fortsätt använda
            appen utan konto eller inloggning.
          </p>
        </header>
        <DataManagementPanel />
      </section>
    </main>
  )
}
