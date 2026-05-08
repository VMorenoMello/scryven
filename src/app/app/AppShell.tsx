'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Sidebar } from '@/components/ui/Sidebar'

type NavId = 'inbox' | 'matrix' | 'today' | 'week'

const NAV_MAP: Record<NavId, string> = {
  inbox:  '/app/inbox',
  matrix: '/app/matrix',
  today:  '/app/today',
  week:   '/app/week',
}

interface AppShellProps {
  children: React.ReactNode
  userName: string
  streak: number
  hasPlannedToday: boolean
}

export function AppShell({ children, userName, streak, hasPlannedToday }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()

  const active = (Object.entries(NAV_MAP).find(([, path]) => pathname.startsWith(path))?.[0] ?? 'matrix') as NavId

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <Sidebar
        active={active}
        userName={userName}
        streak={streak}
        hasPlannedToday={hasPlannedToday}
        onNav={(id) => router.push(NAV_MAP[id])}
      />
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </div>
  )
}
