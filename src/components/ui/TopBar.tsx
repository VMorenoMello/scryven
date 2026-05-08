import type { ReactNode } from 'react'

interface TopBarProps {
  title: string
  subtitle?: string
  right?: ReactNode
}

export function TopBar({ title, subtitle, right }: TopBarProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 32px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--bg)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div>
        <h1 style={{
          margin: 0,
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontWeight: 400, fontSize: 32, lineHeight: 1.1,
          color: 'var(--fg)', letterSpacing: '-0.005em',
        }}>{title}</h1>
        {subtitle && (
          <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 4 }}>{subtitle}</div>
        )}
      </div>
      {right}
    </div>
  )
}
