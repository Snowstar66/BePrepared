interface PreparednessDeltaFeedbackProps {
  title: string
  body: string
}

export function PreparednessDeltaFeedback({
  title,
  body,
}: PreparednessDeltaFeedbackProps) {
  return (
    <section
      aria-labelledby="preparedness-delta-feedback-title"
      style={{
        display: 'grid',
        gap: '8px',
        padding: '16px',
        borderRadius: '16px',
        background: '#e7f6ed',
      }}
    >
      <h2
        id="preparedness-delta-feedback-title"
        style={{ margin: 0, color: '#173042' }}
      >
        Senaste förändringen
      </h2>
      <h3 style={{ margin: 0, color: '#173042', fontSize: '1.05rem' }}>{title}</h3>
      <p style={{ margin: 0, color: '#355263', lineHeight: 1.6 }}>{body}</p>
    </section>
  )
}
