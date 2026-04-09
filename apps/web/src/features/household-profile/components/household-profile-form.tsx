import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HouseholdProfileService } from '../services/household-profile-service'
import {
  defaultHouseholdProfileFormValues,
  householdProfileFormSchema,
  type HouseholdProfileFormValues,
} from '../schemas/household-profile-schema'

const fieldStyle = {
  display: 'grid',
  gap: '8px',
}

const inputStyle = {
  minHeight: '44px',
  width: '100%',
  padding: '10px 12px',
  borderRadius: '12px',
  border: '1px solid #b7c8d4',
  background: '#f8fbfc',
  color: '#173042',
}

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
    setSaveMessage('Hushallsprofilen ar sparad lokalt.')
  }

  return (
    <form
      aria-describedby="household-profile-description"
      onSubmit={(event) => {
        setSaveMessage('')
        void handleSubmit(onSubmit)(event)
      }}
      style={{ display: 'grid', gap: '20px' }}
    >
      <p
        id="household-profile-description"
        style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}
      >
        Profilen sparas bara pa den har enheten och fungerar som grund for
        kommande berakningar.
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
        <legend style={{ fontWeight: 600, color: '#173042', marginBottom: '4px' }}>
          Uppgifter om hushallet
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
          <label htmlFor="children">Antal barn (valfritt)</label>
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

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <input
            id="hasPets"
            type="checkbox"
            disabled={isLoading}
            style={{ minWidth: '20px', minHeight: '20px' }}
            {...register('hasPets')}
          />
          <label htmlFor="hasPets">Hushallet har husdjur</label>
        </div>
      </fieldset>

      <div style={{ display: 'grid', gap: '12px' }}>
        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          style={{
            minWidth: '44px',
            minHeight: '44px',
            padding: '12px 18px',
            borderRadius: '999px',
            border: 'none',
            background: '#173042',
            color: '#f6fbfd',
          }}
        >
          {isSubmitting ? 'Sparar...' : 'Spara hushallsprofil'}
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
