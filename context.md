# Scryven — Arquivo de Contexto
> Mantenha este arquivo atualizado a cada sprint. Sempre inicie uma sessão no Claude Code com: "leia o CONTEXT.md antes de qualquer coisa".
---
## O produto
**Nome:** Scryven
**Tagline:** Planejar menos. Executar mais.
**Plataforma:** Web app (Next.js) + PWA para mobile
**Público-alvo:** Brasileiros presos no ciclo de replanejamento constante — profissionais que já leram livros de produtividade (especialmente "Os 7 Hábitos") mas não conseguem aplicar o método na prática.
### Origem do nome
- **Scry** (MTG): mecanismo de Magic: The Gathering onde o jogador olha o topo do deck e decide o que fica e o que vai embora — metáfora exata para triagem de backlog
- **Haven**: refúgio, um lugar de clareza e intenção
- Easter egg para fãs de MTG, sem alienar quem não conhece o jogo
---
## A dor que resolve
- Backlog extenso que nunca se consegue manter atualizado
- Sabe que deveria priorizar por urgência × importância (Covey/Eisenhower), mas não consegue na prática
- Já tentou Notion, Todoist e similares — ferramentas que incentivam planejamento infinito em vez de execução
- O ciclo a quebrar: **replanejamento constante → nunca executa**
---
## Proposta de valor central
Não é mais uma lista de tarefas com 4 categorias.
É um **ritual semanal guiado de 10 minutos** que ajuda a classificar o backlog nos quadrantes de Covey, escolher as 3 prioridades do dia, e revisar o que foi feito — com fricção mínima.
**Diferencial vs. concorrência:**
- **Apps de Eisenhower (App Store):** estáticos, sem ritual guiado, sem revisão de backlog
- **Sunsama:** mais próximo, mas $16–20/mês em USD, sem localização BR, sem framework Covey
- **Notion / Todoist:** genéricos, setup complexo, incentivam planejamento excessivo
---
## Os 4 quadrantes (referência Covey)
| Quadrante | Critério | Cor MTG | Ação |
|-----------|----------|---------|------|
| Q1 | Urgente + Importante | Branco — Ordem, dever, crise | Fazer agora |
| Q2 | Importante, não urgente | Azul — Conhecimento, planejamento | Agendar — **o mais valioso** |
| Q3 | Urgente, não importante | Vermelho — Impulso, reação externa | Delegar |
| Q4 | Não urgente, não importante | Preto — Corte sem piedade | Eliminar |
**Verde (brand)** = identidade do app — crescimento, streak, progresso. É a 5ª cor MTG que representa o próprio usuário evoluindo.
> Q2 é o coração do produto. É o quadrante mais negligenciado e mais valioso do Covey. A cor azul é o destaque visual principal do app.
---
## Stack técnico
| Camada | Tecnologia | Motivo |
|--------|-----------|--------|
| Frontend + rotas | Next.js 14 (App Router) | Deploy automático, Server Components |
| Estilização | Tailwind CSS (`darkMode: 'class'`) | Utility-first |
| Tema dark/light | next-themes | Toggle automático |
| Design system | Claude (gerado separadamente) | Componentes em `components/ui/` |
| Auth + banco + API | Supabase | Auth gratuito, PostgreSQL, RLS |
| Deploy + CI/CD | Vercel | Push no GitHub → live |
| Versionamento | GitHub | Integrado ao Vercel |
| Drag and drop | dnd-kit | Padrão Next.js |
| Email transacional | Resend | 10 min setup, plano gratuito |
| IA (v2 — não agora) | Anthropic API | Classificação automática de quadrante |
---
## Schema do banco (Supabase)
```sql
-- Auth gerenciado pelo Supabase (users: id, email, created_at)
create table tasks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users not null,
  title       text not null,
  quadrant    int check (quadrant in (1, 2, 3, 4)), -- null = backlog sem classificação
  status      text default 'backlog' check (status in ('backlog', 'today', 'done')),
  created_at  timestamptz default now(),
  done_at     timestamptz
);
create table weekly_reviews (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users not null,
  week_start      date not null,
  top_3_task_ids  uuid[],
  reflection      text,
  created_at      timestamptz default now()
);
-- Row Level Security
alter table tasks enable row level security;
alter table weekly_reviews enable row level security;
create policy "users see own tasks"
  on tasks for all using (auth.uid() = user_id);
create policy "users see own reviews"
  on weekly_reviews for all using (auth.uid() = user_id);
```
---
## Helper de quadrantes — `lib/quadrant.ts`
```ts
export const QUADRANTS = {
  1: {
    label: 'Q1', name: 'Urgente + Importante',
    color: 'Branco', symbol: '☀', action: 'Fazer agora',
    description: 'Crises, prazos críticos, emergências',
  },
  2: {
    label: 'Q2', name: 'Importante, não urgente',
    color: 'Azul', symbol: '◆', action: 'Agendar',
    description: 'Estudos, projetos, crescimento — o mais valioso',
  },
  3: {
    label: 'Q3', name: 'Urgente, não importante',
    color: 'Vermelho', symbol: '▲', action: 'Delegar',
    description: 'Interrupções, pedidos alheios',
  },
  4: {
    label: 'Q4', name: 'Eliminar',
    color: 'Preto', symbol: '●', action: 'Eliminar',
    description: 'Distrações, tarefas sem valor real',
  },
} as const
```
---
## Funcionalidades do MVP (v1)
### Sprint 1 — Setup + auth ✅
- [x] Repositório GitHub + Vercel + Supabase conectados
- [x] Auth: email/senha via `@supabase/ssr`
- [x] Tabelas `tasks` e `weekly_reviews` com RLS
- [x] Layout base: sidebar, header, área de conteúdo
- [x] Dark mode com `next-themes`
- [x] Design system importado de `components/ui/`
### Sprint 2 — Backlog + matriz ✅
- [x] Captura rápida de tarefa (Enter para salvar)
- [x] View de matriz 2×2 com os 4 quadrantes
- [x] Drag and drop entre quadrantes (dnd-kit → atualiza Supabase)
- [x] View de backlog (tarefas sem quadrante)
- [x] Marcar tarefa como concluída
### Sprint 3 — Ritual diário ✅
- [x] Tela de planejamento diário (abre no login se ainda não planejou)
- [x] Seleção de 3 tarefas do dia — sugestão: 1 Q1, 1 Q2, 1 Q3
- [x] Streak visual — contador de dias consecutivos
- [x] Encerramento do dia — checklist + reflexão opcional
### Sprint 4 — Polimento + lançamento ✅
- [x] PWA: `manifest.json` + meta tags
- [x] Landing page: headline focada na dor, 3 benefícios, CTA
- [x] Email de boas-vindas com Resend
- [ ] Compartilhar com 10 pessoas, coletar feedback
---
## Fora do escopo do MVP (v2+)
- Classificação automática de quadrante por IA (Anthropic API)
- Integração com Google Calendar
- Planos pagos em BRL (R$19–29/mês) via Stripe ou Lemon Squeezy
- App mobile nativo
- Relatórios semanais de produtividade
- Accountability social / compartilhamento de progresso
---
## Decisões tomadas — não reverter sem discussão
1. **Nome é Scryven** — não Quadrante. Todas as referências no código devem usar Scryven.
2. **Design system vem do Claude** — não recriar componentes de UI à mão. Importar de `components/ui/`.
3. **Ritual antes de IA** — classificação por IA entra na v2.
4. **Só 3 prioridades por dia** — mecanismo central. Não aumentar.
5. **Sem gamificação pesada** — streak é o único elemento de engajamento.
6. **Preço em BRL quando monetizar** — concorrência principal não tem preço local.
7. **Sem setup infinito** — funcional em 2 minutos do zero.
8. **Q2 é o destaque visual** — azul é a cor mais importante. Nunca rebaixar para secundário.
---
## Contexto do fundador
- Perfil: conhecimento técnico razoável, não programador de ofício
- Stack de construção: Claude Code (principal)
- Objetivo: aprender + gerar renda extra + produto real de mercado
- A dor é pessoal — o fundador vive o ciclo de replanejamento que o produto resolve
---
## URLs do projeto
- **GitHub:** https://github.com/VMorenoMello/scryven
- **Vercel (produção):** https://scryven.vercel.app
- **Vercel (painel):** https://vercel.com/victormorenomello-2812s-projects/scryven
---
## Status atual
**Fase:** MVP completo — coletando feedback
**Última atualização:** Maio 2026
### Changelog
| Data | Decisão |
|------|---------|
| Maio 2026 | Produto iniciado como "Quadrante" |
| Maio 2026 | Nome alterado para **Scryven** |
| Maio 2026 | Identidade visual definida — 5 cores MTG + Cinzel/Inter |
| Maio 2026 | Design system delegado ao Claude (fora do Claude Code) |
| Maio 2026 | Sprint 1 concluída — repo GitHub + Vercel + Supabase + auth |
| Maio 2026 | Sprint 2 concluída — matriz Eisenhower + drag-and-drop + inbox |
| Maio 2026 | Sprint 3 concluída — ritual diário (3 prioridades, streak, encerramento) |
| Maio 2026 | Sprint 4 concluída — landing page, PWA, email Resend em produção |
> Adicione uma linha ao changelog e marque os checkboxes a cada sessão concluída.
