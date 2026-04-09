import { Link } from 'react-router-dom'
import { EditInventoryItemForm } from '../../features/inventory/components/edit-inventory-item-form'
import {
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
  secondaryButtonStyle,
} from '../../shared/ui/styles'

export function InventoryItemEditRoute() {
  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="inventory-edit-title" style={pagePanelStyle}>
        <div style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Förråd</p>
          <h1 id="inventory-edit-title" style={pageTitleStyle}>
            Redigera lagerartikel
          </h1>
          <p style={pageIntroStyle}>
            Uppdatera artikeln så att lageröversikten fortsätter vara tydlig och
            pålitlig.
          </p>
        </div>

        <EditInventoryItemForm />

        <Link to="/forrad" style={secondaryButtonStyle}>
          Tillbaka till förrådet
        </Link>
      </section>
    </main>
  )
}
