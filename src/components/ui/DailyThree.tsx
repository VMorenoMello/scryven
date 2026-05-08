import { TaskItem } from './TaskItem'
import type { Task } from './TaskItem'

interface DailyThreeProps {
  tasks?: Task[]
  onToggle?: (id: string) => void
}

export function DailyThree({ tasks = [], onToggle }: DailyThreeProps) {
  const slots = [0, 1, 2]
  const done = tasks.filter(t => t.done).length

  return (
    <div style={{
      padding: 18,
      background: 'var(--surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 12,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 12,
      }}>
        <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, color: 'var(--fg)' }}>
          Três do dia
        </div>
        <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {done} / 3
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {slots.map(i => {
          const t = tasks[i]
          if (!t) {
            return (
              <div key={i} style={{
                padding: '12px 14px',
                border: '1px dashed var(--border-subtle)',
                borderRadius: 8,
                fontSize: 13, color: 'var(--fg-muted)',
              }}>
                Escolha uma prioridade…
              </div>
            )
          }
          return <TaskItem key={t.id} task={t} onToggle={onToggle} />
        })}
      </div>
    </div>
  )
}
