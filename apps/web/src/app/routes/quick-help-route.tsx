import { QuickHelpIndex } from '../../features/guides/components/quick-help-index'
import {
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
} from '../../shared/ui/styles'

export function QuickHelpRoute() {
  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="quick-help-route-title" style={pagePanelStyle}>
        <div style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Snabbhjälp</p>
          <h1 id="quick-help-route-title" style={pageTitleStyle}>
            Välj den guide som passar läget bäst
          </h1>
          <p style={pageIntroStyle}>
            Här når du snabbhjälpen direkt från startsidan, utan att först behöva
            fylla i hushållsdata.
          </p>
        </div>

        <QuickHelpIndex />
      </section>
    </main>
  )
}
