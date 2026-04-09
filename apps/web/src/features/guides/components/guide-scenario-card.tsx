import { Link } from 'react-router-dom'
import type { GuideScenarioId } from '@beprepared/shared'

interface GuideScenarioCardProps {
  scenario: {
    id: GuideScenarioId
    title: string
    summary: string
  }
}

export function GuideScenarioCard({ scenario }: GuideScenarioCardProps) {
  return (
    <article
      style={{
        display: 'grid',
        gap: '10px',
        padding: '16px',
        borderRadius: '16px',
        background: '#eef5f7',
      }}
    >
      <h2 style={{ margin: 0, color: '#173042' }}>{scenario.title}</h2>
      <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
        {scenario.summary}
      </p>
      <Link
        to={`/guider/${scenario.id}`}
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
        Oppna guide
      </Link>
    </article>
  )
}
