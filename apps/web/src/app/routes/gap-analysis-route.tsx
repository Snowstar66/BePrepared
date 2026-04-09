import { NeedsPrerequisiteGuard } from '../../features/preparedness-horizon/components/needs-prerequisite-guard'
import { PreparednessGapAnalysis } from '../../features/preparedness-gap/components/preparedness-gap-analysis'
import {
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
} from '../../shared/ui/styles'

export function GapAnalysisRoute() {
  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="gap-analysis-route-title" style={pagePanelStyle}>
        <div style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Gap-analys</p>
          <h1 id="gap-analysis-route-title" style={pageTitleStyle}>
            Se vad som saknas i beredskapen
          </h1>
          <p style={pageIntroStyle}>
            Här jämför vi hushållets grundnivå med det registrerade lagret och
            markerar osäkerhet när underlaget inte räcker för en exakt slutsats.
          </p>
        </div>

        <NeedsPrerequisiteGuard>
          <PreparednessGapAnalysis />
        </NeedsPrerequisiteGuard>
      </section>
    </main>
  )
}
