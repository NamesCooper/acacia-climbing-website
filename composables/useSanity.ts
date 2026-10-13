import type { SanityClient } from '@sanity/client'
import { QUERIES, type QueryName } from '~/utils/queries'

// A composable is just a function whose name starts with "use". Nuxt auto-imports
// anything in /composables, so any page can call useSanity() without an import line.
//
// The Sanity client is loaded with import() only when a fetch actually runs. Content is baked
// in at build time, so visitors almost never need it, and this keeps about 140 KB of
// JavaScript out of every page load.
let client: SanityClient | null = null

export async function useSanity() {
  const { sanity } = useRuntimeConfig().public
  if (!sanity.projectId) return null
  if (!client) {
    const { createClient } = await import('@sanity/client')
    client = createClient({
      projectId: sanity.projectId,
      dataset: sanity.dataset,
      apiVersion: sanity.apiVersion,
      useCdn: true,
    })
  }
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
  const c = await useSanity()
  if (!c) return null
  return await c.fetch<T>(QUERIES[name], params)
}
