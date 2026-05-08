'use client'

import { useState } from 'react'
import { Icon } from './Icon'
import type { SVGProps } from 'react'

type IconName = React.ComponentProps<typeof Icon>['name']

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  icon?: IconName
  onClick?: () => void
  disabled?: boolean
}

export function Button({ variant = 'primary', size = 'md', children, icon, onClick, disabled }: ButtonProps) {
  const [hovered, setHovered] = useState(false)

  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 500,
    borderRadius: 8,
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 150ms cubic-bezier(0.2,0,0.2,1), border-color 150ms cubic-bezier(0.2,0,0.2,1)',
    whiteSpace: 'nowrap',
  }

  const sizes = {
    sm: { height: 28, padding: '0 10px', fontSize: 12 },
    md: { height: 32, padding: '0 14px', fontSize: 13 },
    lg: { height: 40, padding: '0 18px', fontSize: 14 },
  }

  const variants: Record<string, React.CSSProperties> = {
    primary:   { background: 'var(--green)',   color: '#FAF9F7' },
    secondary: { background: 'var(--surface)', color: 'var(--fg)', borderColor: 'var(--border-subtle)' },
    ghost:     { background: 'transparent',    color: 'var(--fg-2)' },
    danger:    { background: 'transparent',    color: 'var(--q3-text)', borderColor: 'var(--q3-border)' },
  }

  const hover: Record<string, React.CSSProperties> = {
    primary:   { background: 'var(--green-700)' },
    secondary: { background: 'var(--surface-2)', borderColor: 'var(--border-strong)' },
    ghost:     { background: 'var(--surface-2)' },
    danger:    { background: 'var(--q3-fill)' },
  }

  const style: React.CSSProperties = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(hovered && !disabled ? hover[variant] : {}),
    ...(disabled ? { background: 'var(--surface-2)', color: 'var(--fg-disabled)', borderColor: 'transparent' } : {}),
  }

  return (
    <button
      style={style}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  )
}
