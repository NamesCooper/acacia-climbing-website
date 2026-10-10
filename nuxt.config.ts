import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  // Public values available in the browser and at build time.
  // Override with NUXT_PUBLIC_SANITY_PROJECT_ID etc. in .env locally and in Cloudflare Pages settings.
  runtimeConfig: {
    public: {
      sanity: {
        projectId: '',
        dataset: 'production',
        apiVersion: '2025-10-01',
      },
    },
  },

  // `nuxt generate` crawls every internal link and writes static HTML to .output/public,
  // which is what Cloudflare Pages serves.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/updates'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en-AU' },
      title: 'Acacia Climbing Coalition · SEQ',
      meta: [
        { name: 'description', content: 'A coalition of climbers securing formal access recognition across South East Queensland.' },
        { name: 'viewport', content: 'width=1440' },
      ],
    },
  },
})
