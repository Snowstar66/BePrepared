import type { CSSProperties } from 'react'

export const pageMainStyle: CSSProperties = {
  minHeight: '100vh',
  padding: '24px',
  display: 'grid',
  placeItems: 'center',
}

export const pagePanelStyle: CSSProperties = {
  width: '100%',
  maxWidth: '720px',
  padding: '24px',
  borderRadius: '24px',
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(242,247,249,0.98))',
  boxShadow: '0 24px 60px rgba(23,48,66,0.12)',
  display: 'grid',
  gap: '24px',
}

export const pageHeaderStyle: CSSProperties = {
  display: 'grid',
  gap: '12px',
}

export const pageEyebrowStyle: CSSProperties = {
  margin: 0,
  color: '#4b6575',
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

export const pageTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 'clamp(2rem, 6vw, 3rem)',
  color: '#173042',
}

export const pageIntroStyle: CSSProperties = {
  margin: 0,
  color: '#355263',
  lineHeight: 1.6,
}

export const contentStackStyle: CSSProperties = {
  display: 'grid',
  gap: '20px',
}

export const fieldStyle: CSSProperties = {
  display: 'grid',
  gap: '8px',
}

export const inputStyle: CSSProperties = {
  minHeight: '48px',
  width: '100%',
  padding: '12px 14px',
  borderRadius: '14px',
  border: '1px solid #b7c8d4',
  background: '#f8fbfc',
  color: '#173042',
}

export const surfaceCardStyle: CSSProperties = {
  display: 'grid',
  gap: '12px',
  padding: '20px',
  borderRadius: '20px',
  background: '#f7fbfc',
  border: '1px solid #d7e5eb',
}

export const mutedCardStyle: CSSProperties = {
  display: 'grid',
  gap: '12px',
  padding: '20px',
  borderRadius: '20px',
  background: '#eef5f7',
  border: '1px solid #d7e5eb',
}

export const warmCardStyle: CSSProperties = {
  display: 'grid',
  gap: '12px',
  padding: '20px',
  borderRadius: '20px',
  background: '#fff4e8',
  border: '1px solid #f1d8bb',
}

export const actionStackStyle: CSSProperties = {
  display: 'grid',
  gap: '12px',
}

export const actionGridStyle: CSSProperties = {
  display: 'grid',
  gap: '12px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
}

const buttonBaseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '48px',
  padding: '12px 18px',
  borderRadius: '16px',
  textDecoration: 'none',
  fontWeight: 600,
}

export const primaryButtonStyle: CSSProperties = {
  ...buttonBaseStyle,
  border: 'none',
  background: '#173042',
  color: '#f6fbfd',
  boxShadow: '0 12px 24px rgba(23,48,66,0.16)',
}

export const accentButtonStyle: CSSProperties = {
  ...buttonBaseStyle,
  border: 'none',
  background: '#325f7f',
  color: '#f6fbfd',
  boxShadow: '0 12px 24px rgba(50,95,127,0.16)',
}

export const secondaryButtonStyle: CSSProperties = {
  ...buttonBaseStyle,
  border: '1px solid #173042',
  background: '#f6fbfd',
  color: '#173042',
}

export function getDangerButtonStyle(isEnabled: boolean): CSSProperties {
  return {
    ...buttonBaseStyle,
    border: '1px solid #8a2d1f',
    background: isEnabled ? '#8a2d1f' : '#f9e6e2',
    color: isEnabled ? '#fff8f6' : '#8a2d1f',
  }
}

export function getSelectableCardStyle(isSelected: boolean): CSSProperties {
  return {
    display: 'grid',
    gap: '6px',
    padding: '16px',
    borderRadius: '18px',
    border: isSelected ? '2px solid #173042' : '1px solid #c7d7e1',
    background: isSelected ? '#eef5f7' : '#ffffff',
    boxShadow: isSelected ? '0 10px 24px rgba(23,48,66,0.08)' : 'none',
    cursor: 'pointer',
  }
}
