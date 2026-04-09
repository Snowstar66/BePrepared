import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InventoryService } from '../services/inventory-service'
import type { InventoryItemRecord } from '../schemas/inventory-item-schema'
import { groupInventoryItems } from '../utils/group-inventory-items'
import { InventoryCategoryGroup } from './inventory-category-group'

export function InventoryOverview() {
  const [inventoryService] = useState(() => new InventoryService())
  const [items, setItems] = useState<InventoryItemRecord[]>([])
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

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Laddar förrådet...</p>
  }

  if (items.length === 0) {
    return (
      <section
        aria-labelledby="inventory-empty-title"
        style={{
          display: 'grid',
          gap: '12px',
          padding: '16px',
          borderRadius: '16px',
          background: '#eef5f7',
        }}
      >
        <h2 id="inventory-empty-title" style={{ margin: 0, color: '#173042' }}>
          Ditt förråd är fortfarande tomt
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Börja med några enkla varor inom vatten, mat eller övrigt. Då blir det
          lättare att se vad hushållet redan har hemma.
        </p>
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
            background: '#173042',
            color: '#f6fbfd',
            textDecoration: 'none',
          }}
        >
          Lägg till din första vara
        </Link>
      </section>
    )
  }

  const groups = groupInventoryItems(items)

  return (
    <section style={{ display: 'grid', gap: '16px' }}>
      <section
        aria-labelledby="inventory-summary-title"
        style={{
          display: 'grid',
          gap: '8px',
          padding: '16px',
          borderRadius: '16px',
          background: '#f7fbfc',
          border: '1px solid #d7e5eb',
        }}
      >
        <h2 id="inventory-summary-title" style={{ margin: 0, color: '#173042' }}>
          Lageröversikt
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Förrådet är grupperat så att du snabbt ser vad som finns inom vatten,
          mat och övrigt, utan att behöva läsa en lång lista.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
              border: '1px solid #173042',
              color: '#173042',
              textDecoration: 'none',
            }}
          >
            Se gap-analys
          </Link>
          <Link
            to="/underhall"
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
            Underhåll och rotation
          </Link>
        </div>
      </section>

      {groups.map((group) => (
        <InventoryCategoryGroup key={group.category} group={group} />
      ))}
    </section>
  )
}
