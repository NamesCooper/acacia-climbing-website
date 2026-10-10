export interface Update {
  slug: string
  title: string
  date: string
  summary: string
  body?: any[]
  crags?: { id: string; name: string }[]
}

const UPDATES_QUERY = /* groq */ `
*[_type == "update" && defined(slug.current)] | order(date desc) {
  "slug": slug.current, title, date, summary, body,
  "crags": crags[]->{ "id": slug.current, name }
}`

// Dated progress notes from the Studio, baked in at build time.
// If Sanity can't be reached during a build, the page shows its friendly empty state
// rather than failing the whole deploy.
export function useUpdates() {
  return useAsyncData<Update[]>('updates', async () => {
    const client = useSanity()
    if (!client) return []
    try {
      return await client.fetch<Update[]>(UPDATES_QUERY)
    } catch (err) {
      console.warn('[updates] Could not reach Sanity, showing no updates:', err)
      return []
    }
  }, { default: () => [] })
}
