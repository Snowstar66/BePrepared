import { GuideArticle } from '../../features/guides/components/guide-article'
import {
  pageEyebrowStyle,
  pageHeaderStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
} from '../../shared/ui/styles'

export function GuideRoute() {
  return (
    <main style={pageMainStyle}>
      <section aria-labelledby="guide-route-title" style={pagePanelStyle}>
        <div style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Guide</p>
          <h1 id="guide-route-title" style={pageTitleStyle}>
            Lugn vägledning steg för steg
          </h1>
        </div>

        <GuideArticle />
      </section>
    </main>
  )
}
