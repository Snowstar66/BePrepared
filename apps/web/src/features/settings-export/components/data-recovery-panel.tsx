import { useRef, useState } from 'react'
import {
  LocalDataCorruptionError,
  LocalDataManagementService,
} from '../services/local-data-management-service'

interface DataRecoveryPanelProps {
  reason: string
  onRecovered?: () => void
}

export function DataRecoveryPanel({
  reason,
  onRecovered,
}: DataRecoveryPanelProps) {
  const [localDataManagementService] = useState(
    () => new LocalDataManagementService(),
  )
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  async function handleImport(file: File | null) {
    if (file === null) {
      return
    }

    try {
      await localDataManagementService.importFromJson(await file.text())
      setErrorMessage('')
      setStatusMessage('Backupen är importerad och appen kan starta igen.')
      onRecovered?.()
    } catch (error) {
      setStatusMessage('')
      setErrorMessage(
        error instanceof LocalDataCorruptionError
          ? error.message
          : 'Backupfilen kunde inte återställa datan.',
      )
    }
  }

  async function handleReset() {
    await localDataManagementService.clearAllData()
    setErrorMessage('')
    setStatusMessage('Skadad lokal data har rensats. Du kan nu starta om med en tom app.')
    onRecovered?.()
  }

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
        aria-labelledby="recovery-title"
        style={{
          width: '100%',
          maxWidth: '720px',
          display: 'grid',
          gap: '16px',
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
          Återställningsläge
        </p>
        <h1 id="recovery-title" style={{ margin: 0, color: '#173042' }}>
          Lokal data behöver åtgärdas innan appen kan fortsätta
        </h1>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Vi stoppade appen innan något gick fel eftersom den lokala datan inte
          gick att validera. Du kan importera en backup eller börja om på ett
          kontrollerat sätt.
        </p>
        <p style={{ margin: 0, color: '#8a2e2e', lineHeight: 1.6 }}>{reason}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <button
            type="button"
            onClick={() => {
              fileInputRef.current?.click()
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
            Importera backup
          </button>
          <button
            type="button"
            onClick={() => {
              void handleReset()
            }}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1px solid #173042',
              background: '#fff',
              color: '#173042',
            }}
          >
            Börja om med tom lokal data
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null
              void handleImport(file)
            }}
            style={{ display: 'none' }}
          />
        </div>
        {statusMessage ? (
          <p role="status" style={{ margin: 0, color: '#1d5b3a' }}>
            {statusMessage}
          </p>
        ) : null}
        {errorMessage ? (
          <p role="alert" style={{ margin: 0, color: '#8a2e2e' }}>
            {errorMessage}
          </p>
        ) : null}
      </section>
    </main>
  )
}
