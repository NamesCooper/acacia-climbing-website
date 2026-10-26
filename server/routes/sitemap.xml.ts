// The sitemap Google reads at /sitemap.xml. It's built into the static site like a page
// (it's in the prerender list in nuxt.config.ts), so it exists whatever command builds the site.
// Studio pages come from Sanity; if Sanity can't be reached, the saved copy is used instead.
import savedPages from '~/public/data/pages.json'
import savedCrags from '~/public/data/crags.json'

const SITE = 'https://acaciaclimbing.org'
const FIXED = ['/', '/progress', '/updates']
const HIDDEN = new Set(['blocks'])

export default defineEventHandler(async (event) => {
  // When each page last changed, so Google can trust the dates and re-crawl only what changed.
  // (Stamping every page with today's date on every build teaches Google to ignore them.)
  const changed: Record<string, string> = {}
  let slugs: string[] = []
  try {
    const query = encodeURIComponent('*[_type == "page" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _updatedAt }')
    const res = await $fetch<{ result?: { slug: string; _updatedAt: string }[] }>(`https://qxrv033n.apicdn.sanity.io/v2025-10-01/data/query/production?query=${query}`)
    for (const p of res.result ?? []) {
      if (p.slug === 'home') changed['/'] = p._updatedAt
      else { slugs.push(p.slug); changed[`/${p.slug}`] = p._updatedAt }
    }
  } catch {
    slugs = (savedPages as any[]).map((p) => p.slug?.current).filter((s) => s && s !== 'home')
  }

  // Every crag has its own page at /crags/<id>
  let cragIds: string[] = []
  try {
    const query = encodeURIComponent('*[_type == "crag" && defined(slug.current) && !(_id in path("drafts.**"))]{ "id": slug.current, _updatedAt }')
    const res = await $fetch<{ result?: { id: string; _updatedAt: string }[] }>(`https://qxrv033n.apicdn.sanity.io/v2025-10-01/data/query/production?query=${query}`)
    for (const c of res.result ?? []) { cragIds.push(c.id); changed[`/crags/${c.id}`] = c._updatedAt }
  } catch {}
  if (!cragIds.length) {
    for (const c of savedCrags as { id: string; updatedAt?: string }[]) { cragIds.push(c.id); if (c.updatedAt) changed[`/crags/${c.id}`] = c.updatedAt }
  }

  const paths = Array.from(new Set([...FIXED, ...cragIds.map((id) => `/crags/${id}`), ...slugs.filter((s) => !HIDDEN.has(s)).map((s) => `/${s}`)])).sort()
  // Pages with no known date simply leave lastmod out, which is better than a made-up one
  const entry = (p: string) => (changed[p] ? `<lastmod>${changed[p].slice(0, 10)}</lastmod>` : '')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE}${p}</loc>${entry(p)}</url>`).join('\n')}
</urlset>
`
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
