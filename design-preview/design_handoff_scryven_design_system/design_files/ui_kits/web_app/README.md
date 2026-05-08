# Web app UI kit

Recreates the Scryven web app interface as static, interactive HTML — the production stack is Next.js + Tailwind, but this kit uses inline React + Babel so it runs without a build.

## What's here

- `index.html` — clickable demo: capture inbox → drag to quadrant → mark daily 3 → streak ticks
- `globals.css` — same tokens as the root `colors_and_type.css` (mirrored locally so the kit works standalone)
- Components, one per file:
  - `Button.jsx` — primary / secondary / ghost / danger
  - `Input.jsx` — quick-capture field with onEnter
  - `QuadrantChip.jsx` — pill badge per quadrant
  - `TaskItem.jsx` — row: checkbox · title · chip · meta
  - `QuadrantCard.jsx` — droppable 2×2 matrix cell
  - `StreakBadge.jsx` — day counter + 7-dot history
  - `Sidebar.jsx` — logo + nav + user
  - `TopBar.jsx` — page title + streak
  - `MatrixView.jsx` — 2×2 grid of QuadrantCards
  - `CaptureBar.jsx` — sticky capture row
  - `DailyThree.jsx` — today's three priorities
  - `Icon.jsx` — Lucide-style stroke icons we use

## Production mapping

In production these are .tsx files inside `components/` of the Next.js app. The visual treatment, classnames, and component shapes here are 1:1 — only the import style (Babel inline vs ES modules) and the data layer (in-memory state vs server) differ.

## Disclaimer

No production codebase or Figma file was shared. Visuals here follow the written brief; treat them as a strong starting point that should be reconciled against the real production app once available.
