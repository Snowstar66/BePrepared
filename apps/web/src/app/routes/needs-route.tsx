import { NeedsPrerequisiteGuard } from '../../features/preparedness-horizon/components/needs-prerequisite-guard'
import { PreparednessNeedsOverview } from '../../features/preparedness-needs/components/preparedness-needs-overview'
import {
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
} from '../../shared/ui/styles'

export function NeedsRoute() {
  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="needs-route-title" style={pagePanelStyle}>
        <div style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Grundbehov</p>
          <h1 id="needs-route-title" style={pageTitleStyle}>
            Se hushållets grundbehov
          </h1>
          <p style={pageIntroStyle}>
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
