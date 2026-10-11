import { createClient, type SanityClient } from '@sanity/client'
import { QUERIES, type QueryName } from '~/utils/queries'

// A composable is just a function whose name starts with "use". Nuxt auto-imports
// anything in /composables, so any page can call useSanity() without an import line.
let client: SanityClient | null = null

export function useSanity() {
  const { sanity } = useRuntimeConfig().public
  if (!sanity.projectId) return null
  client ??= createClient({
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    apiVersion: sanity.apiVersion,
    useCdn: true,
  })
  return client
}

// Run one of the named queries in utils/queries.ts.
// On the live site this asks Sanity for published content directly.
// On the preview site it goes through our own server, which holds the private
// read key and returns drafts with click-to-edit markers.
export async function sanityFetch<T>(name: QueryName, params: Record<string, unknown> = {}): Promise<T | null> {
  const { sanity } = useRuntimeConfig().public
  if (sanity.preview) {
    return await $fetch<T>('/api/preview-query', { method: 'POST', body: { name, params } })
  }
  const c = useSanity()
  if (!c) return null
  return await c.fetch<T>(QUERIES[name], params)
}
