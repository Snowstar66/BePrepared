import { useEffect, useState } from 'react'
import { GuideCatalogService } from '../services/guide-catalog-service'
import { GuideScenarioCard } from './guide-scenario-card'
import type { GuideScenarioId } from '@beprepared/shared'

export function QuickHelpIndex() {
  const [guideCatalogService] = useState(() => new GuideCatalogService())
  const [scenarios, setScenarios] = useState<
    Array<{
      id: GuideScenarioId
      title: string
      summary: string
    }>
  >([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void guideCatalogService.listScenarios().then((result) => {
      if (!isMounted) {
        return
      }

      setScenarios([...result])
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [guideCatalogService])

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Laddar snabbhjälp...</p>
  }

  return (
    <section style={{ display: 'grid', gap: '16px' }}>
      {scenarios.map((scenario) => (
        <GuideScenarioCard key={scenario.id} scenario={scenario} />
      ))}
    </section>
  )
}
