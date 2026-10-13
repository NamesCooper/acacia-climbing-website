// Runs after `nuxt generate` (see "build" in package.json). Lists every built page in
// .output/public/sitemap.xml and points robots.txt at it, so Google finds every page,
// including new ones made in the Studio. Skips the hidden block gallery.
import { readdirSync, statSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const SITE = 'https://acaciaclimbing.org'
const OUT = '.output/public'
const SKIP = new Set(['/blocks/'])

function pages(dir) {
  const found = []
  for (const name of readdirSync(dir)) {
    if (name.startsWith('_') || name === 'data' || name === 'brand') continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) found.push(...pages(full))
    else if (name === 'index.html') found.push('/' + relative(OUT, dir).split('\\').join('/'))
  }
  return found
}

const today = new Date().toISOString().slice(0, 10)
const urls = pages(OUT)
  .map((p) => (p === '/' ? '/' : p.replace(/\/?$/, '/')))
  .filter((p) => !SKIP.has(p))
  .sort()

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(join(OUT, 'sitemap.xml'), xml)

const robotsPath = join(OUT, 'robots.txt')
const robots = existsSync(robotsPath) ? readFileSync(robotsPath, 'utf8') : 'User-Agent: *\nDisallow:\n'
if (!robots.includes('Sitemap:')) writeFileSync(robotsPath, robots.trimEnd() + `\n\nSitemap: ${SITE}/sitemap.xml\n`)

console.log(`[sitemap] ${urls.length} pages listed`)
