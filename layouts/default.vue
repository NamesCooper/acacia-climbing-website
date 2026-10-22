<template>
  <div class="overflow-x-hidden">
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:bg-wattle focus:px-4 focus:py-2 focus:rounded-full focus:border-[3px] focus:border-outline">Skip to content</a>
    <SiteBanner />
    <SiteNav />
    <main id="main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>


<script setup lang="ts">
import { SITE_URL } from '~/composables/usePageSeo'

// Site-wide link details. Each page sets its own title, description and picture
// (see composables/usePageSeo.ts); these fill in everything else.
// Pages are served with a trailing slash (/about/), so the address Google keeps does too.
const route = useRoute()
const pageUrl = () => SITE_URL + (route.path === '/' ? '/' : route.path.replace(/\/?$/, '/'))

useSeoMeta({
  ogType: 'website',
  ogUrl: pageUrl,
  ogImage: `${SITE_URL}/og.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Acacia Climbing Coalition: Looking after Australia's crags",
  twitterCard: 'summary_large_image',
})
useHead({ link: [{ rel: 'canonical', href: pageUrl }] })

// Cloudflare Web Analytics: counts visits without cookies, so no consent banner is needed.
// Only added on the live site, and only once the token is set in Cloudflare (NUXT_PUBLIC_CF_BEACON).
const { cfBeacon, sanity } = useRuntimeConfig().public
if (cfBeacon && !sanity.preview) {
  useHead({
    script: [{ src: 'https://static.cloudflareinsights.com/beacon.min.js', defer: true, 'data-cf-beacon': JSON.stringify({ token: cfBeacon }) }],
  })
}
</script>
