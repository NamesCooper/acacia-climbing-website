import { stegaClean } from '@sanity/client/stega'

// Navigation, footer and the "Got an hour?" band, edited in the Studio sidebar.
// Every component that calls this shares one fetch (same key), baked in at build time.

export interface ChromeLink { _key?: string; label: string; link: string }
export interface SiteChrome {
  nav: { menu?: (Partial<ChromeLink> & { label: string; children?: ChromeLink[] })[]; links?: ChromeLink[]; buttonLabel?: string; buttonLink?: string } | null
  footer: { tagline?: string; columns?: { _key?: string; heading: string; links?: ChromeLink[] }[]; smallPrint?: string; smallPrintRight?: string } | null
  helpBand: { heading?: string; accent?: string; intro?: string; pills?: (ChromeLink & { colour?: string })[]; linkLabel?: string; linkHref?: string } | null
  /** Studio pages with the "Got an hour?" switch turned off */
  noHelpPages?: string[]
}

async function fromSaved(): Promise<SiteChrome> {
  const docs = await import('~/public/data/chrome.json').then((m) => m.default as any[])
  const byId = (id: string) => docs.find((d) => d._id === id) ?? null
  const pages = await import('~/public/data/pages.json').then((m) => m.default as any[])
  const noHelpPages = pages.filter((p) => p.showHelpBand === false).map((p) => p.slug.current)
  return { nav: byId('navigation'), footer: byId('footer'), helpBand: byId('helpBand'), noHelpPages }
}

export function useSiteChrome() {
  return useAsyncData<SiteChrome>('site-chrome', async () => {
    try {
      const live = await sanityFetch<SiteChrome>('chrome')
      // Fill any missing piece from the saved copy, so the site never loses its nav or footer
      const saved = await fromSaved()
      return {
        nav: live?.nav ?? saved.nav,
        footer: live?.footer ?? saved.footer,
        helpBand: live?.helpBand ?? saved.helpBand,
        noHelpPages: (live?.noHelpPages ?? saved.noHelpPages ?? []).map((s) => stegaClean(s)),
      }
    } catch (err) {
      console.warn('[chrome] Could not reach Sanity, using saved nav and footer:', err)
      return fromSaved()
    }
  })
}

// A link from the Studio: "/..." stays inside the site, anything else (mailto:, https:) is a normal link.
// stegaClean strips the visual editor's invisible markers so the address works.
export function chromeLink(link?: string) {
  const l = stegaClean(link ?? '')
  if (l.startsWith('/')) return { to: l }
  // Other websites (e.g. Instagram) open in a new tab so people don't lose their place here
  return /^https?:/.test(l) ? { href: l, target: '_blank', rel: 'noopener' } : { href: l }
}
