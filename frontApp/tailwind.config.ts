// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// module.exports = {
//   content: [
//     './pages/**/*.{vue,js,ts}',
//     './components/**/*.{vue,js,ts}',
//     './layouts/**/*.{vue,js,ts}',
//     './plugins/**/*.{js,ts}',
//     './nuxt.config.{js,ts}',
//   ],
//   theme: {
//     extend: {
//       animation: {
//         blink: 'blink 1s steps(2, start) infinite',
//       },
//       keyframes: {
//         blink: {
//           '0%, 100%': { opacity: 1 },
//           '50%': { opacity: 0 },
//         },
//       },
//     },
//   },
//   plugins: [],
// }

import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        pawAnimation: 'pawAnimation 2.05s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pawAnimation: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config