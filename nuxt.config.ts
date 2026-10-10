import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  // Public values available in the browser and at build time.
  // Override with NUXT_PUBLIC_SANITY_PROJECT_ID etc. in a local .env if needed.
  runtimeConfig: {
    public: {
      sanity: {
        projectId: 'qxrv033n',
        dataset: 'production',
        apiVersion: '2025-10-01',
      },
    },
  },

  // Always build plain static pages, even on Cloudflare (which would otherwise
  // auto-pick its server preset). Content from Sanity is baked in at build time,
  // and wrangler.jsonc serves the .output/public folder.
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/progress', '/updates', '/about', '/get-involved', '/privacy'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en-AU' },
      title: 'Acacia Climbing Coalition',
      meta: [
        { name: 'description', content: "Climbers working with councils so Australia's bouldering spots get recognised, mapped and looked after. Starting in South East Queensland." },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#203022' },
        { property: 'og:site_name', content: 'Acacia Climbing Coalition' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/brand/sprig-gold.png' }],
    },
  },
})
