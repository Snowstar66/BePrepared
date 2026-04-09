import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PreparednessNeedsService } from '../services/preparedness-needs-service'
import type { BaselinePreparednessNeeds } from '../calculators/baseline-needs-calculator'

const cardStyle = {
  display: 'grid',
  gap: '10px',
  padding: '16px',
  borderRadius: '16px',
  background: '#eef5f7',
}

export function PreparednessNeedsOverview() {
  const [preparednessNeedsService] = useState(
    () => new PreparednessNeedsService(),
  )
  const [needs, setNeeds] = useState<BaselinePreparednessNeeds | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void preparednessNeedsService.loadNeeds().then((result) => {
      if (!isMounted) {
        return
      }

      setNeeds(result)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [preparednessNeedsService])

  if (isLoading) {
    return <p style={{ margin: 0, color: '#355263' }}>Raknar hushallets grundbehov...</p>
  }

  if (needs === null) {
    return null
  }

  return (
    <section style={{ display: 'grid', gap: '16px' }}>
      <section
        aria-labelledby="needs-summary-title"
        style={{
          display: 'grid',
          gap: '8px',
          padding: '16px',
          borderRadius: '16px',
          background: '#f7fbfc',
          border: '1px solid #d7e5eb',
        }}
      >
        <h2 id="needs-summary-title" style={{ margin: 0, color: '#173042' }}>
          Planeringsniva for {needs.horizonLabel.toLowerCase()}
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          Behovsbilden bygger pa hushallsprofilen och den valda planeringsperioden.
        </p>
      </section>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        <section aria-labelledby="water-needs-title" style={cardStyle}>
          <h2 id="water-needs-title" style={{ margin: 0, color: '#173042' }}>
            Vatten
          </h2>
          <p style={{ margin: 0, fontSize: '1.8rem', color: '#173042', fontWeight: 700 }}>
            {needs.totalWaterLiters} liter
          </p>
          <p style={{ margin: 0, color: '#355263' }}>
            {needs.dailyWaterLiters} liter per dygn for hela hushallet
          </p>
          <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
            Utgangspunkten ar 3 liter per person och dygn i grundberedskapen.
          </p>
        </section>

        <section aria-labelledby="food-needs-title" style={cardStyle}>
          <h2 id="food-needs-title" style={{ margin: 0, color: '#173042' }}>
            Mat
          </h2>
          <p style={{ margin: 0, fontSize: '1.8rem', color: '#173042', fontWeight: 700 }}>
            {needs.totalMeals} maltider
          </p>
          <p style={{ margin: 0, color: '#355263' }}>
            {needs.dailyMeals} maltider per dygn for hela hushallet
          </p>
          <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
            Maltalet ar forenklat for att ge en tydlig miniminiva att planera mot.
          </p>
        </section>
      </div>

      <section aria-labelledby="food-category-title" style={cardStyle}>
        <h2 id="food-category-title" style={{ margin: 0, color: '#173042' }}>
          Hur matmalet kan planeras
        </h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {needs.foodCategories.map((category) => (
            <article
              key={category.title}
              style={{
                display: 'grid',
                gap: '6px',
                paddingBottom: '12px',
                borderBottom: '1px solid #d7e5eb',
              }}
            >
              <h3 style={{ margin: 0, color: '#173042', fontSize: '1rem' }}>
                {category.title}
              </h3>
              <p style={{ margin: 0, color: '#173042', fontWeight: 600 }}>
                {category.value}
              </p>
              <p style={{ margin: 0, color: '#355263', lineHeight: 1.5 }}>
                {category.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="method-notes-title" style={cardStyle}>
        <h2 id="method-notes-title" style={{ margin: 0, color: '#173042' }}>
          Sa har behovet raknats
        </h2>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#355263', lineHeight: 1.6 }}>
          {needs.methodNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
          {needs.petsNote ? <li>{needs.petsNote}</li> : null}
        </ul>
      </section>

      <section
        aria-labelledby="planning-disclaimer-title"
        style={{
          display: 'grid',
          gap: '8px',
          padding: '16px',
          borderRadius: '16px',
          background: '#fff4e8',
        }}
      >
        <h2 id="planning-disclaimer-title" style={{ margin: 0, color: '#173042' }}>
          Viktigt att veta
        </h2>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          {needs.disclaimer}
        </p>
        <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>
          {needs.nextStep}
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
          Lagg till vara
        </Link>
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
      </section>
    </section>
  )
}
