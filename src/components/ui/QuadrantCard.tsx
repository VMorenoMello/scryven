'use client'

import { useState } from 'react'
import { QUAD_META } from './QuadrantChip'
import type { QuadrantKey } from './QuadrantChip'
import type { Task } from './TaskItem'

interface QuadrantCardProps {
  q: QuadrantKey
  title: string
  subtitle: string
  tasks?: Task[]
  onDrop?: (taskId: string, q: QuadrantKey) => void
  onToggle?: (taskId: string) => void
}

export function QuadrantCard({ q, title, subtitle, tasks = [], onDrop, onToggle }: QuadrantCardProps) {
  const meta = QUAD_META[q]
  const [over, setOver] = useState(false)

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); if (!over) setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('text/plain')
        if (id && onDrop) onDrop(id, q)
        setOver(false)
      }}
      style={{
        background: meta.fill,
        color: meta.text,
        border: `1px solid ${meta.border}`,
        borderRadius: 12,
        padding: 14,
        minHeight: 220,
        display: 'flex', flexDirection: 'column',
        gap: 10,
        outline: over ? `2px solid ${meta.border}` : 'none',
        outlineOffset: -2,
        transition: 'outline 120ms',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        paddingBottom: 6,
        borderBottom: `1px solid ${meta.border}33`,
      }}>
        <div>
          <div style={{ fontWeight: 500, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {title}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>{tasks.length}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        {tasks.length === 0 ? (
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: 'currentColor', opacity: 0.45,
            border: `1px dashed ${meta.border}66`, borderRadius: 8,
            padding: 16, minHeight: 120, textAlign: 'center',
          }}>
            Arraste uma tarefa aqui
          </div>
        ) : (
          tasks.map(t => (
            <div
              key={t.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 8px', borderRadius: 6,
                background: 'rgba(255,255,255,0.4)',
                fontSize: 13, cursor: 'grab',
              }}
            >
              <button
                onClick={() => onToggle?.(t.id)}
                style={{
                  width: 13, height: 13, borderRadius: 3,
                  border: '1.5px solid currentColor',
                  background: t.done ? meta.border : 'transparent',
                  padding: 0, cursor: 'pointer', flexShrink: 0,
                }}
              />
              <span style={{
                color: 'currentColor',
                opacity: t.done ? 0.5 : 1,
                textDecoration: t.done ? 'line-through' : 'none',
              }}>{t.title}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
