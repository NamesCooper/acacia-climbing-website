export interface Update {
  slug: string
  title: string
  date: string
  summary: string
  body?: any[]
  crags?: { id: string; name: string }[]
}

// Dated progress notes from the Studio, baked in at build time.
// If Sanity can't be reached during a build, the page shows its friendly empty state
// rather than failing the whole deploy.
export function useUpdates() {
  return useAsyncData<Update[]>('updates', async () => {
    try {
      return (await sanityFetch<Update[]>('updates')) ?? []
    } catch (err) {
      console.warn('[updates] Could not reach Sanity, showing no updates:', err)
      return []
    }
  }, { default: () => [] })
}
