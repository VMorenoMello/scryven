import Image from 'next/image'
import Link from 'next/link'

const BENEFITS = [
  {
    q: 'Q2',
    fill: 'var(--q2-fill)',
    border: 'var(--q2-border)',
    text: 'var(--q2-text)',
    title: 'O que realmente importa, primeiro',
    body: 'A matriz de Covey separa o urgente do importante. Você para de apagar incêndios e começa a construir o que importa de verdade.',
  },
  {
    q: '3',
    fill: 'var(--green-fill)',
    border: 'var(--green)',
    text: 'var(--green-text)',
    title: 'Ritual de 10 minutos, não planejamento infinito',
    body: 'Todo dia: escolha 3 prioridades. Todo dia: marque o que fez. Simples assim — sem dashboards, sem setup, sem recomeçar do zero.',
  },
  {
    q: '🔥',
    fill: 'var(--surface-2)',
    border: 'var(--border-subtle)',
    text: 'var(--fg-2)',
    title: 'Consistência vira identidade',
    body: 'O streak não é gamificação vazia — é prova de que você é o tipo de pessoa que executa. Um dia de cada vez.',
  },
]

export function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--fg)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 40px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--surface)',
      }}>
        <Image src="/logo-wordmark.svg" alt="Scryven" width={110} height={28} priority />
        <Link
          href="/login"
          style={{
            padding: '8px 18px', borderRadius: 8,
            background: 'var(--green)', color: '#FAF9F7',
            fontSize: 13, fontWeight: 500, textDecoration: 'none',
            transition: 'background 150ms',
          }}
        >
          Entrar
        </Link>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: 720, margin: '0 auto',
        padding: '80px 40px 64px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block',
          padding: '4px 14px', borderRadius: 999, marginBottom: 24,
          background: 'var(--q2-fill)', color: 'var(--q2-text)',
          border: '1px solid var(--q2-border)',
          fontSize: 12, fontWeight: 500,
        }}>
          ◆ Gratuito para começar — sem cartão
        </div>

        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(36px, 6vw, 58px)',
          fontWeight: 400, lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--fg)', margin: '0 0 24px',
        }}>
          Planejar menos.<br />Executar mais.
        </h1>

        <p style={{
          fontSize: 18, lineHeight: 1.6,
          color: 'var(--fg-2)', maxWidth: 520, margin: '0 auto 36px',
        }}>
          Você conhece a matriz de Eisenhower. Sabe que Q2 é o mais importante.
          Mas no fim do dia planejou mais do que executou.
          O Scryven quebra esse ciclo.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/login"
            style={{
              padding: '14px 32px', borderRadius: 10,
              background: 'var(--green)', color: '#FAF9F7',
              fontSize: 15, fontWeight: 500, textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(74,138,74,0.3)',
              transition: 'background 150ms',
            }}
          >
            Começar grátis →
          </Link>
          <Link
            href="/login"
            style={{
              padding: '14px 32px', borderRadius: 10,
              background: 'var(--surface)', color: 'var(--fg)',
              border: '1px solid var(--border-subtle)',
              fontSize: 15, fontWeight: 400, textDecoration: 'none',
              transition: 'background 150ms',
            }}
          >
            Já tenho conta
          </Link>
        </div>
      </section>

      {/* Divisor com visual da matriz */}
      <section style={{
        maxWidth: 720, margin: '0 auto 72px',
        padding: '0 40px',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
          borderRadius: 14, overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
        }}>
          {[
            { label: 'Q1 · Fazer agora',  bg: 'var(--q1-fill)', text: 'var(--q1-text)', border: 'var(--q1-border)' },
            { label: 'Q2 · Agendar',      bg: 'var(--q2-fill)', text: 'var(--q2-text)', border: 'var(--q2-border)' },
            { label: 'Q3 · Delegar',      bg: 'var(--q3-fill)', text: 'var(--q3-text)', border: 'var(--q3-border)' },
            { label: 'Q4 · Eliminar',     bg: 'var(--q4-fill)', text: 'var(--q4-text)', border: 'var(--q4-border)' },
          ].map(({ label, bg, text, border }) => (
            <div key={label} style={{
              padding: '20px 18px',
              background: bg, color: text,
              borderBottom: `2px solid ${border}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {label}
              </div>
              <div style={{
                marginTop: 10, height: 8, borderRadius: 4,
                background: `${border}44`, overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 4, background: border,
                  width: label.includes('Q2') ? '65%' : label.includes('Q1') ? '90%' : '40%',
                }} />
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--fg-muted)', marginTop: 12 }}>
          A matriz classifica suas tarefas. O ritual diário garante que você execute.
        </p>
      </section>

      {/* Benefícios */}
      <section style={{
        maxWidth: 720, margin: '0 auto 80px',
        padding: '0 40px',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 28, fontWeight: 400, color: 'var(--fg)',
          marginBottom: 8,
        }}>
          Por que funciona
        </h2>
        {BENEFITS.map(b => (
          <div key={b.title} style={{
            display: 'flex', gap: 16, alignItems: 'flex-start',
            padding: '20px', borderRadius: 12,
            background: b.fill, border: `1px solid ${b.border}`,
            color: b.text,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: b.border, color: '#FAF9F7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700,
            }}>{b.q}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{b.title}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.85 }}>{b.body}</div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA final */}
      <section style={{
        textAlign: 'center',
        padding: '56px 40px 80px',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 32, fontWeight: 400, color: 'var(--fg)',
          margin: '0 0 12px',
        }}>
          Pronto para executar?
        </h2>
        <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginBottom: 28 }}>
          Gratuito. Sem cartão. Funcional em 2 minutos.
        </p>
        <Link
          href="/login"
          style={{
            display: 'inline-block',
            padding: '14px 40px', borderRadius: 10,
            background: 'var(--green)', color: '#FAF9F7',
            fontSize: 15, fontWeight: 500, textDecoration: 'none',
            boxShadow: '0 2px 12px rgba(74,138,74,0.3)',
          }}
        >
          Criar conta grátis →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center', padding: '20px 40px',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: 12, color: 'var(--fg-muted)',
      }}>
        © 2026 Scryven · Planejar menos. Executar mais.
      </footer>
    </div>
  )
}
