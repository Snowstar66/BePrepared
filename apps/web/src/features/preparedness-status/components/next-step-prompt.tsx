import { Link } from 'react-router-dom'

interface NextStepPromptProps {
  title: string
  body: string
  href: string
  label: string
}

export function NextStepPrompt({
  title,
  body,
  href,
  label,
}: NextStepPromptProps) {
  return (
    <section
      aria-labelledby="next-step-prompt-title"
      style={{
        display: 'grid',
        gap: '12px',
        padding: '20px',
        borderRadius: '20px',
        background: '#fff4e8',
      }}
    >
      <h2 id="next-step-prompt-title" style={{ margin: 0, color: '#173042' }}>
        Rekommenderat nästa steg
      </h2>
      <h3 style={{ margin: 0, color: '#173042', fontSize: '1.2rem' }}>{title}</h3>
      <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>{body}</p>
      <Link
        to={href}
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
        {label}
      </Link>
    </section>
  )
}
