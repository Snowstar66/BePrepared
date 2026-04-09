import { Link } from 'react-router-dom'
import { primaryButtonStyle, warmCardStyle } from '../../../shared/ui/styles'

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
    <section aria-labelledby="next-step-prompt-title" style={warmCardStyle}>
      <h2 id="next-step-prompt-title" style={{ margin: 0, color: '#173042' }}>
        Rekommenderat nästa steg
      </h2>
      <h3 style={{ margin: 0, color: '#173042', fontSize: '1.2rem' }}>{title}</h3>
      <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>{body}</p>
      <Link to={href} style={primaryButtonStyle}>
        {label}
      </Link>
    </section>
  )
}
