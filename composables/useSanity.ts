import { createClient, type SanityClient } from '@sanity/client'

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
