import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ShoppingOverviewEntry } from '../schemas/shopping-overview-schema'
import { ShoppingOverviewService } from '../services/shopping-overview-service'

function formatSavedAt(value: string) {
  return new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function ShoppingOverview() {
  const [shoppingOverviewService] = useState(() => new ShoppingOverviewService())
  const [entries, setEntries] = useState<ShoppingOverviewEntry[]>([])
  const [resolvedEntries, setResolvedEntries] = useState<ShoppingOverviewEntry[]>([])
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    void shoppingOverviewService.loadOverview().then((result) => {
      if (!isMounted || result === null) {
        return
      }

      setEntries(result.entries)
      setResolvedEntries(result.resolvedEntries)
      setSavedAt(result.snapshot?.updatedAt ?? null)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [shoppingOverviewService])

  async function handleSave() {
    const snapshot = await shoppingOverviewService.saveOverview(entries)

    setSavedAt(snapshot.updatedAt)
    setSaveMessage('Inköpsöversikten är sparad lokalt för fortsatt användning.')
  }

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Bygger inköpsöversikten...</p>
  }

  return (
    <section style={{ display: 'grid', gap: '16px' }}>
      <section
        aria-labelledby="shopping-overview-title"
        style={{
          display: 'grid',
          gap: '8px',
          padding: '16px',
          borderRadius: '16px',
          background: '#f7fbfc',
          border: '1px solid #d7e5eb',
        }}
      >
        <h2 id="shopping-overview-title" style={{ margin: 0, color: '#173042' }}>
          Inköpsöversikt
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Översikten bygger på hushållets aktuella luckor och prioriterar det som
          gör mest nytta just nu.
        </p>
        {savedAt ? (
          <p style={{ margin: 0, color: '#4b6575' }}>
            Senast sparad: {formatSavedAt(savedAt)}
          </p>
        ) : (
          <p style={{ margin: 0, color: '#4b6575' }}>
            Ingen sparad översikt ännu. Spara den lokalt om du vill kunna återgå
            till samma sammanställning offline.
          </p>
        )}
      </section>

      {resolvedEntries.length > 0 ? (
        <section
          aria-labelledby="resolved-shopping-title"
          style={{
            display: 'grid',
            gap: '12px',
            padding: '16px',
            borderRadius: '16px',
            background: '#e7f6ed',
          }}
        >
          <h2 id="resolved-shopping-title" style={{ margin: 0, color: '#173042' }}>
            Det som inte längre saknas
          </h2>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#355263', lineHeight: 1.6 }}>
            {resolvedEntries.map((entry) => (
              <li key={entry.key}>
                {entry.label} verkar inte längre vara en aktiv lucka i den senaste
                jämförelsen.
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {entries.length === 0 ? (
        <section
          aria-labelledby="shopping-complete-title"
          style={{
            display: 'grid',
            gap: '12px',
            padding: '16px',
            borderRadius: '16px',
            background: '#eef5f7',
          }}
        >
          <h2 id="shopping-complete-title" style={{ margin: 0, color: '#173042' }}>
            Inga inköp är prioriterade just nu
          </h2>
          <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
            De kategorier som går att jämföra exakt verkar ligga på eller över
            grundnivån. Fortsätt hålla lagret uppdaterat och använd gap-analysen
            om förutsättningarna ändras.
          </p>
          <Link
            to="/gap-analys"
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
            Se gap-analys
          </Link>
        </section>
      ) : (
        <>
          {entries.map((entry) => (
            <section
              key={entry.key}
              aria-labelledby={`${entry.key}-shopping-title`}
              style={{
                display: 'grid',
                gap: '10px',
                padding: '16px',
                borderRadius: '16px',
                background: '#eef5f7',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2
                  id={`${entry.key}-shopping-title`}
                  style={{ margin: 0, color: '#173042' }}
                >
                  {entry.label}
                </h2>
                <span style={{ color: '#4b6575', fontSize: '0.9rem', fontWeight: 600 }}>
                  {entry.priorityLabel}
                </span>
              </div>
              <p style={{ margin: 0, color: '#173042', fontWeight: 600 }}>
                {entry.summary}
              </p>
              <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
                {entry.recommendation}
              </p>
            </section>
          ))}

          <section
            aria-labelledby="shopping-actions-title"
            style={{
              display: 'grid',
              gap: '12px',
              padding: '16px',
              borderRadius: '16px',
              background: '#fff4e8',
            }}
          >
            <h2 id="shopping-actions-title" style={{ margin: 0, color: '#173042' }}>
              Nästa steg
            </h2>
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
                Spara inköpsöversikt
              </button>
              <Link
                to="/forrad/ny"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '44px',
                  minHeight: '44px',
                  padding: '12px 18px',
                  borderRadius: '999px',
                  border: '1px solid #173042',
                  color: '#173042',
                  textDecoration: 'none',
                }}
              >
                Lägg till vara
              </Link>
            </div>
            {saveMessage ? (
              <p role="status" style={{ margin: 0, color: '#1d5b3a' }}>
                {saveMessage}
              </p>
            ) : null}
          </section>
        </>
      )}
    </section>
  )
}
