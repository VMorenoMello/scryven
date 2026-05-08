# Scryven Design System

> A weekly planning tool that turns chaos into clarity — built around the Eisenhower matrix and inspired by the MTG mechanic *Scry*.

## What is Scryven?

Scryven is a SaaS for Brazilian professionals who get stuck in endless replanning and never execute. It's built around the Eisenhower/Covey matrix (the four quadrants from *The 7 Habits of Highly Effective People*), helping users triage a chaotic backlog, pick three daily priorities, and build a streak of consistent planning rituals.

**Audience:** non-technical adults who have read productivity books but can't apply them consistently — they've tried Notion, Todoist, and similar tools but find them too complex or too generic.

**Naming:** *Scryven* = MTG's *Scry* (looking at the top of your deck and deciding what stays / what goes — a perfect metaphor for backlog triage) + *haven* (a place of refuge and clarity).

## Products covered

| Surface | Stack | Notes |
|---|---|---|
| **Web app** | Next.js + Tailwind CSS | Primary surface, desktop + mobile browser |
| **Marketing landing page** | Next.js + Tailwind CSS | Conversion-focused, single page |
| **PWA** | Manifest + icons | Home-screen icon and splash |

## The MTG × Covey color system

The four Eisenhower quadrants are mapped to four of the five MTG colors. Green is reserved as the brand identity color — growth, streaks, progress. The reference is meant as an *easter egg* for fans, not a costume — a non-MTG user should just see a confident, calm productivity tool.

| Quadrant | MTG color | Meaning |
|---|---|---|
| **Q1** Urgent + important | White-gold | Do now |
| **Q2** Important, not urgent | Blue | Plan / schedule |
| **Q3** Urgent, not important | Red | Delegate |
| **Q4** Neither | Black | Eliminate |
| **Brand** Streaks, progress | Green | Primary action |

## Index of this folder

- `README.md` — this file
- `SKILL.md` — Agent Skills entry point
- `colors_and_type.css` — design tokens (CSS variables) for both modes
- `tailwind.config.js` — Tailwind preset with the same tokens
- `fonts/` — references for Instrument Serif + Inter (Google Fonts loaded from CDN)
- `assets/` — logos, marks, PWA icons, illustrations
- `preview/` — small HTML cards used in the Design System tab
- `ui_kits/web_app/` — web app component recreations + clickable index
- `ui_kits/marketing/` — landing page recreation
- `SKILL.md` — Agent Skills entry point if this folder is downloaded as a Claude Code skill

## Content fundamentals

**Voice.** Calm but purposeful. The product is serious about execution, never anxious. We are confident, never apologetic. We assume the reader has tried other tools — we don't oversell.

**Person.** Address the user as **you**. The app speaks in the **second person**. We never say "we believe" or "the team" — Scryven is the product, not the company.

**Casing.** Sentence case for everything: buttons, headings, menu items, page titles. Never Title Case Like A Web2 SaaS. Acronyms (PWA, MTG) stay capitalized.

**Punctuation.** No exclamation points anywhere. Em dashes for asides. Periods inside sentences, dropped on standalone labels and buttons.

**Emoji.** Never in product UI. Sparingly allowed in marketing copy if it adds meaning (e.g. ✦ as a section divider) — but the default is none.

**Length.** Short. A button is a verb. A label is two or three words. A section heading is a sentence fragment. The longest thing on a screen is a task title, and even those wrap rather than truncate.

**Specific examples.**

| Don't | Do |
|---|---|
| "Tasks Successfully Imported! 🎉" | "Imported 12 tasks." |
| "Click here to get started" | "Plan your week" |
| "We've helped 10,000+ users" | "Used by 10,000 planners." |
| "Oops! Something went wrong." | "Couldn't save. Try again." |
| "Add a New Task" | "New task" |
| "Don't forget to check out our pricing!" | "Pricing →" |

**Portuguese.** Primary copy ships in PT-BR. Same rules — no exclamation points, sentence case, second person ("você"), short. Examples: "Planeje sua semana", "Nova tarefa", "12 tarefas importadas."

## Visual foundations

**Type.** Two families.
- **Instrument Serif** 400 (regular + italic) — display, page titles, marketing pull-quotes, the streak number. Refined classical bones, calmer than a fantasy serif.
- **Inter** 400 / 500 — all UI text, body, labels, forms, quadrant headers.
- Sizes: 28 / 18 / 14 / 12 / 11 px.

**Color.** Five-color quadrant system + neutrals. Each quadrant has a fill / border / text triplet for light and dark mode (see `colors_and_type.css`). Green (#4A8A4A) is the brand and primary-action color. Neutrals are warm off-whites (#FAF9F7, #F2F0EC, #E8E5DF) — never pure white.

**Backgrounds.** Flat surfaces only. No gradients. No background images, no full-bleed photography, no patterns or textures. The page background is a single warm off-white. Surface elevation is communicated by *hue and border* — not shadow.

**Shadows.** None in product UI. The system has no shadow tokens. Modals use a 1px border + a subtle scrim (rgba(40,38,35,0.4)) instead.

**Borders.** 1px solid. Two utility border colors: `--border-subtle` (#E8E5DF) for default surfaces, `--border-strong` (#B8A882-ish, varies per quadrant) for hover and selected states.

**Corner radii.** 6px (small — chips, inputs), 8px (medium — buttons, task rows), 12px (large — cards, modals). Nothing pill-shaped except the streak dots and the QuadrantChip.

**Spacing scale.** Multiples of 4: 4, 8, 12, 16, 20, 24, 32, 48, 64. Generous whitespace; cards breathe.

**Animation.** Quiet. Default ease is `cubic-bezier(0.2, 0, 0.2, 1)` at 150ms. Fades for appearance / disappearance. No bounces, no spring physics, no celebratory confetti. The streak counter ticks up — it doesn't explode.

**Hover states.** Lighten or darken the fill by ~4%. Borders go from subtle to strong. Never scale, never translate.

**Press states.** Background drops one shade darker, no scale change. Buttons apply `--green-700` on press (no shrink).

**Transparency / blur.** Used only for modal scrims. No glassmorphism, no frosted nav bars.

**Imagery.** The product UI ships zero imagery. The marketing page may include 1–2 product screenshots — flat, no shadows, no device frames, no rotated 3D mockups.

**Iconography.** [Lucide](https://lucide.dev) at 16 / 20 / 24 px, stroke 1.5. Locked palette: only `currentColor`. See `assets/icons/` and the ICONOGRAPHY section below.

**Layout.** 12-column grid on desktop with 24px gutters; single column with 16px gutters on mobile. Max content width 1120px. Sidebar is fixed at 240px. The 2×2 quadrant matrix collapses to a vertical stack below 768px.

## Iconography

**System:** [Lucide](https://lucide.dev) — open source, 1.5px stroke, 24px nominal. Stroke-based, never filled. Currently the only icon system in use.
- We import individual SVGs from `lucide-react` in production code.
- For prototyping in this design system we mirror the icons we actually use into `assets/icons/` so previews work offline.

**Sizes & weights.** Three sizes: 16px (in chips and inline), 20px (in buttons and rows), 24px (in headers / empty states). Stroke is always 1.5. We never alter the stroke. We never fill an icon — the only fill in the system is the brand mark.

**Color.** Icons inherit `currentColor`. Quadrant icons take their text color from the quadrant scale (e.g. `--q1-text` for white-gold). Disabled is `--fg-muted`.

**Emoji.** Never in product UI. The MTG mana symbols (✦, ☉, etc.) are not used as icons — we render the quadrant identity via color + an Inter letter (W / U / R / B) inside the QuadrantChip.

**Unicode.** A single bullet `·` separates metadata in lists. The arrow `→` is allowed in CTAs ("Pricing →"). No other unicode glyphs are used as icons.

## Substitutions flagged

- **Fonts** — Instrument Serif and Inter ship from Google Fonts via CDN; no .ttf bundled. If you need self-hosted weights, drop them in `fonts/` and update `colors_and_type.css`. *Cinzel was the original pick from the brief; replaced with Instrument Serif after design review — calmer, more Linear/Notion-aligned.*
- **Icons** — We mirror only the Lucide icons used in the kit. The rest is loaded from `https://unpkg.com/lucide-static`.
- **No real codebase or Figma was attached** — this system was built from the written spec the user provided. Treat values as canonical until you can read the production globals.css.

## Sources

- Written brand brief from the project owner (no Figma / codebase attached).
- Lucide icons (https://lucide.dev) under ISC.
- Instrument Serif + Inter on Google Fonts.
