interface GapSummaryCardProps {
  highlights: Array<{
    label: string
    summary: string
    statusLabel: string
  }>
}

export function GapSummaryCard({ highlights }: GapSummaryCardProps) {
  return (
    <section
      aria-labelledby="gap-summary-card-title"
      style={{
        display: 'grid',
        gap: '12px',
        padding: '20px',
        borderRadius: '20px',
        background: '#eef5f7',
      }}
    >
      <h2 id="gap-summary-card-title" style={{ margin: 0, color: '#173042' }}>
        Viktigaste luckorna
      </h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        {highlights.map((highlight) => (
          <article
            key={highlight.label}
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
              <h3 style={{ margin: 0, color: '#173042', fontSize: '1rem' }}>
                {highlight.label}
              </h3>
              <span style={{ color: '#4b6575', fontSize: '0.9rem' }}>
                {highlight.statusLabel}
              </span>
            </div>
            <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
              {highlight.summary}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
