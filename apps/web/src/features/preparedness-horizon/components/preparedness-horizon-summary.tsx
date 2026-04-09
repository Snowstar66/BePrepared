import { mutedCardStyle } from '../../../shared/ui/styles'
import type { PreparednessHorizonRecord } from '../schemas/preparedness-horizon-schema'

interface PreparednessHorizonSummaryProps {
  isLoading: boolean
  record: PreparednessHorizonRecord | null
}

export function PreparednessHorizonSummary({
  isLoading,
  record,
}: PreparednessHorizonSummaryProps) {
  let body = 'Ingen planeringsperiod vald ännu.'

  if (isLoading) {
    body = 'Laddar sparad planeringsperiod...'
  } else if (record !== null) {
    body = `Vald planeringsperiod: ${record.label}.`
  }

  return (
    <section aria-labelledby="preparedness-horizon-summary-title" style={mutedCardStyle}>
      <h2
        id="preparedness-horizon-summary-title"
        style={{ margin: 0, fontSize: '1.05rem', color: '#173042' }}
      >
        Profilsammanfattning
      </h2>
      <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>{body}</p>
    </section>
  )
}
