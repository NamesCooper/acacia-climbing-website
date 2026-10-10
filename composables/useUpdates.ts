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

// Dated progress notes from the Studio. Empty until Sanity is connected.
export function useUpdates() {
  return useAsyncData<Update[]>('updates', async () => {
    const client = useSanity()
    return client ? client.fetch<Update[]>(UPDATES_QUERY) : []
  }, { default: () => [] })
}
