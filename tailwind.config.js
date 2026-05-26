/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Frozen Lagoon design tokens */
        ink:    'var(--ink)',
        deep:   'var(--deep)',
        steel:  'var(--steel)',
        slate:  'var(--slate)',
        glass:  'var(--glass)',
        frost:  'var(--frost)',
        ice:    'var(--ice)',
        aurora: 'var(--aurora)',
        mist:   'var(--mist)',
        haze:   'var(--haze)',
        /* Legacy tokens kept for backwards compatibility */
        'primary-black': '#000000',
        'primary-white': '#FFFFFF',
        'azul-premium': '#ADC9FF',
        'accent-purple': '#9932CC',
        'error': '#FCA5A5',
        border: 'rgba(255, 255, 255, 0.1)',
        input: 'rgba(255, 255, 255, 0.1)',
        ring: '#ADC9FF',
        background: '#000000',
        foreground: '#FFFFFF',
        primary: '#ADC9FF',
        'primary-foreground': '#000000',
        secondary: '#9932CC',
        'secondary-foreground': '#FFFFFF',
        destructive: '#FF6B6B',
        'destructive-foreground': '#FFFFFF',
        accent: '#9932CC',
        'accent-foreground': '#FFFFFF',
        popover: '#1a1a1a',
        'popover-foreground': '#FFFFFF',
        card: '#000000',
        'card-foreground': '#FFFFFF',
        cyan: {
          400: '#ADC9FF',
          500: '#ADC9FF',
          950: '#ADC9FF',
        },
        purple: {
          400: '#9932CC',
          500: '#9932CC',
          950: '#9932CC',
        },
        violet: {
          400: '#9932CC',
        },
      },
      fontFamily: {
        sans:    ['var(--font-jakarta)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['var(--font-jakarta)', 'sans-serif'],
        mono:    ['"DM Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        /* Legacy aliases kept for backwards compatibility */
        syne: ['var(--font-jakarta)', 'system-ui', '-apple-system', 'sans-serif'],
        sora: ['var(--font-jakarta)', 'system-ui', '-apple-system', 'sans-serif'],
        inter: ['var(--font-jakarta)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0' }],
        '2xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '1.6', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '1.6', letterSpacing: '-0.05em' }],
        '5xl': ['3rem', { lineHeight: '1.6', letterSpacing: '-0.05em' }],
        '6xl': ['3.75rem', { lineHeight: '1.6', letterSpacing: '-0.075em' }],
      },
      lineHeight: {
        heading:  '1.1',
        snug:     '1.2',
        normal:   '1.5',
        relaxed:  '1.6',
        /* Legacy */
        'tight':  '1.25',
        'loose':  '2',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight:   '-0.02em',
        normal:  '0em',
        wide:    '0.05em',
        wider:   '0.08em',
        widest:  '0.1em',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#FFFFFF',
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: '1rem',
            lineHeight: '1.6',
            letterSpacing: '0',
            wordSpacing: '0.05em',
            h1: {
              color: '#FFFFFF',
              fontFamily: 'Syne, system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.875rem, 4.5vw, 4rem)',
              lineHeight: '1.25',
              letterSpacing: '0.025em',
              marginBottom: '1rem',
            },
            h2: {
              color: '#FFFFFF',
              fontFamily: 'Syne, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              lineHeight: '1.6',
              letterSpacing: '0.025em',
              marginBottom: '0.875rem',
            },
            h3: {
              color: '#FFFFFF',
              fontFamily: 'Syne, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              lineHeight: '1.6',
              letterSpacing: '0.025em',
              marginBottom: '0.75rem',
            },
            h4: {
              color: '#FFFFFF',
              fontFamily: 'Syne, system-ui, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: '1.6',
              letterSpacing: '0.025em',
              marginBottom: '0.625rem',
            },
            p: {
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: '1.6',
              marginBottom: '1rem',
              letterSpacing: '0',
              wordSpacing: '0.05em',
              orphans: 2,
              widows: 2,
            },
            li: {
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: '1.6',
              marginBottom: '0.5rem',
            },
            strong: {
              color: '#FFFFFF',
              fontFamily: 'Syne, system-ui, sans-serif',
              fontWeight: 600,
            },
            a: {
              color: '#ADC9FF',
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: '#9BB8FF',
                textDecorationThickness: '2px',
              },
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.6',
            h1: {
              fontSize: 'clamp(2.25rem, 5vw, 5rem)',
            },
            h2: {
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            },
            h3: {
              fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
            },
            h4: {
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            },
          },
        },
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '30': '7.5rem',   // 120px
        '20': '5rem',     // 80px
        '15': '3.75rem',  // 60px
        '10': '2.5rem',   // 40px
        '8': '2rem',      // 32px
        '6': '1.5rem',    // 24px
      },
      maxWidth: {
        'container': '1200px',
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};