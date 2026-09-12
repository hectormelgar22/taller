/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0D0F',
          900: '#0B0D0F',
          800: '#121519',
          700: '#181C20',
          600: '#1F242A',
          line: '#262C33',
        },
        paper: {
          DEFAULT: '#F4F4F1',
          dim: '#E7E7E1',
          line: '#D5D5CD',
        },
        chalk: '#F5F5F2',
        mute: '#A8ADB2',
        'mute-ink': '#5A6068',
        accent: {
          DEFAULT: '#FF5A1F',
          hi: '#FF7A45',
          deep: '#D8430D',
          ink: '#C43E0B',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Manrope Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.055em',
        display: '-0.04em',
      },
      maxWidth: { shell: '96rem' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        brief: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      boxShadow: {
        lift: '0 24px 60px -20px rgba(0,0,0,0.65), 0 8px 20px -12px rgba(0,0,0,0.5)',
        plate: '0 30px 80px -28px rgba(0,0,0,0.55)',
        glow: '0 18px 44px -18px rgba(255,90,31,0.55)',
      },
      keyframes: {
        sweep: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.25' } },
      },
      animation: {
        sweep: 'sweep 2.4s cubic-bezier(0.16,1,0.3,1) infinite',
        blink: 'blink 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
