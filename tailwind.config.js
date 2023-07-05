const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    enabled: true,
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,css,pcss,styl}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        back: {
          DEFAULT: '#F6F6F6',
          light: '#F5F5FA',
        },
        brand: {
          DEFAULT: '#5E81F4',
          dark: '#1C1D21',
          light: '#8181A5',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.cool': {
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(245, 245, 250, 0.7)',
          },

          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(129, 129, 165, 0.7)',
            borderRadius: '20px',
            border: '3px solid transparent',
          },
        },
      })
      addUtilities({
        '.mobileScreenWrapper': {
          position: 'absolute',
          left: '0px',
          top: '48px',
          width: '100vw',
          height: 'calc(100vh - 64px - 48px)',
          maxWidth: '100vw',
        },
      })
      addUtilities({
        '.laptopScreenWrapper': {
          position: 'absolute',
          left: '86px',
          top: '0',
          width: '100vw',
          // height: 'calc(100vh - 64px - 48px)',
          maxWidth: 'calc(100vw - 86px)',
        },
      })
    }),
  ],
}
