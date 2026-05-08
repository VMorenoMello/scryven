import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/ui/TopBar'
import { TodayClient } from './TodayClient'

export default async function TodayPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const today = new Date().toISOString().split('T')[0]

  // Plano de hoje
  const { data: plan } = await supabase
    .from('daily_plans')
    .select('*')
    .eq('user_id', user.id)
    .eq('plan_date', today)
    .maybeSingle()

  // Tarefas com quadrante (para seleção e exibição)
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .neq('status', 'done')
    .order('quadrant', { ascending: true })

  // Se há plano, busca os detalhes das tarefas escolhidas
  let planTasks: typeof tasks = []
  if (plan?.task_ids?.length) {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .in('id', plan.task_ids)
    planTasks = data ?? []
  }

  const dateLabel = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Hoje" subtitle={dateLabel} />
      <TodayClient
        plan={plan}
        planTasks={planTasks ?? []}
        allTasks={tasks ?? []}
      />
    </div>
  )
}
