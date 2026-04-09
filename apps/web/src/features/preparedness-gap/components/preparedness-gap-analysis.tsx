import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  type PreparednessGapAnalysis as PreparednessGapAnalysisModel,
  type PreparednessGapStatus,
} from '../calculators/preparedness-gap-calculator'
import { PreparednessGapService } from '../services/preparedness-gap-service'

const sectionCardStyle = {
  display: 'grid',
  gap: '12px',
  padding: '16px',
  borderRadius: '16px',
  background: '#f7fbfc',
  border: '1px solid #d7e5eb',
}

function getStatusStyle(status: PreparednessGapStatus) {
  if (status === 'covered') {
    return {
      background: '#e7f6ed',
      color: '#1d5b3a',
    }
  }

  if (status === 'partial') {
    return {
      background: '#eef5f7',
      color: '#173042',
    }
  }

  if (status === 'missing') {
    return {
      background: '#fff4e8',
      color: '#8a4b14',
    }
  }

  return {
    background: '#f5edf8',
    color: '#5d3a78',
  }
}

export function PreparednessGapAnalysis() {
  const [preparednessGapService] = useState(() => new PreparednessGapService())
  const [analysis, setAnalysis] = useState<PreparednessGapAnalysisModel | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void preparednessGapService.loadAnalysis().then((result) => {
      if (!isMounted) {
        return
      }

      setAnalysis(result)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [preparednessGapService])

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Jämför behov mot lagret...</p>
  }

  if (analysis === null) {
    return null
  }

  return (
    <section style={{ display: 'grid', gap: '16px' }}>
      <section aria-labelledby="gap-summary-title" style={sectionCardStyle}>
        <h2 id="gap-summary-title" style={{ margin: 0, color: '#173042' }}>
          Gap-analys för {analysis.horizonLabel.toLowerCase()}
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          {analysis.summary}
        </p>
      </section>

      {analysis.categories.map((category) => {
        const statusStyle = getStatusStyle(category.status)

        return (
          <section
            key={category.key}
            aria-labelledby={`${category.key}-gap-title`}
            style={sectionCardStyle}
          >
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <h2
                id={`${category.key}-gap-title`}
                style={{ margin: 0, color: '#173042' }}
              >
                {category.label}
              </h2>
              <span
                style={{
                  ...statusStyle,
                  padding: '6px 10px',
                  borderRadius: '999px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                {category.statusLabel}
              </span>
            </div>

            <dl
              style={{
                display: 'grid',
                gap: '12px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                margin: 0,
              }}
            >
              <div>
                <dt style={{ color: '#4b6575', fontSize: '0.9rem' }}>Behov</dt>
                <dd style={{ margin: '6px 0 0', color: '#173042', fontWeight: 600 }}>
                  {category.needLabel}
                </dd>
              </div>
              <div>
                <dt style={{ color: '#4b6575', fontSize: '0.9rem' }}>Registrerat lager</dt>
                <dd style={{ margin: '6px 0 0', color: '#173042', fontWeight: 600 }}>
                  {category.inventoryLabel}
                </dd>
              </div>
              <div>
                <dt style={{ color: '#4b6575', fontSize: '0.9rem' }}>Gap</dt>
                <dd style={{ margin: '6px 0 0', color: '#173042', fontWeight: 600 }}>
                  {category.gapLabel}
                </dd>
              </div>
            </dl>

            <ul style={{ margin: 0, paddingLeft: '20px', color: '#355263', lineHeight: 1.6 }}>
              {category.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        )
      })}

      <section
        aria-labelledby="gap-next-step-title"
        style={{
          display: 'grid',
          gap: '12px',
          padding: '16px',
          borderRadius: '16px',
          background: '#eef5f7',
        }}
      >
        <h2 id="gap-next-step-title" style={{ margin: 0, color: '#173042' }}>
          Nästa steg
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          {analysis.nextStep}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            to="/forrad"
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
            Se förrådet
          </Link>
          <Link
            to="/forrad/ny"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1px solid #173042',
              color: '#173042',
              textDecoration: 'none',
            }}
          >
            Lägg till vara
          </Link>
          <Link
            to="/inkopsoversikt"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1px solid #173042',
              color: '#173042',
              textDecoration: 'none',
            }}
          >
            Se inköpsöversikt
          </Link>
        </div>
      </section>
    </section>
  )
}
