/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Shared Neutrals
        paper: '#F9FAFB',
        surface: '#FFFFFF',
        ink: '#111827',
        slate: '#6B7280',
        border: '#E5E7EB',

        // Theme A: Konnichiwa Japan (Crimson & Ink)
        primary: {
          50: '#FEF2F2',
          500: '#DC2626',
          700: '#991B1B',
        },
        secondary: {
          500: '#1F2937',
        },
        accent: {
          500: '#FEF2F2',
        },

        // Semantic Colors
        success: '#059669',
        warning: '#D97706',
        error: '#E11D48',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        display: ['96px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        hero: ['64px', { lineHeight: '1.1' }],
        h2: ['48px', { lineHeight: '1.2' }],
        h3: ['32px', { lineHeight: '1.3' }],
        bodyLarge: ['20px', { lineHeight: '1.6' }],
        bodyBase: ['16px', { lineHeight: '1.6' }],
        caption: ['14px', { lineHeight: '1.4', letterSpacing: '0.1em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        'xl': '12px',
        'pill': '100px',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        cardHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'scale-zoom': 'scaleZoom 10s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}