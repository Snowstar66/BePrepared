import { useRef, useState } from 'react'
import { LocalDataCorruptionError, LocalDataManagementService } from '../services/local-data-management-service'

function buildExportFileName() {
  const timestamp = new Date().toISOString().slice(0, 10)
  return `beprepared-export-${timestamp}.json`
}

export function DataManagementPanel() {
  const [localDataManagementService] = useState(
    () => new LocalDataManagementService(),
  )
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  async function handleExport() {
    const json = await localDataManagementService.exportToJson()
    const blob = new Blob([json], { type: 'application/json' })
    const downloadUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')

    anchor.href = downloadUrl
    anchor.download = buildExportFileName()
    anchor.click()
    URL.revokeObjectURL(downloadUrl)

    setErrorMessage('')
    setStatusMessage('Din lokala data har exporterats i ett validerat JSON-format.')
  }

  async function handleImport(file: File | null) {
    if (file === null) {
      return
    }

    try {
      await localDataManagementService.importFromJson(await file.text())
      setErrorMessage('')
      setStatusMessage('Importen ar klar och lokal data har ersatts pa ett kontrollerat satt.')
    } catch (error) {
      setStatusMessage('')
      setErrorMessage(
        error instanceof LocalDataCorruptionError
          ? error.message
          : 'Importen kunde inte genomforas.',
      )
    }
  }

  return (
    <section style={{ display: 'grid', gap: '16px' }}>
      <section
        aria-labelledby="data-management-title"
        style={{
          display: 'grid',
          gap: '8px',
          padding: '16px',
          borderRadius: '16px',
          background: '#f7fbfc',
          border: '1px solid #d7e5eb',
        }}
      >
        <h2 id="data-management-title" style={{ margin: 0, color: '#173042' }}>
          Export och import av lokal data
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Du kan spara hushallsdata, lager, paminnelser och cachade guider utan att
          skapa konto. Importen valideras innan befintlig data skrivs over.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <button
            type="button"
            onClick={() => {
              void handleExport()
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
            Exportera data
          </button>
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
              border: '1px solid #173042',
              background: '#fff',
              color: '#173042',
            }}
          >
            Importera backup
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
    </section>
  )
}
