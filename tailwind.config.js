/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Shift-Dark Theme - Background */
        bg: {
          primary: '#0d1117',      // Main background
          secondary: '#161b22',    // Card/Panel background
          tertiary: '#21262d',     // Hover states
        },
        /* Shift-Dark Theme - Borders */
        border: {
          DEFAULT: '#30363d',      // Borders
          subtle: '#21262d',       // Subtle borders
        },
        /* Shift-Dark Theme - Accent */
        accent: {
          DEFAULT: '#1e40af',      // Primary accent (blue)
          hover: '#1d4ed8',        // Hover state
        },
        /* Shift-Dark Theme - Status Colors (DevOps-style) */
        success: '#10b981',        // Emerald - operational
        warning: '#f59e0b',        // Amber - degraded
        error: '#ef4444',          // Red - critical
        info: '#3b82f6',           // Blue - informational
        /* Shift-Dark Theme - Text */
        text: {
          primary: '#f0f6fc',      // Primary text
          secondary: '#8b949e',    // Secondary text
          muted: '#6e7681',        // Muted text
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
      },
      spacing: {
        // 4px grid base
        0.5: '0.125rem',   // 2px
        1: '0.25rem',      // 4px
        1.5: '0.375rem',   // 6px
        2: '0.5rem',       // 8px
        2.5: '0.625rem',   // 10px
        3: '0.75rem',      // 12px
        3.5: '0.875rem',   // 14px
        4: '1rem',         // 16px
        5: '1.25rem',      // 20px
        6: '1.5rem',       // 24px
        7: '1.75rem',      // 28px
        8: '2rem',         // 32px
        9: '2.25rem',      // 36px
        10: '2.5rem',      // 40px
        11: '2.75rem',     // 44px
        12: '3rem',        // 48px
        14: '3.5rem',      // 56px
        16: '4rem',        // 64px
        20: '5rem',        // 80px
        24: '6rem',        // 96px
      },
      transitionDuration: {
        DEFAULT: '150ms',
        150: '150ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
      },
    },
  },
  plugins: [],
}
