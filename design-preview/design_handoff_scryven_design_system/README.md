# Handoff: Scryven Design System

## Overview

Scryven is a weekly-planning SaaS for Brazilian professionals, organised around the Eisenhower matrix. The four quadrants are tinted with the four MTG colors (W = Q1 gold, U = Q2 blue, R = Q3 red, B = Q4 black/charcoal), and Green is reserved as the brand / streak / primary-action color.

This bundle is the **complete v1 design system**: tokens, brand assets, type stack, iconography rules, two clickable UI kits (web app + marketing landing), and an Agent Skills entrypoint (`SKILL.md`) so the system can be loaded into Claude Code as a project skill.

The brand voice is calm, considered, slightly editorial — never gamified, never anxious. PT-BR primary copy.

## About the Design Files

The files in `design_files/` are **design references created in HTML/CSS/JSX prototypes**. They show intended look, structure, and behavior — they are NOT production code to ship verbatim.

Your task is to **recreate these designs in the target codebase's environment** (React + Tailwind + Vite is the assumed stack — if the team has not chosen one yet, that pairing is recommended because the tokens already mirror Tailwind config). Use the codebase's established patterns (router, state management, form library, testing) — only the visual layer comes from this bundle.

If the project has no codebase yet, scaffold a Vite + React + TypeScript + Tailwind app and drop `colors_and_type.css` (or `tailwind.config.js`) in directly.

## Fidelity

**High-fidelity** for tokens, type, components, and the matrix view. All hex values, font weights, sizes, and spacings in this bundle are final. Recreate pixel-perfectly.

**Mid-fidelity** for the marketing landing — the layout and section order are correct, but copy is placeholder and imagery slots are empty (the real site will need photography or illustration in the hero peek area at minimum).

**Not designed yet** (out of scope for this handoff): auth screens, onboarding, settings, weekly review modal, billing/account. The token system covers these; build them following the established patterns.

## Brand foundations

- **Logo**: `assets/logo-mark.svg` (mark only) and `assets/logo-wordmark.svg` (mark + wordmark). Dark variant: `logo-wordmark-dark.svg`. The mark is an isometric 3D quadrant cube — top face split into 4 MTG-tinted diamonds, side faces in warm paper tones, green seed at the cross. PWA assets in `assets/pwa-icon-512.svg` and `assets/pwa-splash.svg`.
- **Type**: two families only. `Instrument Serif` (display, italic for asides) and `Inter` (UI/body/labels). Two Inter weights: 400, 500. Both ship from Google Fonts CDN — bundle `.woff2` locally for production.
- **No gradients in chrome.** Surfaces lift via hue, not blur. The only gradients in the system are inside the logo SVG itself (do not echo them into UI surfaces).
- **No shadows.** Borders + slight surface-color shifts only.
- **No emoji in product UI.**

## Design Tokens

All canonical values live in **`design_files/colors_and_type.css`**. Tailwind theme mirror in **`design_files/tailwind.config.js`**. Both are the source of truth — pick whichever matches the codebase.

### Color tokens (light)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FAF9F7` | Page background (warm off-white) |
| `--surface` | `#FFFFFF` | Cards, panels |
| `--surface-2` | `#F2EEE7` | Sidebar, sunken surfaces |
| `--surface-3` | `#E8E2D6` | Hover, selected row |
| `--fg` | `#1F1D1A` | Primary text |
| `--fg-2` | `#4A453E` | Secondary text |
| `--fg-muted` | `#8A8378` | Tertiary, captions, timestamps |
| `--border-subtle` | `#E5DFD3` | Default borders |
| `--border-strong` | `#C9C0AD` | Active/focus borders |
| `--green` | `#4A8A4A` | Brand, primary action, streak |
| `--green-700` | `#3A6E3A` | Primary hover |
| `--green-fill` | `#E8F0E5` | Soft green wash (streak badge bg) |
| `--green-text` | `#2E5A2E` | Green text on green-fill |

### Quadrant colors (the four MTG hues)

| Q | Token base | Fill | Text | Border |
|---|---|---|---|---|
| Q1 (W) | `--q1-*` | `#F5F0E8` | `#4A3F28` | `#B8A882` |
| Q2 (U) | `--q2-*` | `#E8F2FB` | `#1A3D5C` | `#4A7FB5` |
| Q3 (R) | `--q3-*` | `#FBE8E4` | `#6B1F10` | `#C4503A` |
| Q4 (B) | `--q4-*` | `#2A2825` | `#C8B896` | `#6B5E4A` |

### Type scale

- `font-family-display`: `'Instrument Serif', Georgia, serif`
- `font-family-body`: `'Inter', system-ui, sans-serif`
- Display sizes (Instrument Serif, weight 400): 64 / 44 / 32 / 28 / 22 / 18 px, line-height 1.05–1.2, letter-spacing -0.01em on the largest.
- Body sizes (Inter): 16 / 14 / 13 / 12 / 11 px. Weight 400 default, 500 for emphasis. No 600+ weights.
- Eyebrow labels: Inter 500, 11px, uppercase, letter-spacing 0.10em.
- Streak / numerals in the badge: Instrument Serif, 22px, line-height 1.

### Spacing

4px base. Common steps: 4, 8, 10, 12, 14, 16, 20, 24, 32, 48, 64. Container max-width on marketing: 1120px with 32px gutters.

### Radii

- 6px (input, chip)
- 8px (button)
- 10–12px (card)
- 16px (large card / pricing block)
- 999px (pill, avatar)

### Iconography

[Lucide](https://lucide.dev) only. Stroke 1.5. Always render with `currentColor` — never bake a fill or stroke color into the icon. Common ones used in the kit: `inbox`, `grid`, `target`, `calendar`, `flame`, `plus`, `search`, `settings`, `sun`, `moon`, `check`, `chevron-right`. The `Icon.jsx` in the web kit shows the exact subset.

## Components

The full prototyped set lives at `design_files/ui_kits/web_app/`. Each is a single JSX file written for runtime Babel — port the JSX shape into the codebase's conventions (TypeScript, named exports, etc.).

| Component | File | What it is |
|---|---|---|
| Icon | `Icon.jsx` | Lucide-CDN wrapper, takes `name`, `size`, `color` |
| Button | `Button.jsx` | `variant` = primary / secondary / ghost / danger; `size` = sm / md; optional `icon` |
| Input | `Input.jsx` | Single-line text input with optional `trailingHint` (e.g. "Enter") and `onEnter` handler |
| QuadrantChip | `QuadrantChip.jsx` | Small pill — color + Inter letter (W/U/R/B). Identifies a task's quadrant |
| TaskItem | `TaskItem.jsx` | Row: checkbox + title + due meta + quadrant chip. Strikethrough on done |
| QuadrantCard | `QuadrantCard.jsx` | One cell of the 2×2 matrix: header, count, drop target, list of TaskItems |
| StreakBadge | `StreakBadge.jsx` | Sidebar streak block. Instrument Serif numeral, flame icon, green-fill background |
| Sidebar | `Sidebar.jsx` | App nav: logo, nav items, streak badge, account row |
| TopBar | `TopBar.jsx` | Page header with Instrument Serif title + slot for actions |
| MatrixView | `MatrixView.jsx` | 2×2 grid of QuadrantCards. Filters tasks by `q` field |
| CaptureBar | `CaptureBar.jsx` | Sticky bottom input that adds tasks to the inbox on Enter |
| DailyThree | `DailyThree.jsx` | "Today's three" card. Three slots, completion counter, dashed empty state |

Marketing components are inlined in `ui_kits/marketing/index.html` (sections: Nav, Hero, Matrix-explained, Three-a-day, Pricing, Footer). Lift the section blocks into route components when porting.

## Screens / Views

The clickable references:

### 1. Web app shell — `ui_kits/web_app/index.html`
- **Layout**: 240px Sidebar (left, fixed) + main column (TopBar / scroll area / CaptureBar). Main column is flex-1, min-width 0, vertical flex.
- **Default route**: `/matrix` showing the 2×2 grid (16px gap, 32px padding around).
- **Other routes** wired in the demo: `/inbox`, `/today` (DailyThree), `/week` (placeholder).
- **Dark mode toggle** in the TopBar — flips `dark` class on `<html>`. All tokens have dark counterparts in `colors_and_type.css`.

### 2. Marketing landing — `ui_kits/marketing/index.html`
- 1120px max-width container, 32px gutters.
- Sections in order: Nav → Hero → A matriz (4-card grid) → Ritmo (two-column) → Preço (centered card) → Footer.
- Hero peek panel renders a miniature matrix. Use the same component as the app, sized down — do not fork.

## Interactions & Behavior

- **Triage**: dragging a TaskItem from the inbox into a QuadrantCard sets the task's `q` field to that quadrant. Implement with HTML5 drag-and-drop or `@dnd-kit/core` — both fit the patterns shown in `MatrixView.jsx` / `QuadrantCard.jsx`.
- **Today's three**: the DailyThree pulls tasks by ID from a `dailyIds` array in app state. Ordering is meaningful — slot 1 / 2 / 3.
- **Streak**: the badge shows `streak` (a number). Increment when the user completes ≥1 task in a day; reset on a missed day. Visualisation logic is whatever the team designs — UI just renders the number.
- **Capture**: `CaptureBar` calls `onAdd(title)` on Enter. New tasks default to `q: null` (live in the inbox until triaged).
- **Animations**: 120–150ms transitions on hover state changes only. No entry animations, no parallax, no scroll-tied effects.
- **Focus states**: 2px outline at `--green` with 2px offset on every interactive element. Never remove `:focus-visible`.

## State Management

The prototype keeps everything in React component state. Production should hold:

```
tasks:    Task[]              // { id, title, q, due, done, createdAt }
dailyIds: string[]            // length 0..3, references tasks[].id
streak:   { count, lastDay }
ui:       { active, dark }
```

Persist `tasks` and `streak` server-side; `dailyIds` and `ui` can stay client-only (localStorage) for v1.

## Assets

- **Logos**: `assets/logo-mark.svg`, `assets/logo-wordmark.svg`, `assets/logo-wordmark-dark.svg`
- **PWA**: `assets/pwa-icon-512.svg`, `assets/pwa-splash.svg`
- **Fonts**: Google Fonts (Inter + Instrument Serif). Bundle locally for production:
  - `Inter-Regular.woff2`, `Inter-Medium.woff2`
  - `InstrumentSerif-Regular.woff2`, `InstrumentSerif-Italic.woff2`
- **Icons**: pulled from `lucide-static` CDN at runtime in the prototype. For production: install `lucide-react` and import named exports.

## Non-negotiables

- Two type families. No third typeface anywhere.
- Two Inter weights (400, 500). Never 600 or 700.
- Sentence case on all UI strings. No exclamation points. No emoji in product chrome.
- PT-BR is the primary copy locale. Second person ("você"). Strings shown in `ui_kits/marketing/index.html` are reference only — run through a copywriter before shipping.
- Quadrant identity is always **color + Inter letter (W / U / R / B)** — never mana symbols, never fantasy imagery. Customers are professionals, not players.
- Green is the only color that fills a button.

## Files in this bundle

```
design_handoff_scryven_design_system/
├── README.md                     ← you are here
└── design_files/
    ├── README.md                 ← original project README (brand context)
    ├── SKILL.md                  ← Claude Code Agent Skills entrypoint
    ├── colors_and_type.css       ← token source of truth
    ├── tailwind.config.js        ← Tailwind mirror
    ├── assets/                   ← logo, wordmark, PWA icons
    ├── preview/                  ← small specimen cards (review tab)
    └── ui_kits/
        ├── web_app/              ← React component prototypes + index.html
        └── marketing/            ← landing page (single index.html)
```

## How to load this in Claude Code

`SKILL.md` is the entrypoint. Drop the entire `design_files/` folder into the repo (e.g. at `.claude/skills/scryven-design/`) and Claude Code will auto-load it as a project skill. From then on, asking "implement the matrix view" will pick up the tokens, components, and constraints automatically.

If the team prefers to keep the design system out of the runtime bundle, mount it read-only at build time — the components are reference shapes, not runtime dependencies.
