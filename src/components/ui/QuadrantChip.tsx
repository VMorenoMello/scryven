export type QuadrantKey = 'q1' | 'q2' | 'q3' | 'q4' | 'g'

export const QUAD_META: Record<QuadrantKey, {
  glyph: string
  label: string
  fill: string
  text: string
  border: string
}> = {
  q1: { glyph: 'W', label: 'Q1', fill: 'var(--q1-fill)', text: 'var(--q1-text)', border: 'var(--q1-border)' },
  q2: { glyph: 'U', label: 'Q2', fill: 'var(--q2-fill)', text: 'var(--q2-text)', border: 'var(--q2-border)' },
  q3: { glyph: 'R', label: 'Q3', fill: 'var(--q3-fill)', text: 'var(--q3-text)', border: 'var(--q3-border)' },
  q4: { glyph: 'B', label: 'Q4', fill: 'var(--q4-fill)', text: 'var(--q4-text)', border: 'var(--q4-border)' },
  g:  { glyph: 'G', label: 'Streak', fill: 'var(--green-fill)', text: 'var(--green-text)', border: 'var(--green)' },
}

interface QuadrantChipProps {
  q?: QuadrantKey
  size?: 'sm' | 'md' | 'lg'
  label?: string
  showGlyph?: boolean
}

export function QuadrantChip({ q = 'q2', size = 'md', label, showGlyph = true }: QuadrantChipProps) {
  const meta = QUAD_META[q]
  const sizes = {
    sm: { height: 18, padding: '0 7px',       font: 10, glyph: 9,  glyphBox: 12 },
    md: { height: 22, padding: '0 10px 0 8px', font: 11, glyph: 10, glyphBox: 14 },
    lg: { height: 26, padding: '0 12px 0 10px',font: 12, glyph: 11, glyphBox: 16 },
  }
  const s = sizes[size]

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: s.height, padding: s.padding,
      borderRadius: 999,
      background: meta.fill, color: meta.text,
      border: `1px solid ${meta.border}`,
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: s.font, fontWeight: 500, lineHeight: 1,
    }}>
      {showGlyph && (
        <span style={{
          fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: s.glyph,
          width: s.glyphBox, height: s.glyphBox,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 999, background: meta.fill, border: '1px solid currentColor',
        }}>{meta.glyph}</span>
      )}
      {label ?? meta.label}
    </span>
  )
}
