'use client'

import { useOptimistic, useTransition } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  type DragEndEvent,
} from '@dnd-kit/core'
import { useState } from 'react'
import { QUAD_META } from '@/components/ui/QuadrantChip'
import { moveTask, toggleTask } from '@/app/actions/tasks'
import { CaptureBar } from '@/components/ui/CaptureBar'
import { createTask } from '@/app/actions/tasks'
import type { QuadrantKey } from '@/components/ui/QuadrantChip'

interface DBTask { id: string; title: string; quadrant: number | null; status: string }

const Q_NUM: Record<QuadrantKey, number> = { q1: 1, q2: 2, q3: 3, q4: 4, g: 1 }
const NUM_Q: Record<number, QuadrantKey> = { 1: 'q1', 2: 'q2', 3: 'q3', 4: 'q4' }

const CELLS: { q: QuadrantKey; title: string; subtitle: string }[] = [
  { q: 'q1', title: 'Q1 · Fazer agora',  subtitle: 'Urgente e importante' },
  { q: 'q2', title: 'Q2 · Agendar',      subtitle: 'Importante, não urgente' },
  { q: 'q3', title: 'Q3 · Delegar',      subtitle: 'Urgente, não importante' },
  { q: 'q4', title: 'Q4 · Eliminar',     subtitle: 'Nenhum dos dois' },
]

function DraggableTask({ task, onToggle }: { task: DBTask; onToggle: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.id })
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 8px', borderRadius: 6,
        background: isDragging ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)',
        fontSize: 13, cursor: 'grab',
        opacity: isDragging ? 0.4 : 1,
        transition: 'opacity 120ms',
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(task.id) }}
        style={{
          width: 13, height: 13, borderRadius: 3,
          border: '1.5px solid currentColor',
          background: 'transparent',
          padding: 0, cursor: 'pointer', flexShrink: 0,
        }}
      />
      <span style={{ flex: 1 }}>{task.title}</span>
    </div>
  )
}

function DroppableQuadrant({
  q, title, subtitle, tasks, onToggle,
}: { q: QuadrantKey; title: string; subtitle: string; tasks: DBTask[]; onToggle: (id: string) => void }) {
  const meta = QUAD_META[q]
  const { setNodeRef, isOver } = useDroppable({ id: q })

  return (
    <div
      ref={setNodeRef}
      style={{
        background: meta.fill,
        color: meta.text,
        border: `1px solid ${isOver ? meta.border : meta.border + '88'}`,
        borderRadius: 12,
        padding: 14,
        minHeight: 220,
        display: 'flex', flexDirection: 'column', gap: 10,
        outline: isOver ? `2px solid ${meta.border}` : 'none',
        outlineOffset: -2,
        transition: 'outline 120ms, border-color 120ms',
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        paddingBottom: 6, borderBottom: `1px solid ${meta.border}33`,
      }}>
        <div>
          <div style={{ fontWeight: 500, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</div>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>{tasks.length}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        {tasks.length === 0 ? (
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, opacity: 0.45,
            border: `1px dashed ${meta.border}66`, borderRadius: 8,
            padding: 16, minHeight: 120, textAlign: 'center',
          }}>
            {isOver ? 'Solte aqui' : 'Arraste uma tarefa aqui'}
          </div>
        ) : (
          tasks.map(t => <DraggableTask key={t.id} task={t} onToggle={onToggle} />)
        )}
      </div>
    </div>
  )
}

export function MatrixClient({ tasks: initial }: { tasks: DBTask[] }) {
  const [, startTransition] = useTransition()
  const [tasks, setTasks] = useOptimistic(initial)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return

    const taskId = active.id as string
    const targetQ = over.id as QuadrantKey
    const newQuadrant = Q_NUM[targetQ]

    startTransition(async () => {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, quadrant: newQuadrant } : t))
      await moveTask(taskId, newQuadrant)
    })
  }

  function handleToggle(id: string) {
    startTransition(async () => {
      setTasks(prev => prev.filter(t => t.id !== id))
      await toggleTask(id, true)
    })
  }

  function handleAdd(title: string) {
    startTransition(async () => {
      await createTask(title)
    })
  }

  const activeTask = tasks.find(t => t.id === activeId)

  return (
    <>
      <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
        <DndContext
          sensors={sensors}
          onDragStart={({ active }) => setActiveId(active.id as string)}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {CELLS.map(c => (
              <DroppableQuadrant
                key={c.q}
                q={c.q}
                title={c.title}
                subtitle={c.subtitle}
                tasks={tasks.filter(t => t.quadrant === Q_NUM[c.q])}
                onToggle={handleToggle}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div style={{
                padding: '8px 12px', borderRadius: 8, background: 'var(--surface)',
                border: '1px solid var(--border-strong)', fontSize: 13,
                color: 'var(--fg)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                cursor: 'grabbing',
              }}>
                {activeTask.title}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      <CaptureBar onAdd={handleAdd} />
    </>
  )
}
