import { createClient } from '@sanity/client'
import { EDITABLE_QUERIES, QUERIES, type QueryName } from '../../utils/queries'

// Only exists on the preview site. Runs a named query with the private read key,
// so drafts show up and the key never reaches the browser.
// It only accepts names from utils/queries.ts, never raw queries.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { sanity } = config.public
  if (!sanity.preview || !config.sanityReadToken) {
    throw createError({ statusCode: 404 })
  }

  const { name, params } = await readBody<{ name: QueryName; params?: Record<string, unknown> }>(event)
  if (!(name in QUERIES)) throw createError({ statusCode: 400, statusMessage: 'Unknown query' })

  const client = createClient({
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    apiVersion: sanity.apiVersion,
    token: config.sanityReadToken,
    useCdn: false,
    perspective: 'drafts',
    stega: { enabled: EDITABLE_QUERIES.includes(name), studioUrl: sanity.studioUrl },
  })

  setHeader(event, 'cache-control', 'no-store')
  return await client.fetch(QUERIES[name], params ?? {})
})
