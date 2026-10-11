import { defineDocuments, defineLocations, presentationTool } from 'sanity/presentation'

// The "Presentation" tab: the preview site on the right, click any text to edit it.
// The preview site is a second Cloudflare worker built with `pnpm build:preview`.
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://acaciaclimbing-preview.cooper-flick.workers.dev'

export const presentation = presentationTool({
  title: 'Visual editor',
  previewUrl: { origin: previewOrigin, preview: '/' },
  resolve: {
    // When the preview is on /something, open the Page with that slug
    mainDocuments: defineDocuments([
      { route: '/:slug', filter: `_type == "page" && slug.current == $slug` },
    ]),
    // From a document, show where it appears on the site
    locations: {
      page: defineLocations({
        select: { title: 'title', slug: 'slug.current' },
        resolve: (doc) => ({
          locations: doc?.slug ? [{ title: doc.title || 'Page', href: doc.slug === 'home' ? '/' : `/${doc.slug}` }] : [],
        }),
      }),
      crag: defineLocations({
        locations: [
          { title: 'Crag map', href: '/progress' },
          { title: 'Homepage', href: '/' },
        ],
      }),
      update: defineLocations({ locations: [{ title: 'Updates', href: '/updates' }] }),
    },
  },
})
