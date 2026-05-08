import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getStreak } from '@/app/actions/plans'
import { AppShell } from './AppShell'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const userName = (user.email ?? '').split('@')[0]
  const today = new Date().toISOString().split('T')[0]

  const [{ data: planToday }, streak] = await Promise.all([
    supabase
      .from('daily_plans')
      .select('id')
      .eq('user_id', user.id)
      .eq('plan_date', today)
      .maybeSingle(),
    getStreak(user.id),
  ])

  return (
    <AppShell userName={userName} streak={streak} hasPlannedToday={!!planToday}>
      {children}
    </AppShell>
  )
}
