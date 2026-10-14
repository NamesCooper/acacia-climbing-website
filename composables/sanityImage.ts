import { createImageUrlBuilder } from '@sanity/image-url'

// Turns a photo from the Studio into a sized, compressed link on Sanity's image CDN.
// It respects the crop and focal point set in the Studio.
export function sanityImageUrl(source: any, width = 1200): string | undefined {
  if (!source?.asset) return undefined
  const { sanity } = useRuntimeConfig().public
  const builder = createImageUrlBuilder({ projectId: sanity.projectId, dataset: sanity.dataset }).image(source)
  // SVG logos are served untouched (no sizing), so they stay crisp at any size
  if (String(source.asset._ref ?? '').endsWith('-svg')) return builder.url()
  return builder
    .width(width)
    .fit('max')
    .auto('format')
    .url()
}
