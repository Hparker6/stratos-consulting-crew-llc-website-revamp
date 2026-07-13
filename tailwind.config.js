/** @type {import('tailwindcss').Config} */

/*
 * DESIGN TOKENS — the single source of truth for the Stratos visual language.
 *
 * The brand is unchanged: the same blue, the same green, the same dark navy
 * surfaces, the same warm off-white light section. What changed is that these
 * values now exist in exactly one place. Previously the palette was spread
 * across three parallel systems — Tailwind theme keys, CSS component classes,
 * and ~100 inline style objects that re-typed the same hex codes — so a colour
 * change meant a find-and-replace across 27 files, and you would miss one.
 *
 * Scales are deliberately built around the values already dominant in the UI, so
 * consolidation normalises the outliers without redesigning anything.
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Dark surfaces — lowest to highest elevation */
        bg: '#0a0f1c', // page background
        sunken: '#0d1526', // insets, dashboard chrome
        surface: '#101a2e', // default card / raised panel
        elevated: '#0c1a30', // tinted band sections
        footer: '#080c16', // deepest surface
        ring: '#0c182c', // gradient-ring card interior

        /* Brand */
        primary: '#2f8fff',
        secondary: '#27e0a0',
        focus: '#6cb6ff', // focus ring — brand blue lifted for AA on dark

        /* Text on dark */
        'text-base': '#eaf0fa',
        muted: '#a8b8cc',
        faint: '#7f8ba0', // ≥4.5:1 on all dark surfaces (WCAG AA)
        'btn-dark': '#04102a', // text on a primary-blue fill

        /* Light section (About) */
        light: '#f5f3ee',
        'light-ink': '#0a1628',
        'light-body': '#2d4a6b',
        'light-link': '#0d5cb0', // ≥4.5:1 on #f5f3ee (WCAG AA)

        /* Status */
        danger: '#f87171',
        warn: '#d97706',
        success: '#0fa96f',
      },

      fontFamily: {
        // Each stack falls back to a metric-matched face (see index.css) so the
        // webfont swap reflows nothing.
        heading: ['"Space Grotesk"', '"Space Grotesk Fallback"', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', '"Manrope Fallback"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"JetBrains Mono Fallback"', 'monospace'],
      },

      /*
       * TYPE SCALE. Headings are fluid (clamp) rather than stepping at a
       * breakpoint — the min/max endpoints are the sizes the site already used,
       * so nothing jumps, but the sizes in between now interpolate smoothly
       * instead of snapping at md:. Applied via the .t-* classes in index.css.
       */
      fontSize: {
        'body-lg': ['1.0625rem', { lineHeight: '1.7' }], // 17 — ledes
        body: ['1rem', { lineHeight: '1.65' }], // 16 — default prose
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }], // 15 — dense prose
        caption: ['0.875rem', { lineHeight: '1.55' }], // 14 — supporting
        label: ['0.8125rem', { lineHeight: '1.4' }], // 13 — eyebrow
        'label-sm': ['0.6875rem', { lineHeight: '1.4' }], // 11 — mono chips
        'label-xs': ['0.625rem', { lineHeight: '1.4' }], // 10 — mono column heads
      },

      /* Vertical rhythm — one section scale, three densities. */
      spacing: {
        'section-y': '4rem', // 64
        'section-y-lg': '5rem', // 80
      },

      borderRadius: {
        xs: '6px',
        sm: '8px',
        md: '10px', // buttons, inputs
        lg: '14px', // default card
        xl: '18px', // large card
        '2xl': '24px', // panels (contact, CTA band)
      },

      /* ELEVATION — one ladder. Ambient glows are separate from depth shadows. */
      boxShadow: {
        sm: '0 2px 8px rgba(0,0,0,0.2)',
        md: '0 8px 32px rgba(0,0,0,0.35)', // sticky header
        lg: '0 18px 44px rgba(0,0,0,0.45)', // card hover
        xl: '0 24px 60px rgba(0,0,0,0.4)', // dashboard chrome
        'glow-primary': '0 12px 30px rgba(47,143,255,0.4)', // primary button
        'glow-featured': '0 0 44px rgba(47,143,255,0.2)', // featured pricing card
        'glow-ambient': '0 0 100px rgba(47,143,255,0.08), 0 0 60px rgba(39,224,160,0.04)',
        'light-lift': '0 20px 60px rgba(10,22,40,0.15)', // headshot on light bg
      },

      /* MOTION — one rhythm. Mirrors the CSS custom properties in index.css. */
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)',
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        fast: '200ms',
        DEFAULT: '350ms',
        slow: '600ms',
      },

      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
