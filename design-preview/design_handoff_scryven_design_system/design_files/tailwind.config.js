/**
 * Scryven — Tailwind preset
 * Mirrors colors_and_type.css. Use the CSS variables wherever you can
 * (e.g. `bg-[var(--surface)]`); these named tokens exist for legibility
 * in component code.
 */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        'var(--bg)',
        surface:   'var(--surface)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
        fg:        'var(--fg)',
        'fg-2':    'var(--fg-2)',
        'fg-muted':'var(--fg-muted)',
        'fg-disabled': 'var(--fg-disabled)',
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',

        green: {
          DEFAULT: 'var(--green)',
          fill:    'var(--green-fill)',
          border:  'var(--green-border)',
          text:    'var(--green-text)',
          700:     'var(--green-700)',
          800:     'var(--green-800)',
        },
        q1: { fill: 'var(--q1-fill)', border: 'var(--q1-border)', text: 'var(--q1-text)' },
        q2: { fill: 'var(--q2-fill)', border: 'var(--q2-border)', text: 'var(--q2-text)' },
        q3: { fill: 'var(--q3-fill)', border: 'var(--q3-border)', text: 'var(--q3-text)' },
        q4: { fill: 'var(--q4-fill)', border: 'var(--q4-border)', text: 'var(--q4-text)' },
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        display: ['28px', { lineHeight: '1.15', letterSpacing: '-0.005em', fontWeight: 400 }],
        heading: ['18px', { lineHeight: '1.35', letterSpacing: '0' }],
        body:    ['14px', { lineHeight: '1.5' }],
        label:   ['12px', { lineHeight: '1.35', fontWeight: 500 }],
        caption: ['11px', { lineHeight: '1.35' }],
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
      },
      spacing: {
        1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px',
        6: '24px', 8: '32px', 12: '48px', 16: '64px',
      },
      transitionTimingFunction: {
        quiet: 'cubic-bezier(0.2, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '120ms',
        DEFAULT: '150ms',
        slow: '220ms',
      },
    },
  },
  plugins: [],
};
