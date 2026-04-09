import { Link } from 'react-router-dom'
import { QuickAddItemSheet } from '../../features/inventory/components/quick-add-item-sheet'
import {
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
  primaryButtonStyle,
} from '../../shared/ui/styles'

export function InventoryQuickAddRoute() {
  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="inventory-quick-add-title" style={pagePanelStyle}>
        <div style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Förråd</p>
          <h1 id="inventory-quick-add-title" style={pageTitleStyle}>
            Lägg till en vara snabbt
          </h1>
          <p style={pageIntroStyle}>
            Den här vyn är gjord för snabb registrering i mobilen, utan onödiga
            steg.
          </p>
        </div>

        <QuickAddItemSheet />

        <Link to="/forrad" style={primaryButtonStyle}>
          Se lageröversikten
        </Link>
      </section>
    </main>
  )
}
