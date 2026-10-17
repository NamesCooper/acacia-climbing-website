import tailwindcss from '@tailwindcss/vite'

// The same code builds two sites:
//  - the live site (default): plain static pages, published content only
//  - the preview site (`pnpm build:preview`): a small server on Cloudflare that shows
//    drafts and click-to-edit overlays inside the Studio's Presentation tab
const preview = process.env.NUXT_PUBLIC_SANITY_PREVIEW === 'true'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  // Click-to-edit overlays are heavy, so only the preview site loads them
  plugins: preview ? ['~/preview/visual-editing.client.ts'] : [],
  vite: {
    plugins: [tailwindcss()],
  },

  // Public values available in the browser and at build time.
  // Override with NUXT_PUBLIC_SANITY_PROJECT_ID etc. in a local .env if needed.
  runtimeConfig: {
    // Private: only on the preview server. Set as a secret in Cloudflare (NUXT_SANITY_READ_TOKEN).
    sanityReadToken: '',
    public: {
      sanity: {
        projectId: 'qxrv033n',
        dataset: 'production',
        apiVersion: '2025-10-01',
        preview,
        studioUrl: 'https://acaciaclimbing.sanity.studio',
      },
      // Free CARTO map-tile key. Set NUXT_PUBLIC_CARTO_KEY in Cloudflare's build variables.
      // (Tile keys are visible in the browser by design; lock it to your domains in CARTO's dashboard.)
      cartoKey: '',
      // Cloudflare Web Analytics token (cookie-free visitor counts). Set NUXT_PUBLIC_CF_BEACON in
      // Cloudflare's build variables; until then no analytics script is added. Public by design.
      cfBeacon: '',
    },
  },

  // Always build plain static pages, even on Cloudflare (which would otherwise
  // auto-pick its server preset). Content from Sanity is baked in at build time,
  // and wrangler.jsonc serves the .output/public folder.
  nitro: preview
    ? { preset: 'cloudflare_module' }
    : {
        preset: 'static',
        prerender: {
          crawlLinks: true,
          routes: ['/', '/progress', '/updates', '/about', '/get-involved', '/privacy', '/blocks', '/work-with-us', '/work-with-us/councils', '/work-with-us/gyms', '/work-with-us/support', '/contact', '/guidebooks', '/sitemap.xml'],
        },
      },

  // Pages built in the Studio aren't linked from anywhere yet, so the crawler
  // wouldn't find them. Ask Sanity for every page slug and bake each one in.
  hooks: {
    async 'nitro:config'(config) {
      if (preview) return
      try {
        const query = encodeURIComponent('*[_type == "page" && defined(slug.current) && slug.current != "home"].slug.current')
        const res = await fetch(`https://qxrv033n.apicdn.sanity.io/v2025-10-01/data/query/production?query=${query}`)
        const { result = [] } = (await res.json()) as { result?: string[] }
        config.prerender ??= {}
        config.prerender.routes = [...(config.prerender.routes ?? []), ...result.map((s) => `/${s}`)]
        console.log(`[pages] Prerendering ${result.length} Studio page(s)`)
      } catch (err) {
        console.warn('[pages] Could not fetch Studio pages, skipping them this build:', err)
      }
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
        // Keep the preview site out of Google
        ...(preview ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
      ],
      link: [
        // Favicon: bold "a" with a wattle dot on forest (the sprig is unreadable at tab size)
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // Start the three fonts every page needs straight away, before the CSS asks for them
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/fraunces-900-italic.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/bricolage-grotesque-700-800.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/dm-sans-400-700.woff2', crossorigin: '' },
      ],
    },
  },
})
