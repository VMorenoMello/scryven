'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTask(title: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  const { error } = await supabase
    .from('tasks')
    .insert({ title, user_id: user.id })

  if (error) throw error
  revalidatePath('/app/inbox')
  revalidatePath('/app/matrix')
}

export async function moveTask(id: string, quadrant: number | null) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('tasks')
    .update({ quadrant })
    .eq('id', id)

  if (error) throw error
  revalidatePath('/app/inbox')
  revalidatePath('/app/matrix')
}

export async function toggleTask(id: string, done: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('tasks')
    .update({
      status: done ? 'done' : 'backlog',
      done_at: done ? new Date().toISOString() : null,
    })
    .eq('id', id)

  if (error) throw error
  revalidatePath('/app/inbox')
  revalidatePath('/app/matrix')
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/app/inbox')
  revalidatePath('/app/matrix')
}
