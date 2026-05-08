'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { triggerWelcomeEmail } from '@/app/actions/email'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('Email ou senha incorretos.')
      } else {
        window.location.href = '/app/today'
      }
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else if (data.session) {
        // Email confirmation desativada — sessão criada imediatamente
        await triggerWelcomeEmail(email).catch(() => {}) // não bloqueia o fluxo
        window.location.href = '/app/today'
      } else {
        // Email confirmation ativada — aguarda confirmação
        setSuccess('Conta criada! Verifique seu email para confirmar.')
      }
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center' }}>
          <Image src="/logo-wordmark.svg" alt="Scryven" width={140} height={34} priority />
          <p style={{ marginTop: 8, fontSize: 13, color: 'var(--fg-muted)' }}>
            Planejar menos. Executar mais.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 12,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, background: 'var(--surface-2)', borderRadius: 8, padding: 4 }}>
            {(['login', 'signup'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); setSuccess(null) }}
                style={{
                  flex: 1, padding: '6px 0', borderRadius: 6, border: 'none',
                  background: mode === m ? 'var(--surface)' : 'transparent',
                  color: mode === m ? 'var(--fg)' : 'var(--fg-muted)',
                  fontSize: 13, fontWeight: mode === m ? 500 : 400,
                  cursor: 'pointer',
                  boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 120ms',
                }}
              >
                {m === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--fg-2)' }}>Email</label>
              <Input
                value={email}
                onChange={setEmail}
                onEnter={handleSubmit}
                placeholder="seu@email.com"
                trailingHint=""
                size="lg"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--fg-2)' }}>Senha</label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                height: 44, padding: '0 12px',
                background: 'var(--surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 8,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="••••••••"
                  style={{
                    flex: 1, border: 'none', outline: 'none',
                    background: 'transparent', color: 'var(--fg)',
                    fontSize: 14, fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Erro / sucesso */}
          {error && (
            <div style={{ fontSize: 13, color: 'var(--q3-text)', background: 'var(--q3-fill)', padding: '8px 12px', borderRadius: 8 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ fontSize: 13, color: 'var(--green-text)', background: 'var(--green-fill)', padding: '8px 12px', borderRadius: 8 }}>
              {success}
            </div>
          )}

          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={loading || !email || !password}
          >
            {loading ? 'Aguarde…' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </Button>
        </div>
      </div>
    </div>
  )
}
