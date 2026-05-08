import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, name: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY não configurada — email não enviado')
    return
  }

  await resend.emails.send({
    from: 'Scryven <onboarding@resend.dev>',
    to: email,
    subject: 'Bem-vindo ao Scryven 🌱',
    html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAF9F7;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:520px;margin:40px auto;padding:0 20px;">

    <!-- Header -->
    <div style="text-align:center;padding:32px 0 24px;">
      <div style="font-family:Georgia,serif;font-size:28px;font-weight:400;color:#1F1D1A;letter-spacing:-0.01em;">
        Scryven
      </div>
      <div style="font-size:12px;color:#8A8478;margin-top:4px;text-transform:uppercase;letter-spacing:0.08em;">
        Planejar menos. Executar mais.
      </div>
    </div>

    <!-- Card principal -->
    <div style="background:#FFFFFF;border:1px solid #E8E5DF;border-radius:12px;padding:32px;">
      <h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;color:#1F1D1A;margin:0 0 12px;">
        Olá, ${name}! 👋
      </h1>
      <p style="font-size:14px;line-height:1.6;color:#4A463F;margin:0 0 20px;">
        Bem-vindo ao Scryven. Você acabou de dar o primeiro passo para sair do ciclo
        de replanejamento constante.
      </p>

      <!-- 3 passos -->
      <div style="background:#F2F0EC;border-radius:8px;padding:16px;margin:0 0 24px;">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#8A8478;margin-bottom:12px;">
          Por onde começar
        </div>
        ${[
          ['1.', 'Capture suas tarefas', 'Inbox ou Matriz — tudo que está na sua cabeça'],
          ['2.', 'Classifique nos quadrantes', 'Arraste cada tarefa para Q1, Q2, Q3 ou Q4'],
          ['3.', 'Faça o ritual diário', 'Escolha 3 prioridades e execute — 10 minutos'],
        ].map(([num, title, desc]) => `
          <div style="display:flex;gap:10px;margin-bottom:10px;align-items:flex-start;">
            <div style="width:20px;height:20px;border-radius:50%;background:#4A8A4A;color:#fff;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
              ${num.replace('.', '')}
            </div>
            <div>
              <div style="font-size:13px;font-weight:500;color:#1F1D1A;">${title}</div>
              <div style="font-size:12px;color:#8A8478;">${desc}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <a href="https://scryven.vercel.app/app/today"
         style="display:block;text-align:center;background:#4A8A4A;color:#FAF9F7;text-decoration:none;padding:13px;border-radius:8px;font-size:14px;font-weight:500;">
        Acessar o Scryven →
      </a>
    </div>

    <!-- Q2 highlight -->
    <div style="background:#E8F2FB;border:1px solid #4A7FB5;border-radius:10px;padding:16px 20px;margin:16px 0;">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#4A7FB5;margin-bottom:4px;">
        ◆ Dica — Q2 é o mais valioso
      </div>
      <div style="font-size:13px;color:#1A3D5C;line-height:1.5;">
        Importante, mas não urgente. É o quadrante que mais negligenciamos — e o que mais
        transforma vidas quando executado consistentemente.
      </div>
    </div>

    <p style="text-align:center;font-size:12px;color:#8A8478;margin-top:24px;">
      Scryven · <a href="https://scryven.vercel.app" style="color:#8A8478;">scryven.vercel.app</a>
    </p>
  </div>
</body>
</html>
    `,
  })
}
