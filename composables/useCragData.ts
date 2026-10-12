// Single source for crag, milestone and area data.
//
// useAsyncData runs this once at build time (`nuxt generate`) and bakes the result
// into the static page, so visitors never wait on Sanity. When you publish in the
// Studio, a webhook rebuilds the site on Cloudflare Pages (see README).
//
// Until a Sanity project ID is configured it falls back to the legacy JSON in
// /public/data, so the site keeps working during the migration.

export interface Crag {
  id: string
  name: string
  subtitle?: string
  lat: number
  lng: number
  status: 'completed' | 'recognised' | 'progress' | 'scoping' | 'issue'
  statusLabel: string
  council: string
  councilStatus?: string
  description?: string
  problems?: string
  style?: string
  season?: string
  state: string
  region?: string
  updatedAt: string
  kayaUrl?: string
}

export interface Milestone {
  crag_id: string
  text: string
  status: 'done' | 'progress' | 'todo'
}

export interface CragData {
  crags: Crag[]
  milestones: Milestone[]
  areas: { type: 'FeatureCollection'; features: any[] }
}

const DEFAULT_LABELS: Record<string, string> = {
  completed: 'Access Secured',
  recognised: 'Council Recognised',
  progress: 'In Progress',
  scoping: 'Scoping',
  issue: 'Access issue',
}

async function fromSanity(): Promise<CragData | null> {
  const rows = await sanityFetch<any[]>('crags')
  if (!rows) return null
  return {
    crags: rows.map(({ milestones, areaGeoJson, ...c }) => ({
      ...c,
      statusLabel: c.statusLabel || DEFAULT_LABELS[c.status] || c.status,
    })),
    milestones: rows.flatMap((c) => (c.milestones ?? []).map((m: any) => ({ crag_id: c.id, ...m }))),
    areas: {
      type: 'FeatureCollection',
      features: rows
        .filter((c) => c.areaGeoJson)
        .map((c) => ({ type: 'Feature', properties: { crag_id: c.id }, geometry: JSON.parse(c.areaGeoJson) })),
    },
  }
}

// Imported (not fetched) so it works at build time as well as in the browser.
// Delete this function and /public/data once everything lives in Sanity.
async function fromLegacyJson(): Promise<CragData> {
  const [crags, milestones, areasRaw] = await Promise.all([
    import('~/public/data/crags.json').then((m) => m.default as Crag[]),
    import('~/public/data/milestones.json').then((m) => m.default as Milestone[]),
    import('~/public/data/areas.geojson?raw').then((m) => m.default as string),
  ])
  return { crags, milestones, areas: JSON.parse(areasRaw) }
}

// If Sanity can't be reached (or comes back empty) during a build, use the saved JSON
// rather than publishing a site with no crags on it. The build log will show the warning.
async function loadCragData(): Promise<CragData> {
  try {
    const live = await fromSanity()
    if (live && live.crags.length) return live
    if (live) console.warn('[crag-data] Sanity returned no crags, using saved JSON instead')
  } catch (err) {
    console.warn('[crag-data] Could not reach Sanity, using saved JSON instead:', err)
  }
  return fromLegacyJson()
}

export function useCragData() {
  return useAsyncData<CragData>('crag-data', loadCragData, {
    default: () => ({ crags: [], milestones: [], areas: { type: 'FeatureCollection', features: [] } }),
  })
}
