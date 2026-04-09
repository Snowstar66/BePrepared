import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HouseholdProfileForm } from '../../features/household-profile/components/household-profile-form'
import { PreparednessHorizonSelector } from '../../features/preparedness-horizon/components/preparedness-horizon-selector'
import { PreparednessHorizonSummary } from '../../features/preparedness-horizon/components/preparedness-horizon-summary'
import { PreparednessHorizonService } from '../../features/preparedness-horizon/services/preparedness-horizon-service'
import type { PreparednessHorizonRecord } from '../../features/preparedness-horizon/schemas/preparedness-horizon-schema'

export function ProfileRoute() {
  const [preparednessHorizonService] = useState(
    () => new PreparednessHorizonService(),
  )
  const [savedHorizon, setSavedHorizon] = useState<PreparednessHorizonRecord | null>(
    null,
  )
  const [isHorizonLoading, setIsHorizonLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void preparednessHorizonService.loadSelection().then((record) => {
      if (!isMounted) {
        return
      }

      setSavedHorizon(record)
      setIsHorizonLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [preparednessHorizonService])

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '24px',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <section
        aria-labelledby="profile-route-title"
        style={{
          width: '100%',
          maxWidth: '720px',
          padding: '24px',
          borderRadius: '20px',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(242,247,249,0.96))',
          boxShadow: '0 24px 60px rgba(23,48,66,0.12)',
        }}
      >
        <p
          style={{
            margin: 0,
            color: '#4b6575',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Hushållsprofil
        </p>
        <h1
          id="profile-route-title"
          style={{ marginBottom: '12px', fontSize: 'clamp(2rem, 6vw, 3rem)' }}
        >
          Registrera ditt hushåll
        </h1>
        <p
          style={{
            marginTop: 0,
            marginBottom: '20px',
            color: '#355263',
            lineHeight: 1.6,
          }}
        >
          Börja med det viktigaste: antal vuxna och, om du vill, uppgifter om
          barn och husdjur.
        </p>
        <HouseholdProfileForm />
        <PreparednessHorizonSummary
          isLoading={isHorizonLoading}
          record={savedHorizon}
        />
        <PreparednessHorizonSelector
          initialRecord={savedHorizon}
          onSaved={(record) => {
            setSavedHorizon(record)
            setIsHorizonLoading(false)
          }}
        />
        <Link
          to="/behov"
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
          Fortsätt till behovsöversikten
        </Link>
      </section>
    </main>
  )
}
