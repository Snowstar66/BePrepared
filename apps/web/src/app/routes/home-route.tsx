import { useNavigate } from 'react-router-dom'
import { PreparednessOverview } from '../../features/preparedness-status/components/preparedness-overview'

export function HomeRoute() {
  const navigate = useNavigate()

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
        aria-labelledby="app-shell-title"
        style={{
          width: '100%',
          maxWidth: '720px',
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
          BePrepared
        </p>
        <h1
          id="app-shell-title"
          style={{ marginBottom: '12px', fontSize: 'clamp(2rem, 6vw, 3rem)' }}
        >
          Hushallets beredskap i ett lugnt overblickslage
        </h1>
        <p
          style={{
            marginTop: 0,
            marginBottom: '20px',
            color: '#355263',
            lineHeight: 1.6,
          }}
        >
          Har ser du hushallets status, de viktigaste gapen och vilket nasta steg
          som gor mest nytta just nu.
        </p>
        <PreparednessOverview />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <button
            type="button"
            onClick={() => {
              void navigate('/snabbhjalp')
            }}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: 'none',
              background: '#325f7f',
              color: '#f6fbfd',
            }}
          >
            Snabb hjalp
          </button>
          <button
            type="button"
            onClick={() => {
              void navigate('/profil')
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
            Hushallsprofil
          </button>
          <button
            type="button"
            onClick={() => {
              void navigate('/forrad')
            }}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1px solid #173042',
              background: '#eef5f7',
              color: '#173042',
            }}
          >
            Se forrad
          </button>
          <button
            type="button"
            onClick={() => {
              void navigate('/forrad/ny')
            }}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1px solid #173042',
              background: '#f6fbfd',
              color: '#173042',
            }}
          >
            Lagg till vara
          </button>
          <button
            type="button"
            onClick={() => {
              void navigate('/gap-analys')
            }}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1px solid #173042',
              background: '#f6fbfd',
              color: '#173042',
            }}
          >
            Se gap-analys
          </button>
          <button
            type="button"
            onClick={() => {
              void navigate('/underhall')
            }}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1px solid #173042',
              background: '#fff4e8',
              color: '#173042',
            }}
          >
            Underhall och rotation
          </button>
          <button
            type="button"
            onClick={() => {
              void navigate('/installningar/data')
            }}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1px solid #173042',
              background: '#eef5f7',
              color: '#173042',
            }}
          >
            Datahantering
          </button>
        </div>
      </section>
    </main>
  )
}
