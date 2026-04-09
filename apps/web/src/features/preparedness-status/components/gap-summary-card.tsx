import { AppIcon } from '../../../shared/ui/app-icons'
import { mutedCardStyle } from '../../../shared/ui/styles'

type GapSummaryKey = 'water' | 'food' | 'setup'

interface GapSummaryCardProps {
  highlights: Array<{
    key: GapSummaryKey
    label: string
    summary: string
    statusLabel: string
  }>
}

function getCategoryIconKind(key: GapSummaryKey) {
  if (key === 'water') {
    return 'water'
  }

  if (key === 'food') {
    return 'food'
  }

  return 'needs'
}

function getCategoryIconStyle(key: GapSummaryKey) {
  if (key === 'water') {
    return {
      background: '#dff1fb',
      color: '#1f78ab',
    }
  }

  if (key === 'food') {
    return {
      background: '#fff0dd',
      color: '#8a4b14',
    }
  }

  return {
    background: '#e6eef2',
    color: '#355263',
  }
}

export function GapSummaryCard({ highlights }: GapSummaryCardProps) {
  return (
    <section aria-labelledby="gap-summary-card-title" style={mutedCardStyle}>
      <h2 id="gap-summary-card-title" style={{ margin: 0, color: '#173042' }}>
        Viktigaste luckorna just nu
      </h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        {highlights.map((highlight) => {
          const iconStyle = getCategoryIconStyle(highlight.key)

          return (
            <article
              key={`${highlight.key}-${highlight.label}`}
              style={{
                display: 'grid',
                gap: '6px',
                paddingBottom: '12px',
                borderBottom: '1px solid #d7e5eb',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      display: 'grid',
                      placeItems: 'center',
                      background: iconStyle.background,
                      color: iconStyle.color,
                      flexShrink: 0,
                    }}
                  >
                    <AppIcon
                      kind={getCategoryIconKind(highlight.key)}
                      size={20}
                      color="currentColor"
                      title={highlight.label}
                    />
                  </div>
                  <h3 style={{ margin: 0, color: '#173042', fontSize: '1rem' }}>
                    {highlight.label}
                  </h3>
                </div>
                <span style={{ color: '#4b6575', fontSize: '0.9rem' }}>
                  {highlight.statusLabel}
                </span>
              </div>
              <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
                {highlight.summary}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
