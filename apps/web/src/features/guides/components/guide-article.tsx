import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { PublishedGuide } from '@beprepared/shared'
import { GuideCatalogService } from '../services/guide-catalog-service'

function getReviewLabel(reviewStatus: PublishedGuide['reviewStatus']) {
  return reviewStatus === 'reviewed' ? 'Granskad' : 'Uppdaterad'
}

export function GuideArticle() {
  const { scenarioId } = useParams()
  const [guideCatalogService] = useState(() => new GuideCatalogService())
  const [guide, setGuide] = useState<PublishedGuide | null>(null)
  const [isLoading, setIsLoading] = useState(() => scenarioId !== undefined)

  useEffect(() => {
    let isMounted = true

    if (!scenarioId) {
      return
    }

    void guideCatalogService.getGuideByScenario(scenarioId).then((result) => {
      if (!isMounted) {
        return
      }

      setGuide(result)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [guideCatalogService, scenarioId])

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Laddar guide...</p>
  }

  if (guide === null) {
    return (
      <section
        style={{
          display: 'grid',
          gap: '12px',
          padding: '16px',
          borderRadius: '16px',
          background: '#eef5f7',
        }}
      >
        <h2 style={{ margin: 0, color: '#173042' }}>Guiden kunde inte hittas</h2>
        <Link
          to="/snabbhjalp"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '44px',
            minHeight: '44px',
            padding: '12px 18px',
            borderRadius: '999px',
            background: '#173042',
            color: '#f6fbfd',
            textDecoration: 'none',
          }}
        >
          Tillbaka till snabbhjalp
        </Link>
      </section>
    )
  }

  return (
    <article style={{ display: 'grid', gap: '16px' }}>
      <section
        style={{
          display: 'grid',
          gap: '8px',
          padding: '16px',
          borderRadius: '16px',
          background: '#f7fbfc',
          border: '1px solid #d7e5eb',
        }}
      >
        <h2 style={{ margin: 0, color: '#173042' }}>{guide.title}</h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          {guide.summary}
        </p>
      </section>

      <section
        aria-labelledby="guide-steps-title"
        style={{
          display: 'grid',
          gap: '12px',
          padding: '16px',
          borderRadius: '16px',
          background: '#eef5f7',
        }}
      >
        <h2 id="guide-steps-title" style={{ margin: 0, color: '#173042' }}>
          Prioriterade steg
        </h2>
        {guide.steps.map((step, index) => (
          <section
            key={step.title}
            style={{
              display: 'grid',
              gap: '6px',
              paddingBottom: '12px',
              borderBottom: '1px solid #d7e5eb',
            }}
          >
            <h3 style={{ margin: 0, color: '#173042' }}>
              {index + 1}. {step.title}
            </h3>
            <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
              {step.body}
            </p>
          </section>
        ))}
      </section>

      <section
        aria-labelledby="guide-metadata-title"
        style={{
          display: 'grid',
          gap: '8px',
          padding: '16px',
          borderRadius: '16px',
          background: '#fff4e8',
        }}
      >
        <h2 id="guide-metadata-title" style={{ margin: 0, color: '#173042' }}>
          Kalla och innehallsstatus
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Kalla: {guide.sourceName}
        </p>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Avsandare: {guide.publisher}
        </p>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          {getReviewLabel(guide.reviewStatus)}: {new Date(guide.reviewedAt).toLocaleDateString('sv-SE')}
        </p>
        <a
          href={guide.sourceUrl}
          target="_blank"
          rel="noreferrer"
          style={{ color: '#173042', fontWeight: 600 }}
        >
          Oppna kalla
        </a>
      </section>
    </article>
  )
}
