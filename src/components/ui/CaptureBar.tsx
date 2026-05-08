'use client'

import { useState } from 'react'
import { Icon } from './Icon'
import { Input } from './Input'

interface CaptureBarProps {
  onAdd?: (title: string) => void
}

export function CaptureBar({ onAdd }: CaptureBarProps) {
  const [val, setVal] = useState('')

  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'center',
      padding: '14px 32px',
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--surface)',
    }}>
      <Icon name="plus" size={18} color="var(--fg-muted)" />
      <div style={{ flex: 1 }}>
        <Input
          value={val}
          onChange={setVal}
          placeholder="Capture uma tarefa — Enter para adicionar ao inbox"
          onEnter={(v) => {
            if (v.trim() && onAdd) {
              onAdd(v.trim())
              setVal('')
            }
          }}
          trailingHint="Enter"
        />
      </div>
    </div>
  )
}
