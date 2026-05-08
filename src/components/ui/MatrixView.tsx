import { QuadrantCard } from './QuadrantCard'
import type { QuadrantKey } from './QuadrantChip'
import type { Task } from './TaskItem'

const CELLS: { q: QuadrantKey; title: string; subtitle: string }[] = [
  { q: 'q1', title: 'Q1 · Fazer agora', subtitle: 'Urgente e importante' },
  { q: 'q2', title: 'Q2 · Agendar',     subtitle: 'Importante, não urgente' },
  { q: 'q3', title: 'Q3 · Delegar',     subtitle: 'Urgente, não importante' },
  { q: 'q4', title: 'Q4 · Eliminar',    subtitle: 'Nenhum dos dois' },
]

interface MatrixViewProps {
  tasks: Task[]
  onDrop?: (taskId: string, q: QuadrantKey) => void
  onToggle?: (taskId: string) => void
}

export function MatrixView({ tasks, onDrop, onToggle }: MatrixViewProps) {
  const byQ = (q: QuadrantKey) => tasks.filter(t => t.q === q)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      padding: 32,
    }}>
      {CELLS.map(c => (
        <QuadrantCard
          key={c.q}
          q={c.q}
          title={c.title}
          subtitle={c.subtitle}
          tasks={byQ(c.q)}
          onDrop={onDrop}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
