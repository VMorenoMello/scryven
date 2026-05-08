'use client'

import Image from 'next/image'
import { Icon } from './Icon'

type NavId = 'inbox' | 'matrix' | 'today' | 'week'
type IconName = React.ComponentProps<typeof Icon>['name']

const NAV_ITEMS: { id: NavId; label: string; icon: IconName; count: number | null }[] = [
  { id: 'inbox',  label: 'Inbox',          icon: 'inbox',    count: null },
  { id: 'matrix', label: 'Matriz',         icon: 'grid',     count: null },
  { id: 'today',  label: 'Hoje',           icon: 'target',   count: null },
  { id: 'week',   label: 'Esta semana',    icon: 'calendar', count: null },
]

interface SidebarProps {
  active?: NavId
  streak?: number
  userName?: string
  onNav?: (id: NavId) => void
}

export function Sidebar({ active = 'matrix', streak = 0, userName = 'Você', onNav }: SidebarProps) {
  const initial = userName.charAt(0).toUpperCase()

  return (
    <aside style={{
      width: 240, height: '100%',
      background: 'var(--surface-2)',
      borderRight: '1px solid var(--border-subtle)',
      padding: '20px 14px',
      display: 'flex', flexDirection: 'column', gap: 4,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ padding: '4px 6px 18px' }}>
        <Image src="/logo-wordmark.svg" alt="Scryven" width={120} height={30} priority />
      </div>

      {NAV_ITEMS.map(it => {
        const isActive = active === it.id
        return (
          <button
            key={it.id}
            onClick={() => onNav?.(it.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px',
              background: isActive ? 'var(--surface)' : 'transparent',
              border: '1px solid',
              borderColor: isActive ? 'var(--border-subtle)' : 'transparent',
              borderRadius: 8,
              color: isActive ? 'var(--fg)' : 'var(--fg-2)',
              fontSize: 13, fontWeight: isActive ? 500 : 400,
              cursor: 'pointer', textAlign: 'left',
              transition: 'background 120ms',
            }}
          >
            <Icon name={it.icon} size={16} color={isActive ? 'var(--green)' : 'var(--fg-muted)'} />
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.count !== null && (
              <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{it.count}</span>
            )}
          </button>
        )
      })}

      <div style={{ flex: 1 }} />

      {streak > 0 && (
        <div style={{
          padding: 12, borderRadius: 8,
          background: 'var(--green-fill)',
          border: '1px solid var(--green)',
          display: 'flex', alignItems: 'center', gap: 10,
          color: 'var(--green-text)',
        }}>
          <Icon name="flame" size={18} color="currentColor" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, lineHeight: 1 }}>{streak}</div>
            <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>
              Dias seguidos
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 6px', marginTop: 8 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 999,
          background: 'var(--q2-fill)', color: 'var(--q2-text)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 500, border: '1px solid var(--q2-border)',
        }}>{initial}</div>
        <div style={{ flex: 1, fontSize: 12, color: 'var(--fg-2)' }}>{userName}</div>
        <Icon name="settings" size={14} color="var(--fg-muted)" />
      </div>
    </aside>
  )
}
