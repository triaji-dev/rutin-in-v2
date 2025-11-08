import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        background: '#121212',
        foreground: '#e0e0e0',

        // Zinc color scale
        zinc: {
          200: '#e0e0e0',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#121212',
        },

        // Custom semantic colors
        card: {
          DEFAULT: 'rgba(38, 38, 38, 0.7)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        text: {
          primary: '#e0e0e0',
          secondary: '#a1a1aa',
          muted: '#71717a',
        },
        hover: {
          DEFAULT: '#3f3f46',
        },

        // Action colors
        delete: {
          DEFAULT: '#ef4444',
          hover: '#dc2626',
        },
        select: {
          DEFAULT: '#3b82f6',
        },
        success: {
          DEFAULT: '#16a34a',
        },

        // Habit theme colors
        green: {
          DEFAULT: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        blue: {
          DEFAULT: '#3b82f6',
          500: '#3b82f6',
          600: '#2563eb',
        },
        purple: {
          DEFAULT: '#a855f7',
          500: '#a855f7',
          600: '#9333ea',
        },
        pink: {
          DEFAULT: '#ec4899',
          500: '#ec4899',
          600: '#db2777',
        },
        orange: {
          DEFAULT: '#f97316',
          500: '#f97316',
          600: '#ea580c',
        },
        yellow: {
          DEFAULT: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        teal: {
          DEFAULT: '#14b8a6',
          500: '#14b8a6',
          600: '#0d9488',
        },
        red: {
          DEFAULT: '#ef4444',
          500: '#ef4444',
          600: '#dc2626',
        },
        indigo: {
          DEFAULT: '#6366f1',
          500: '#6366f1',
          600: '#4f46e5',
        },
        gray: {
          DEFAULT: '#9ca3af',
          500: '#9ca3af',
          600: '#6b7280',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'Inter',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backdropBlur: {
        card: '15px',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        modal:
          '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
};

export default config;
