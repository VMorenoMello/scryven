'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createDailyPlan(taskIds: string[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  const { error } = await supabase
    .from('daily_plans')
    .upsert(
      { user_id: user.id, plan_date: new Date().toISOString().split('T')[0], task_ids: taskIds },
      { onConflict: 'user_id,plan_date' }
    )

  if (error) throw error
  revalidatePath('/app/today')
}

export async function saveDailyReflection(reflection: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  const today = new Date().toISOString().split('T')[0]
  const { error } = await supabase
    .from('daily_plans')
    .update({ reflection })
    .eq('user_id', user.id)
    .eq('plan_date', today)

  if (error) throw error
  revalidatePath('/app/today')
}

/** Retorna streak atual (dias consecutivos com plano criado). */
export async function getStreak(userId: string): Promise<number> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('daily_plans')
    .select('plan_date')
    .eq('user_id', userId)
    .order('plan_date', { ascending: false })
    .limit(365)

  if (!data || data.length === 0) return 0

  const dates = data.map(d => d.plan_date as string)
  const today = new Date().toISOString().split('T')[0]

  // Começa a contar a partir de hoje ou ontem
  let streak = 0
  let cursor = new Date(today)

  for (const date of dates) {
    const cursorStr = cursor.toISOString().split('T')[0]
    if (date === cursorStr) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    } else if (streak === 0 && date < cursorStr) {
      // Não planejou hoje ainda — streak começa em 0
      break
    } else {
      break
    }
  }

  return streak
}
