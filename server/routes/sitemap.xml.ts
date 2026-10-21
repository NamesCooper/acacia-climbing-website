// The sitemap Google reads at /sitemap.xml. It's built into the static site like a page
// (it's in the prerender list in nuxt.config.ts), so it exists whatever command builds the site.
// Studio pages come from Sanity; if Sanity can't be reached, the saved copy is used instead.
import savedPages from '~/public/data/pages.json'
import savedCrags from '~/public/data/crags.json'

const SITE = 'https://acaciaclimbing.org'
const FIXED = ['/', '/progress/', '/updates/']
const HIDDEN = new Set(['blocks'])

export default defineEventHandler(async (event) => {
  let slugs: string[] = []
  try {
    const query = encodeURIComponent('*[_type == "page" && defined(slug.current) && slug.current != "home"].slug.current')
    const res = await $fetch<{ result?: string[] }>(`https://qxrv033n.apicdn.sanity.io/v2025-10-01/data/query/production?query=${query}`)
    slugs = res.result ?? []
  } catch {
    slugs = (savedPages as any[]).map((p) => p.slug?.current).filter((s) => s && s !== 'home')
  }

  // Every crag has its own page at /crags/<id>
  let cragIds: string[] = []
  try {
    const query = encodeURIComponent('*[_type == "crag" && defined(slug.current)].slug.current')
    const res = await $fetch<{ result?: string[] }>(`https://qxrv033n.apicdn.sanity.io/v2025-10-01/data/query/production?query=${query}`)
    cragIds = res.result ?? []
  } catch {}
  if (!cragIds.length) cragIds = (savedCrags as { id: string }[]).map((c) => c.id)

  const paths = Array.from(new Set([...FIXED, ...cragIds.map((id) => `/crags/${id}/`), ...slugs.filter((s) => !HIDDEN.has(s)).map((s) => `/${s}/`)])).sort()
  const today = new Date().toISOString().slice(0, 10)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
