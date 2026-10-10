// One-off migration: turns the legacy JSON files in public/data into a Sanity import file.
// Usage (from /studio): npm run import-legacy
// Output: scripts/out/legacy.ndjson (one Sanity document per line)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'))

const crags = read('public/data/crags.json')
const milestones = read('public/data/milestones.json')
let areas = { features: [] }
try { areas = read('public/data/areas.geojson') } catch { /* optional */ }

const docs = crags.map((c) => {
  const area = areas.features.find((f) => f.properties?.crag_id === c.id)
  return {
    _id: `crag-${c.id}`,
    _type: 'crag',
    name: c.name,
    slug: { _type: 'slug', current: c.id },
    subtitle: c.subtitle,
    description: c.description,
    problems: c.problems,
    style: c.style,
    season: c.season,
    status: c.status,
    statusLabel: c.statusLabel,
    council: c.council,
    councilStatus: c.councilStatus,
    state: c.state,
    region: c.region,
    updatedAt: c.updatedAt,
    location: { _type: 'geopoint', lat: c.lat, lng: c.lng },
    areaGeoJson: area ? JSON.stringify(area.geometry) : undefined,
    milestones: milestones
      .filter((m) => m.crag_id === c.id)
      .map((m) => ({ _type: 'milestone', _key: randomUUID().slice(0, 12), text: m.text, status: m.status })),
  }
})

docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: 'Acacia Climbing Coalition · SEQ',
  description: 'A coalition of climbers securing formal access recognition across South East Queensland.',
})

mkdirSync(join(root, 'scripts/out'), { recursive: true })
writeFileSync(join(root, 'scripts/out/legacy.ndjson'), docs.map((d) => JSON.stringify(d)).join('\n') + '\n')
console.log(`Wrote ${docs.length} documents (${crags.length} crags, ${milestones.length} milestones) to scripts/out/legacy.ndjson`)
