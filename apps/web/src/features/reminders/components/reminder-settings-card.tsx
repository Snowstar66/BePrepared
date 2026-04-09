import { useEffect, useState } from 'react'
import { ReminderSettingsService } from '../services/reminder-settings-service'
import {
  reminderCadenceOptions,
  type ReminderSettingsFormValues,
} from '../schemas/reminder-settings-schema'

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function ReminderSettingsCard() {
  const [reminderSettingsService] = useState(() => new ReminderSettingsService())
  const [values, setValues] = useState<ReminderSettingsFormValues>({ cadence: 'monthly' })
  const [statusMessage, setStatusMessage] = useState('')
  const [supportMessage, setSupportMessage] = useState('')
  const [nextReminderAt, setNextReminderAt] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void Promise.all([
      reminderSettingsService.loadFormValues(),
      reminderSettingsService.loadSettings(),
      reminderSettingsService.getNotificationSupportSummary(),
    ]).then(([loadedValues, settings, support]) => {
      if (!isMounted) {
        return
      }

      setValues(loadedValues)
      setSupportMessage(support.message)
      setNextReminderAt(settings?.nextReminderAt ?? null)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [reminderSettingsService])

  async function handleSave() {
    const savedSettings = await reminderSettingsService.save(values)
    const support = await reminderSettingsService.getNotificationSupportSummary()

    setNextReminderAt(savedSettings.nextReminderAt)
    setSupportMessage(support.message)
    setStatusMessage('Paminnelsen ar sparad och visas nu i din underhallsplan.')
  }

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Laddar paminnelser...</p>
  }

  return (
    <section
      aria-labelledby="reminder-settings-title"
      style={{
        display: 'grid',
        gap: '12px',
        padding: '16px',
        borderRadius: '16px',
        background: '#f7fbfc',
        border: '1px solid #d7e5eb',
      }}
    >
      <h2 id="reminder-settings-title" style={{ margin: 0, color: '#173042' }}>
        Aterkommande paminnelser
      </h2>
      <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
        Valj hur ofta du vill bli paminnd om att se over forradet. Vi visar alltid
        nasta planerade tillfalle tydligt inne i appen.
      </p>
      <label style={{ display: 'grid', gap: '6px', color: '#173042' }}>
        Paminnelserytm
        <select
          value={values.cadence}
          onChange={(event) => {
            setValues({ cadence: event.target.value })
          }}
          style={{
            minHeight: '44px',
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid #9db3bf',
            background: '#fff',
          }}
        >
          {reminderCadenceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {nextReminderAt ? (
        <p style={{ margin: 0, color: '#173042', fontWeight: 600 }}>
          Nasta planerade genomgang: {formatDateTime(nextReminderAt)}
        </p>
      ) : null}
      <p style={{ margin: 0, color: '#4b6575', lineHeight: 1.6 }}>{supportMessage}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <button
          type="button"
          onClick={() => {
            void handleSave()
          }}
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
          Spara paminnelse
        </button>
      </div>
      {statusMessage ? (
        <p role="status" style={{ margin: 0, color: '#1d5b3a' }}>
          {statusMessage}
        </p>
      ) : null}
    </section>
  )
}
