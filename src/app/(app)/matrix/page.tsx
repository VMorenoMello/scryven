import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/ui/TopBar'
import { MatrixClient } from './MatrixClient'

export default async function MatrixPage() {
  const supabase = await createClient()
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .not('quadrant', 'is', null)
    .neq('status', 'done')
    .order('created_at', { ascending: true })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Matriz" subtitle="Arraste tarefas entre os quadrantes" />
      <MatrixClient tasks={tasks ?? []} />
    </div>
  )
}
