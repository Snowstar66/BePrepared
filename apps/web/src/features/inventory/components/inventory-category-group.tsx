import { Link } from 'react-router-dom'
import type { InventoryCategoryGroupData } from '../utils/group-inventory-items'

interface InventoryCategoryGroupProps {
  group: InventoryCategoryGroupData
}

export function InventoryCategoryGroup({
  group,
}: InventoryCategoryGroupProps) {
  const hasItems = group.items.length > 0

  return (
    <details
      open
      style={{
        borderRadius: '16px',
        background: '#f7fbfc',
        border: '1px solid #d7e5eb',
        overflow: 'hidden',
      }}
    >
      <summary
        style={{
          cursor: 'pointer',
          listStyle: 'none',
          padding: '16px',
          display: 'grid',
          gap: '6px',
        }}
      >
        <span style={{ fontWeight: 700, color: '#173042' }}>{group.label}</span>
        <span style={{ color: '#355263' }}>
          {group.summary.itemCount} artikel
          {group.summary.itemCount === 1 ? '' : 'r'}
          {group.summary.quantityLabel
            ? ` • Totalt ${group.summary.quantityLabel}`
            : ''}
        </span>
        {!group.summary.quantityLabel && hasItems ? (
          <span style={{ color: '#4b6575' }}>
            Blandade enheter, visar antal artiklar i stallet for falsk precision.
          </span>
        ) : null}
      </summary>

      <div style={{ padding: '0 16px 16px', display: 'grid', gap: '12px' }}>
        {hasItems ? (
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'grid',
              gap: '10px',
            }}
          >
            {group.items.map((item) => (
              <li
                key={item.id}
                style={{
                  display: 'grid',
                  gap: '4px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: '#eef5f7',
                }}
              >
                <span style={{ fontWeight: 600, color: '#173042' }}>
                  {item.name}
                </span>
                <span style={{ color: '#355263' }}>
                  {item.quantity} {item.unit}
                </span>
                {item.bestBefore ? (
                  <span style={{ color: '#4b6575' }}>
                    Bast fore: {item.bestBefore}
                  </span>
                ) : null}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link
                    to={`/forrad/${item.id}/redigera`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '44px',
                      minHeight: '44px',
                      padding: '10px 14px',
                      borderRadius: '999px',
                      border: '1px solid #173042',
                      background: '#f6fbfd',
                      color: '#173042',
                      textDecoration: 'none',
                    }}
                  >
                    Redigera
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div
            style={{
              display: 'grid',
              gap: '8px',
              padding: '12px',
              borderRadius: '12px',
              background: '#eef5f7',
            }}
          >
            <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
              Inga varor ligger i {group.label.toLowerCase()} an. Det ar helt okej
              att fylla pa en kategori i taget.
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
              Lagg till vara i {group.label.toLowerCase()}
            </Link>
          </div>
        )}
      </div>
    </details>
  )
}
