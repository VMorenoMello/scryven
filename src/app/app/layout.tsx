import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppShell } from './AppShell'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Busca streak (dias consecutivos com pelo menos 1 tarefa concluída)
  const email = user.email ?? ''
  const userName = email.split('@')[0]

  return <AppShell userName={userName}>{children}</AppShell>
}
