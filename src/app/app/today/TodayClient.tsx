'use client'

import { useState, useTransition } from 'react'
import { createDailyPlan, saveDailyReflection } from '@/app/actions/plans'
import { toggleTask } from '@/app/actions/tasks'
import { QUAD_META } from '@/components/ui/QuadrantChip'

interface DBTask {
  id: string; title: string; quadrant: number | null; status: string
}
interface DailyPlan {
  id: string; task_ids: string[] | null; reflection: string | null
}

interface TodayClientProps {
  plan: DailyPlan | null
  planTasks: DBTask[]
  allTasks: DBTask[]
}

const Q_KEY = (q: number | null) =>
  q === 1 ? 'q1' : q === 2 ? 'q2' : q === 3 ? 'q3' : q === 4 ? 'q4' : null

const Q_LABEL: Record<number, string> = {
  1: 'Q1 · Fazer agora', 2: 'Q2 · Agendar',
  3: 'Q3 · Delegar',     4: 'Q4 · Eliminar',
}

// ── Tela de planejamento ──────────────────────────────────
function PlanningView({ tasks, onConfirm }: { tasks: DBTask[]; onConfirm: (ids: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([])
  const [, startTransition] = useTransition()

  // Sugestão automática: 1 Q1, 1 Q2, 1 Q3
  function applySuggestion() {
    const suggestion: string[] = []
    for (const q of [1, 2, 3]) {
      const t = tasks.find(t => t.quadrant === q && !selected.includes(t.id))
      if (t) suggestion.push(t.id)
    }
    setSelected(suggestion.slice(0, 3))
  }

  function toggle(id: string) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  function confirm() {
    startTransition(() => { onConfirm(selected) })
  }

  const byQ = [1, 2, 3, 4].map(q => ({
    q, label: Q_LABEL[q],
    tasks: tasks.filter(t => t.quadrant === q),
  })).filter(g => g.tasks.length > 0)

  const unclassified = tasks.filter(t => t.quadrant === null)

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '32px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 26, fontWeight: 400, color: 'var(--fg)', margin: 0,
        }}>
          Quais são suas 3 prioridades hoje?
        </h2>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 6 }}>
          Selecione até 3 tarefas. A sugestão é 1 de cada quadrante mais importante.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button
            onClick={applySuggestion}
            disabled={tasks.filter(t => t.quadrant && t.quadrant <= 3).length === 0}
            style={{
              padding: '6px 14px', borderRadius: 6, border: '1px solid var(--q2-border)',
              background: 'var(--q2-fill)', color: 'var(--q2-text)',
              fontSize: 12, fontWeight: 500, cursor: 'pointer',
            }}
          >
            ◆ Sugerir automaticamente
          </button>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)', alignSelf: 'center' }}>
            {selected.length}/3 selecionadas
          </span>
        </div>
      </div>

      {/* Tarefas agrupadas por quadrante */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {byQ.map(({ q, label, tasks: qt }) => {
          const meta = QUAD_META[Q_KEY(q) ?? 'q1']
          return (
            <div key={q}>
              <div style={{
                fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
                letterSpacing: '0.08em', color: meta.text,
                background: meta.fill, border: `1px solid ${meta.border}`,
                padding: '3px 10px', borderRadius: 6, display: 'inline-block',
                marginBottom: 8,
              }}>{label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {qt.map(t => {
                  const isSelected = selected.includes(t.id)
                  const isDisabled = !isSelected && selected.length >= 3
                  return (
                    <button
                      key={t.id}
                      onClick={() => !isDisabled && toggle(t.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px', borderRadius: 8, textAlign: 'left',
                        border: `1.5px solid ${isSelected ? meta.border : 'var(--border-subtle)'}`,
                        background: isSelected ? meta.fill : 'var(--surface)',
                        color: isSelected ? meta.text : 'var(--fg)',
                        opacity: isDisabled ? 0.4 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        transition: 'all 120ms', fontSize: 13,
                      }}
                    >
                      <div style={{
                        width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                        border: `1.5px solid ${isSelected ? meta.border : 'var(--border-strong)'}`,
                        background: isSelected ? meta.border : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isSelected && (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                            stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5"/>
                          </svg>
                        )}
                      </div>
                      <span style={{ flex: 1 }}>{t.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        {unclassified.length > 0 && (
          <p style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
            {unclassified.length} tarefa(s) no inbox sem quadrante — classifique na Matriz primeiro.
          </p>
        )}

        {byQ.length === 0 && unclassified.length === 0 && (
          <div style={{
            padding: '32px', textAlign: 'center', color: 'var(--fg-muted)',
            border: '1px dashed var(--border-subtle)', borderRadius: 12,
          }}>
            Nenhuma tarefa ainda. Capture tarefas na Matriz primeiro.
          </div>
        )}
      </div>

      {/* Botão confirmar */}
      {selected.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <button
            onClick={confirm}
            style={{
              width: '100%', padding: '12px', borderRadius: 8, border: 'none',
              background: 'var(--green)', color: '#FAF9F7',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
              transition: 'background 150ms',
            }}
          >
            Confirmar minhas {selected.length} prioridade{selected.length > 1 ? 's' : ''} de hoje →
          </button>
        </div>
      )}
    </div>
  )
}

// ── Tela do dia planejado ─────────────────────────────────
function DayView({ plan, tasks, onReflect }: {
  plan: DailyPlan; tasks: DBTask[]
  onReflect: (text: string) => void
}) {
  const [doneIds, setDoneIds] = useState<string[]>(
    tasks.filter(t => t.status === 'done').map(t => t.id)
  )
  const [showReflection, setShowReflection] = useState(false)
  const [reflection, setReflection] = useState(plan.reflection ?? '')
  const [saved, setSaved] = useState(!!plan.reflection)
  const [, startTransition] = useTransition()

  function handleToggle(id: string) {
    setDoneIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    startTransition(async () => {
      const isDone = !doneIds.includes(id)
      await toggleTask(id, isDone)
    })
  }

  function handleSaveReflection() {
    startTransition(async () => {
      await saveDailyReflection(reflection)
      setSaved(true)
    })
    onReflect(reflection)
  }

  const doneCount = doneIds.length
  const total = tasks.length

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '32px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
      {/* Progresso */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 26, fontWeight: 400, color: 'var(--fg)', margin: 0,
          }}>
            Três do dia
          </h2>
          <span style={{ fontSize: 13, color: 'var(--fg-muted)', fontWeight: 500 }}>
            {doneCount}/{total} concluídas
          </span>
        </div>

        {/* Barra de progresso */}
        <div style={{
          height: 4, borderRadius: 999, background: 'var(--surface-3)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 999,
            background: doneCount === total ? 'var(--green)' : 'var(--q2-border)',
            width: total > 0 ? `${(doneCount / total) * 100}%` : '0%',
            transition: 'width 300ms cubic-bezier(0.2,0,0.2,1)',
          }} />
        </div>
      </div>

      {/* Tarefas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {tasks.length === 0 && (
          <div style={{
            padding: 20, textAlign: 'center', color: 'var(--fg-muted)',
            border: '1px dashed var(--border-subtle)', borderRadius: 12, fontSize: 13,
          }}>
            As tarefas escolhidas foram removidas ou concluídas.
          </div>
        )}
        {tasks.map(t => {
          const isDone = doneIds.includes(t.id)
          const qKey = Q_KEY(t.quadrant)
          const meta = qKey ? QUAD_META[qKey] : null
          return (
            <div
              key={t.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px', borderRadius: 10,
                background: isDone ? 'var(--surface-2)' : 'var(--surface)',
                border: `1px solid ${isDone ? 'var(--border-subtle)' : meta?.border ?? 'var(--border-subtle)'}`,
                transition: 'all 150ms',
              }}
            >
              <button
                onClick={() => handleToggle(t.id)}
                style={{
                  width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                  border: `2px solid ${isDone ? 'var(--green)' : meta?.border ?? 'var(--border-strong)'}`,
                  background: isDone ? 'var(--green)' : 'transparent',
                  cursor: 'pointer', padding: 0, position: 'relative',
                  transition: 'all 150ms',
                }}
              >
                {isDone && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="#FAF9F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    style={{ position: 'absolute', top: 2, left: 2 }}>
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                )}
              </button>
              <span style={{
                flex: 1, fontSize: 14,
                color: isDone ? 'var(--fg-muted)' : 'var(--fg)',
                textDecoration: isDone ? 'line-through' : 'none',
                textDecorationColor: 'var(--fg-muted)',
              }}>{t.title}</span>
              {meta && (
                <span style={{
                  fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 999,
                  background: meta.fill, color: meta.text, border: `1px solid ${meta.border}`,
                }}>
                  {qKey?.toUpperCase()}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Encerramento do dia */}
      <div style={{
        padding: 20, borderRadius: 12,
        background: 'var(--surface)',
        border: '1px solid var(--border-subtle)',
      }}>
        <button
          onClick={() => setShowReflection(!showReflection)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', background: 'none', border: 'none',
            cursor: 'pointer', padding: 0,
          }}
        >
          <span style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 18, color: 'var(--fg)',
          }}>
            Encerrar o dia
          </span>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
            {saved ? '✓ Salvo' : showReflection ? '▲' : '▼'}
          </span>
        </button>

        {showReflection && (
          <div style={{ marginTop: 14 }}>
            <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 10 }}>
              Como foi o dia? O que você aprendeu? (opcional)
            </p>
            <textarea
              value={reflection}
              onChange={e => setReflection(e.target.value)}
              placeholder="Escreva sua reflexão..."
              rows={4}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 8,
                border: '1px solid var(--border-subtle)',
                background: 'var(--surface-2)', color: 'var(--fg)',
                fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif',
                resize: 'vertical', outline: 'none', boxSizing: 'border-box',
              }}
            />
            <button
              onClick={handleSaveReflection}
              style={{
                marginTop: 10, padding: '8px 20px', borderRadius: 7,
                background: 'var(--green)', color: '#FAF9F7',
                border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}
            >
              Salvar reflexão
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Componente raiz ───────────────────────────────────────
export function TodayClient({ plan, planTasks, allTasks }: TodayClientProps) {
  const [currentPlan, setCurrentPlan] = useState(plan)
  const [currentTasks, setCurrentTasks] = useState(planTasks)
  const [, startTransition] = useTransition()

  function handleConfirm(ids: string[]) {
    startTransition(async () => {
      await createDailyPlan(ids)
      const chosen = allTasks.filter(t => ids.includes(t.id))
      setCurrentTasks(chosen)
      setCurrentPlan({ id: 'temp', task_ids: ids, reflection: null })
    })
  }

  if (!currentPlan) {
    return <PlanningView tasks={allTasks} onConfirm={handleConfirm} />
  }

  return (
    <DayView
      plan={currentPlan}
      tasks={currentTasks}
      onReflect={() => {}}
    />
  )
}
