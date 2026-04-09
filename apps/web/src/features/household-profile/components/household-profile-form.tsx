import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  actionStackStyle,
  fieldStyle,
  inputStyle,
  pageIntroStyle,
  primaryButtonStyle,
  surfaceCardStyle,
} from '../../../shared/ui/styles'
import { HouseholdProfileService } from '../services/household-profile-service'
import {
  defaultHouseholdProfileFormValues,
  householdProfileFormSchema,
  type HouseholdProfileFormValues,
} from '../schemas/household-profile-schema'

export function HouseholdProfileForm() {
  const [saveMessage, setSaveMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [householdProfileService] = useState(() => new HouseholdProfileService())

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HouseholdProfileFormValues>({
    defaultValues: defaultHouseholdProfileFormValues,
    resolver: zodResolver(householdProfileFormSchema),
  })

  useEffect(() => {
    let isMounted = true

    void householdProfileService.loadFormValues().then((values) => {
      if (!isMounted) {
        return
      }

      reset(values)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [householdProfileService, reset])

  async function onSubmit(values: HouseholdProfileFormValues) {
    const savedValues = await householdProfileService.save(values)
    reset(savedValues)
    setSaveMessage('Hushållsprofilen är sparad lokalt.')
  }

  return (
    <form
      aria-describedby="household-profile-description"
      onSubmit={(event) => {
        setSaveMessage('')
        void handleSubmit(onSubmit)(event)
      }}
      style={surfaceCardStyle}
    >
      <p id="household-profile-description" style={pageIntroStyle}>
        Profilen sparas bara på den här enheten och ligger till grund för kommande
        beräkningar.
      </p>

      <fieldset
        style={{
          margin: 0,
          padding: 0,
          border: 'none',
          display: 'grid',
          gap: '16px',
        }}
      >
        <legend style={{ fontWeight: 700, color: '#173042', marginBottom: '4px' }}>
          Uppgifter om hushållet
        </legend>

        <div style={fieldStyle}>
          <label htmlFor="adults">Antal vuxna</label>
          <input
            id="adults"
            inputMode="numeric"
            type="number"
            min="1"
            aria-invalid={errors.adults ? 'true' : 'false'}
            aria-describedby={errors.adults ? 'adults-error' : undefined}
            disabled={isLoading}
            style={inputStyle}
            {...register('adults')}
          />
          {errors.adults ? (
            <p id="adults-error" role="alert" style={{ margin: 0, color: '#9b1c1c' }}>
              {errors.adults.message}
            </p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label htmlFor="children">Antal barn, valfritt</label>
          <input
            id="children"
            inputMode="numeric"
            type="number"
            min="0"
            aria-invalid={errors.children ? 'true' : 'false'}
            aria-describedby={errors.children ? 'children-error' : undefined}
            disabled={isLoading}
            style={inputStyle}
            {...register('children')}
          />
          {errors.children ? (
            <p id="children-error" role="alert" style={{ margin: 0, color: '#9b1c1c' }}>
              {errors.children.message}
            </p>
          ) : null}
        </div>

        <label
          htmlFor="hasPets"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minHeight: '48px',
          }}
        >
          <input
            id="hasPets"
            type="checkbox"
            disabled={isLoading}
            style={{ minWidth: '20px', minHeight: '20px' }}
            {...register('hasPets')}
          />
          <span>Hushållet har husdjur</span>
        </label>
      </fieldset>

      <div style={actionStackStyle}>
        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          style={primaryButtonStyle}
        >
          {isSubmitting ? 'Sparar...' : 'Spara hushållsprofil'}
        </button>

        {saveMessage ? (
          <p role="status" style={{ margin: 0, color: '#1d5b3a' }}>
            {saveMessage}
          </p>
        ) : null}
      </div>
    </form>
  )
}
