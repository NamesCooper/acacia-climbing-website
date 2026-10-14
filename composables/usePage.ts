// Pages built in the Studio ("Page" type). Fetched at build time and baked in,
// the same way crags and updates are.

export interface SanityPage {
  title: string
  slug: string
  seoDescription?: string
  shareImage?: any
  eyebrow?: string
  headerLogo?: any
  heading: string
  lede?: string
  showHelpBand?: boolean
  sections: Array<{ _key: string; _type: string; [field: string]: any }>
}

export function usePage(slug: string) {
  return useAsyncData<SanityPage | null>(`page:${slug}`, async () => {
    try {
      return await sanityFetch<SanityPage>('page', { slug })
    } catch (err) {
      // Sanity unreachable during a build: use the saved copy rather than publish a blank page.
      // (A page that's genuinely gone from Sanity still 404s, because that's not an error.)
      console.warn(`[page] Could not reach Sanity for "${slug}", using saved copy:`, err)
      const saved = await import('~/public/data/pages.json').then((m) => m.default as any[])
      const p = saved.find((d) => d.slug?.current === slug)
      return p ? { ...p, slug } : null
    }
  })
}

// Headings in the Studio mark the italic bit with *asterisks*, e.g. "Every bit *helps*".
// SitePageHeader wants that as { title: "Every bit", accent: "helps" }.
// In preview, text carries invisible click-to-edit markers at the end, so set those
// aside while splitting and stick them back on.
export function splitHeading(heading = '') {
  const marker = heading.match(/[\u200b-\u200d\u2060-\u2064\ufeff]+$/)?.[0] ?? ''
  const text = heading.slice(0, heading.length - marker.length)
  const m = text.match(/^(.*?)\s*\*([^*]+)\*\s*$/)
  return m ? { title: m[1] + marker, accent: m[2] } : { title: text.replaceAll('*', '') + marker, accent: undefined }
}

// Rich text from the Studio, flattened to plain paragraphs for the section components.
export function blocksToParagraphs(blocks: any[] = []) {
  return blocks
    .filter((b) => b?._type === 'block')
    .map((b) => (b.children ?? []).map((c: any) => c.text).join(''))
    .filter(Boolean)
}
