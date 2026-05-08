'use client'

import { useOptimistic, useTransition } from 'react'
import { TaskItem } from '@/components/ui/TaskItem'
import { CaptureBar } from '@/components/ui/CaptureBar'
import { createTask, toggleTask } from '@/app/actions/tasks'
import type { Task } from '@/components/ui/TaskItem'

interface DBTask {
  id: string
  title: string
  quadrant: number | null
  status: string
  created_at: string
}

function dbToTask(t: DBTask): Task {
  return { id: t.id, title: t.title, done: t.status === 'done' }
}

export function InboxClient({ tasks: initial }: { tasks: DBTask[] }) {
  const [, startTransition] = useTransition()
  const [tasks, setTasks] = useOptimistic(initial)

  function handleAdd(title: string) {
    const temp: DBTask = {
      id: crypto.randomUUID(),
      title,
      quadrant: null,
      status: 'backlog',
      created_at: new Date().toISOString(),
    }
    startTransition(async () => {
      setTasks(prev => [temp, ...prev])
      await createTask(title)
    })
  }

  function handleToggle(id: string) {
    startTransition(async () => {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'backlog' : 'done' } : t))
      const task = tasks.find(t => t.id === id)
      if (task) await toggleTask(id, task.status !== 'done')
    })
  }

  const visible = tasks.filter(t => t.status !== 'done')

  return (
    <>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {visible.length === 0 ? (
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--fg-muted)', fontSize: 14, textAlign: 'center', paddingTop: 80,
          }}>
            Inbox limpo — capture uma nova tarefa abaixo.
          </div>
        ) : (
          visible.map(t => (
            <TaskItem
              key={t.id}
              task={dbToTask(t)}
              onToggle={handleToggle}
              draggable={false}
              showChip={false}
            />
          ))
        )}
      </div>
      <CaptureBar onAdd={handleAdd} />
    </>
  )
}
