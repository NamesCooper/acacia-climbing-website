// Pages built in the Studio ("Page" type). Fetched at build time and baked in,
// the same way crags and updates are.

export interface SanityPage {
  title: string
  slug: string
  seoDescription?: string
  eyebrow?: string
  heading: string
  lede?: string
  sections: Array<{ _key: string; _type: string; [field: string]: any }>
}

const PAGE_QUERY = /* groq */ `
*[_type == "page" && slug.current == $slug][0] {
  title, "slug": slug.current, seoDescription, eyebrow, heading, lede,
  "sections": coalesce(sections, [])
}`

export function usePage(slug: string) {
  return useAsyncData<SanityPage | null>(`page:${slug}`, async () => {
    const client = useSanity()
    if (!client) return null
    try {
      return await client.fetch<SanityPage | null>(PAGE_QUERY, { slug })
    } catch (err) {
      console.warn(`[page] Could not reach Sanity for "${slug}":`, err)
      return null
    }
  })
}

// Headings in the Studio mark the italic bit with *asterisks*, e.g. "Every bit *helps*".
// SitePageHeader wants that as { title: "Every bit", accent: "helps" }.
export function splitHeading(heading = '') {
  const m = heading.match(/^(.*?)\s*\*([^*]+)\*\s*$/)
  return m ? { title: m[1], accent: m[2] } : { title: heading.replaceAll('*', ''), accent: undefined }
}

// Rich text from the Studio, flattened to plain paragraphs for the section components.
export function blocksToParagraphs(blocks: any[] = []) {
  return blocks
    .filter((b) => b?._type === 'block')
    .map((b) => (b.children ?? []).map((c: any) => c.text).join(''))
    .filter(Boolean)
}
