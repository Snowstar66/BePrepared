import { useEffect, useState } from 'react'
import {
  consumePreparednessDeltaFeedback,
  type PreparednessDeltaFeedbackPayload,
} from '../lib/preparedness-delta-feedback'
import {
  PreparednessStatusService,
  type PreparednessOverview as PreparednessOverviewModel,
} from '../services/preparedness-status-service'
import { GapSummaryCard } from './gap-summary-card'
import { NextStepPrompt } from './next-step-prompt'
import { PreparednessDeltaFeedback } from './preparedness-delta-feedback'
import { PreparednessStatusCard } from './preparedness-status-card'

export function PreparednessOverview() {
  const [preparednessStatusService] = useState(() => new PreparednessStatusService())
  const [overview, setOverview] = useState<PreparednessOverviewModel | null>(null)
  const [deltaFeedback] = useState<PreparednessDeltaFeedbackPayload | null>(() =>
    consumePreparednessDeltaFeedback(),
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void preparednessStatusService.loadOverview().then((result) => {
      if (!isMounted) {
        return
      }

      setOverview(result)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [preparednessStatusService])

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Laddar hushallets status...</p>
  }

  if (overview === null) {
    return null
  }

  return (
    <section style={{ display: 'grid', gap: '16px', marginBottom: '20px' }}>
      {deltaFeedback ? (
        <PreparednessDeltaFeedback
          title={deltaFeedback.title}
          body={deltaFeedback.body}
        />
      ) : null}
      <PreparednessStatusCard
        state={overview.state}
        title={overview.statusTitle}
        body={overview.statusBody}
        label={overview.statusLabel}
      />
      <GapSummaryCard highlights={overview.gapHighlights} />
      <NextStepPrompt
        title={overview.nextStepTitle}
        body={overview.nextStepBody}
        href={overview.nextStepHref}
        label={overview.nextStepLabel}
      />
    </section>
  )
}
