import { AppIcon } from '../../../shared/ui/app-icons'
import { surfaceCardStyle } from '../../../shared/ui/styles'
import type { PreparednessOverviewState } from '../services/preparedness-status-service'

interface PreparednessStatusCardProps {
  state: PreparednessOverviewState
  title: string
  body: string
  label: string
}

function getAccentColor(state: PreparednessOverviewState) {
  if (state === 'complete') {
    return '#1d5b3a'
  }

  if (state === 'partial') {
    return '#173042'
  }

  return '#8a4b14'
}

export function PreparednessStatusCard({
  state,
  title,
  body,
  label,
}: PreparednessStatusCardProps) {
  return (
    <section aria-labelledby="preparedness-status-title" style={surfaceCardStyle}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              display: 'grid',
              placeItems: 'center',
              background: '#e3f0e5',
              color: '#1d5b3a',
            }}
          >
            <AppIcon kind="status" size={22} color="currentColor" />
          </div>
          <h2 id="preparedness-status-title" style={{ margin: 0, color: '#173042' }}>
            Buffertstatus
          </h2>
        </div>
        <span
          style={{
            padding: '6px 10px',
            borderRadius: '999px',
            background: '#eef5f7',
            border: '1px solid #d7e5eb',
            color: getAccentColor(state),
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          {label}
        </span>
      </div>
      <h3 style={{ margin: 0, color: '#173042', fontSize: '1.4rem' }}>{title}</h3>
      <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>{body}</p>
    </section>
  )
}
