---
name: scryven-design
description: Use this skill to generate well-branded interfaces and assets for Scryven, a weekly-planning SaaS for Brazilian professionals. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping or production.
user-invocable: true
---

# Scryven design skill

Scryven is a weekly-planning SaaS organised around the Eisenhower matrix, with the four quadrants tinted in four MTG colors and Green reserved as the brand / streak / primary-action color. The brand is calm, considered, slightly editorial — never gamified, never anxious.

## Start here

1. Read `README.md` in this skill — it covers brand context, content fundamentals (voice, casing, PT-BR rules), visual foundations, and iconography.
2. Read `colors_and_type.css` for the canonical token values. `tailwind.config.js` mirrors them.
3. Browse `assets/` for the logo (quadrant sigil + Instrument Serif wordmark), PWA icons, splash.
4. Browse `ui_kits/web_app/` for production-shaped React components (Button, Input, QuadrantChip, TaskItem, QuadrantCard, StreakBadge, Sidebar, TopBar, MatrixView, CaptureBar, DailyThree) and `index.html` for the assembled product view.
5. Browse `ui_kits/marketing/index.html` for the landing-page treatment.
6. `preview/` holds small specimen cards used by the design-review tab — useful as quick visual references.

## How to use this skill

- **Visual artifacts (slides, mocks, throwaway prototypes)** — copy assets out of `assets/`, import `colors_and_type.css`, and write static HTML the user can view directly. Use the existing UI kit components as inline JSX templates.
- **Production code** — the tokens map 1:1 to Tailwind via `tailwind.config.js`. Component shapes in `ui_kits/web_app/` are the production shapes; only the import system differs.
- **If invoked without specifics** — ask the user what they want to build (web app screen? marketing section? slide? PWA asset?), ask 4–6 clarifying questions about scope and tone, then act as an expert designer outputting HTML or production code.

## Non-negotiables

- Two type families only: **Instrument Serif** (display, italic for asides) and **Inter** (UI, body, labels). Two Inter weights: 400 and 500.
- No gradients. No shadows. Surfaces lift via hue, not blur.
- No emoji in product UI.
- Sentence case everywhere. No exclamation points. PT-BR is the primary copy language; second person ("você").
- Quadrant identity is always **color + Inter letter (W / U / R / B)**, never mana symbols or fantasy iconography.
- Lucide icons only, stroke 1.5, always `currentColor`.
- Green is the only color that fills a button.

## Substitutions to flag

- **Fonts** ship from Google Fonts CDN — bundle if going to production with offline guarantees.
- The Cinzel font in the original brief was replaced with Instrument Serif during design review (calmer, closer to the Linear/Notion references).
