import { NeedsPrerequisiteGuard } from '../../features/preparedness-horizon/components/needs-prerequisite-guard'
import { ShoppingOverview } from '../../features/shopping-overview/components/shopping-overview'
import {
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
} from '../../shared/ui/styles'

export function ShoppingOverviewRoute() {
  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="shopping-overview-route-title" style={pagePanelStyle}>
        <div style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Inköpsöversikt</p>
          <h1 id="shopping-overview-route-title" style={pageTitleStyle}>
            Prioritera det som saknas mest
          </h1>
          <p style={pageIntroStyle}>
            Här samlar vi hushållets aktuella luckor i en enkel översikt som du
            kan spara och återkomma till.
          </p>
        </div>

        <NeedsPrerequisiteGuard>
          <ShoppingOverview />
        </NeedsPrerequisiteGuard>
      </section>
    </main>
  )
}
