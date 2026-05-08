import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/ui/TopBar'
import { InboxClient } from './InboxClient'

export default async function InboxPage() {
  const supabase = await createClient()
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .is('quadrant', null)
    .neq('status', 'done')
    .order('created_at', { ascending: false })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar
        title="Inbox"
        subtitle={`${tasks?.length ?? 0} tarefa${tasks?.length !== 1 ? 's' : ''} sem quadrante`}
      />
      <InboxClient tasks={tasks ?? []} />
    </div>
  )
}
