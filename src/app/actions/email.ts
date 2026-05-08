'use server'

import { sendWelcomeEmail } from '@/lib/email'

export async function triggerWelcomeEmail(email: string) {
  const name = email.split('@')[0]
  await sendWelcomeEmail(email, name)
}
