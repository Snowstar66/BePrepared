import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HouseholdProfileForm } from '../../features/household-profile/components/household-profile-form'
import { PreparednessHorizonSelector } from '../../features/preparedness-horizon/components/preparedness-horizon-selector'
import { PreparednessHorizonSummary } from '../../features/preparedness-horizon/components/preparedness-horizon-summary'
import { PreparednessHorizonService } from '../../features/preparedness-horizon/services/preparedness-horizon-service'
import type { PreparednessHorizonRecord } from '../../features/preparedness-horizon/schemas/preparedness-horizon-schema'
import {
  actionStackStyle,
  pageEyebrowStyle,
  pageHeaderStyle,
  pageIntroStyle,
  pageMainStyle,
  pagePanelStyle,
  pageTitleStyle,
  primaryButtonStyle,
} from '../../shared/ui/styles'

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
    <main style={pageMainStyle}>
      <section aria-labelledby="profile-route-title" style={pagePanelStyle}>
        <div style={pageHeaderStyle}>
          <p style={pageEyebrowStyle}>Hushållsprofil</p>
          <h1 id="profile-route-title" style={pageTitleStyle}>
            Registrera ditt hushåll
          </h1>
          <p style={pageIntroStyle}>
            Börja med det viktigaste: antal vuxna och, om du vill, uppgifter om
            barn och husdjur.
          </p>
        </div>

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

        <div style={actionStackStyle}>
          <Link to="/behov" style={primaryButtonStyle}>
            Fortsätt till behovsöversikten
          </Link>
        </div>
      </section>
    </main>
  )
}
