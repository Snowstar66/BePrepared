import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { HouseholdProfileService } from '../../household-profile/services/household-profile-service'
import { PreparednessHorizonService } from '../services/preparedness-horizon-service'

interface NeedsPrerequisiteGuardProps {
  children: ReactNode
}

interface GuardState {
  hasHouseholdProfile: boolean
  hasPreparednessHorizon: boolean
  isLoading: boolean
}

export function NeedsPrerequisiteGuard({
  children,
}: NeedsPrerequisiteGuardProps) {
  const [guardState, setGuardState] = useState<GuardState>({
    hasHouseholdProfile: false,
    hasPreparednessHorizon: false,
    isLoading: true,
  })
  const [householdProfileService] = useState(() => new HouseholdProfileService())
  const [preparednessHorizonService] = useState(
    () => new PreparednessHorizonService(),
  )

  useEffect(() => {
    let isMounted = true

    void Promise.all([
      householdProfileService.loadProfile(),
      preparednessHorizonService.loadSelection(),
    ]).then(([profile, horizon]) => {
      if (!isMounted) {
        return
      }

      setGuardState({
        hasHouseholdProfile: profile !== null,
        hasPreparednessHorizon: horizon !== null,
        isLoading: false,
      })
    })

    return () => {
      isMounted = false
    }
  }, [householdProfileService, preparednessHorizonService])

  if (guardState.isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Laddar behovsvyn...</p>
  }

  if (guardState.hasHouseholdProfile && guardState.hasPreparednessHorizon) {
    return <>{children}</>
  }

  return (
    <section
      aria-labelledby="needs-guard-title"
      style={{
        display: 'grid',
        gap: '12px',
        padding: '16px',
        borderRadius: '16px',
        background: '#fff4e8',
      }}
    >
      <h2 id="needs-guard-title" style={{ margin: 0, color: '#173042' }}>
        Valj planeringsperiod innan vi visar behov
      </h2>
      <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
        Vi visar inte exakta behovstal forran hushallsprofilen och
        beredskapshorisonten ar sparade. Det gor underlaget tydligare och mer
        palitligt.
      </p>
      <Link
        to="/profil"
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
        Ga till hushallsprofilen
      </Link>
    </section>
  )
}
