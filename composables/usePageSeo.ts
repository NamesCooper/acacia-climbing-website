// Sets a page's Google and link-preview details in one go: the title and description
// Google shows, and the picture, title and text that appear when someone shares the
// link (Facebook, Instagram DMs, iMessage, Slack, email).
// Pages without their own share picture use the site-wide one in public/og.png.
import { sanityImageUrl } from '~/composables/sanityImage'

export const SITE_URL = 'https://acaciaclimbing.org'

export function usePageSeo(opts: {
  title: () => string
  description: () => string | undefined
  image?: () => any
}) {
  const image = () => {
    const own = opts.image?.()
    return (own && sanityImageUrl(own, 1200)) || `${SITE_URL}/og.png`
  }
  useSeoMeta({
    title: opts.title,
    description: () => opts.description() ?? '',
    ogTitle: opts.title,
    ogDescription: () => opts.description() ?? '',
    ogImage: image,
    twitterTitle: opts.title,
    twitterDescription: () => opts.description() ?? '',
    twitterImage: image,
  })
}
