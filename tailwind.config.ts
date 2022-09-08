import colors from 'tailwindcss/colors'

export default {
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
  attributify: true,
  extract: {
    include: ['./components/**/*.{vue,js}', './composables/**/*.{js,ts}', './pages/**/*.vue', './plugins/**/*.{js,ts}', './app.vue'],
  },
  theme: {
    extend: {
      colors: {
        primary: colors.zinc,
      },
      zIndex: {
        '-1': '-1',
      },
      screens: {
        sm: '480px',
        // => @media (min-width: 480px) { ... }
        md: '768px',
        // => @media (min-width: 768px) { ... }
        lg: '976px',
        // => @media (min-width: 976px) { ... }
        xl: '1440px',
        // => @media (min-width: 1440px) { ... }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'inherit',
              opacity: 0.75,
              fontWeight: '500',
              textDecoration: 'inherit',
              '&:hover': {
                opacity: 1,
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
          },
        },
      },
    },
  },
}
