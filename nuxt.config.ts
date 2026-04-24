import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: 'Acacia Climbing Coalition · SEQ',
      meta: [
        { name: 'description', content: 'A coalition of climbers securing formal access recognition across South East Queensland.' },
        { name: 'viewport', content: 'width=1440' },
      ],
    },
  },
})
