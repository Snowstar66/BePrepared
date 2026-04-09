import { useEffect, useState } from 'react'
import { PreparednessHorizonService } from '../services/preparedness-horizon-service'
import {
  preparednessHorizonFormSchema,
  preparednessHorizonOptions,
  type PreparednessHorizonRecord,
} from '../schemas/preparedness-horizon-schema'

interface PreparednessHorizonSelectorProps {
  initialRecord: PreparednessHorizonRecord | null
  onSaved: (record: PreparednessHorizonRecord) => void
}

export function PreparednessHorizonSelector({
  initialRecord,
  onSaved,
}: PreparednessHorizonSelectorProps) {
  const [selectedHorizon, setSelectedHorizon] = useState(initialRecord?.horizon ?? '')
  const [errorMessage, setErrorMessage] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preparednessHorizonService] = useState(
    () => new PreparednessHorizonService(),
  )

  useEffect(() => {
    setSelectedHorizon(initialRecord?.horizon ?? '')
  }, [initialRecord])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaveMessage('')

    const parsedValues = preparednessHorizonFormSchema.safeParse({
      horizon: selectedHorizon,
    })

    if (!parsedValues.success) {
      setErrorMessage(parsedValues.error.issues[0]?.message ?? 'Valj en period.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const savedRecord = await preparednessHorizonService.save(parsedValues.data)
      setSaveMessage(`Planeringsperioden ${savedRecord.label.toLowerCase()} ar sparad lokalt.`)
      onSaved(savedRecord)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
      <fieldset
        style={{
          margin: 0,
          padding: 0,
          border: 'none',
          display: 'grid',
          gap: '12px',
        }}
      >
        <legend style={{ fontWeight: 600, color: '#173042', marginBottom: '4px' }}>
          Valj beredskapshorisont
        </legend>

        {preparednessHorizonOptions.map((option) => (
          <label
            key={option.value}
            htmlFor={option.value}
            style={{
              display: 'grid',
              gap: '4px',
              padding: '14px 16px',
              borderRadius: '16px',
              border:
                selectedHorizon === option.value
                  ? '2px solid #173042'
                  : '1px solid #b7c8d4',
              background: selectedHorizon === option.value ? '#eef5f7' : '#f8fbfc',
              cursor: 'pointer',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                id={option.value}
                name="preparedness-horizon"
                type="radio"
                value={option.value}
                checked={selectedHorizon === option.value}
                onChange={(event) => {
                  setSelectedHorizon(event.target.value)
                  setErrorMessage('')
                }}
                style={{ minWidth: '20px', minHeight: '20px' }}
              />
              <span style={{ fontWeight: 600, color: '#173042' }}>{option.label}</span>
            </span>
            <span style={{ color: '#355263', lineHeight: 1.5 }}>
              {option.description}
            </span>
          </label>
        ))}
      </fieldset>

      {errorMessage ? (
        <p role="alert" style={{ margin: 0, color: '#9b1c1c' }}>
          {errorMessage}
        </p>
      ) : null}

      <div style={{ display: 'grid', gap: '12px' }}>
        <button
          type="submit"
          disabled={isSubmitting}
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
          {isSubmitting ? 'Sparar...' : 'Spara planeringsperiod'}
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
