import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  actionGridStyle,
  mutedCardStyle,
  pageIntroStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
  surfaceCardStyle,
} from '../../../shared/ui/styles'
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
      <section aria-labelledby="inventory-empty-title" style={mutedCardStyle}>
        <h2 id="inventory-empty-title" style={{ margin: 0, color: '#173042' }}>
          Ditt förråd är fortfarande tomt
        </h2>
        <p style={pageIntroStyle}>
          Börja med några enkla varor inom vatten, mat eller övrigt. Då blir det
          lättare att se vad hushållet redan har hemma.
        </p>
        <Link to="/forrad/ny" style={primaryButtonStyle}>
          Lägg till din första vara
        </Link>
      </section>
    )
  }

  const groups = groupInventoryItems(items)

  return (
    <section style={{ display: 'grid', gap: '16px' }}>
      <section aria-labelledby="inventory-summary-title" style={surfaceCardStyle}>
        <h2 id="inventory-summary-title" style={{ margin: 0, color: '#173042' }}>
          Lageröversikt
        </h2>
        <p style={pageIntroStyle}>
          Förrådet är grupperat så att du snabbt ser vad som finns inom vatten, mat
          och övrigt, utan att behöva läsa en lång lista.
        </p>
        <div style={actionGridStyle}>
          <Link to="/gap-analys" style={secondaryButtonStyle}>
            Se gap-analys
          </Link>
          <Link to="/underhall" style={secondaryButtonStyle}>
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
