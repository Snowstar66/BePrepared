import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InventoryService } from '../../inventory/services/inventory-service'
import { getRotationCandidates } from '../utils/get-rotation-candidates'

export function RotationReviewList() {
  const [inventoryService] = useState(() => new InventoryService())
  const [items, setItems] = useState<Awaited<ReturnType<InventoryService['listItems']>>>([])
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void inventoryService.listItems().then((loadedItems) => {
      if (!isMounted) {
        return
      }

      setItems(loadedItems)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [inventoryService])

  async function refreshItems() {
    const loadedItems = await inventoryService.listItems()

    setItems(loadedItems)
    setIsLoading(false)
  }

  async function handleRotate(itemId: string) {
    await inventoryService.markItemAsRotated(itemId)
    setFeedbackMessage('Varan ar markerad som kontrollerad och flyttas ur den akuta rotationslistan.')
    await refreshItems()
  }

  async function handleConsume(itemId: string) {
    await inventoryService.consumeItem(itemId)
    setFeedbackMessage('Lagret har uppdaterats efter att varan markerades som forbrukad.')
    await refreshItems()
  }

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Laddar rotationslista...</p>
  }

  const rotationCandidates = getRotationCandidates(items)

  if (rotationCandidates.length === 0) {
    return (
      <section
        aria-labelledby="rotation-empty-title"
        style={{
          display: 'grid',
          gap: '12px',
          padding: '16px',
          borderRadius: '16px',
          background: '#eef5f7',
        }}
      >
        <h2 id="rotation-empty-title" style={{ margin: 0, color: '#173042' }}>
          Inga varor behover snabb kontroll just nu
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Artiklar med bast fore-datum inom 30 dagar visas har. Om du saknar datum pa
          vissa varor fortsatter appen att hantera dem utan att markera felaktiga problem.
        </p>
        <Link
          to="/forrad"
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
          Se forradet
        </Link>
      </section>
    )
  }

  return (
    <section style={{ display: 'grid', gap: '16px' }}>
      <section
        aria-labelledby="rotation-title"
        style={{
          display: 'grid',
          gap: '8px',
          padding: '16px',
          borderRadius: '16px',
          background: '#fff4e8',
        }}
      >
        <h2 id="rotation-title" style={{ margin: 0, color: '#173042' }}>
          Varor att kontrollera eller rotera
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Listan prioriterar varor som narmar sig bast fore-datum och gor det enkelt att
          markera dem som kontrollerade eller forbrukade.
        </p>
        {feedbackMessage ? (
          <p role="status" style={{ margin: 0, color: '#1d5b3a' }}>
            {feedbackMessage}
          </p>
        ) : null}
      </section>

      {rotationCandidates.map((candidate) => (
        <section
          key={candidate.item.id}
          aria-labelledby={`rotation-item-${candidate.item.id}`}
          style={{
            display: 'grid',
            gap: '10px',
            padding: '16px',
            borderRadius: '16px',
            background: '#f7fbfc',
            border: '1px solid #d7e5eb',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'space-between',
            }}
          >
            <h3
              id={`rotation-item-${candidate.item.id}`}
              style={{ margin: 0, color: '#173042' }}
            >
              {candidate.item.name}
            </h3>
            <span style={{ color: '#4b6575', fontWeight: 600 }}>
              {candidate.statusLabel}
            </span>
          </div>
          <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
            Bast fore {candidate.item.bestBefore} och registrerat antal {candidate.item.quantity}{' '}
            {candidate.item.unit}.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button
              type="button"
              onClick={() => {
                void handleRotate(candidate.item.id)
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
              Markera som roterad
            </button>
            <button
              type="button"
              onClick={() => {
                void handleConsume(candidate.item.id)
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
              Markera som forbrukad
            </button>
            <Link
              to={`/forrad/${candidate.item.id}/redigera`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '44px',
                minHeight: '44px',
                padding: '12px 18px',
                borderRadius: '999px',
                color: '#173042',
                textDecoration: 'none',
              }}
            >
              Redigera vara
            </Link>
          </div>
        </section>
      ))}
    </section>
  )
}
