<template>
  <div v-if="page">
    <SitePageHeader
      :eyebrow="page.eyebrow"
      :logo="page.headerLogo?.asset ? { src: sanityImageUrl(page.headerLogo, 400), alt: page.headerLogo.alt } : undefined"
      :title="heading.title"
      :accent="heading.accent"
      :lede="page.lede"
    />
    <SanitySections :sections="page.sections" />
  </div>
</template>

<script setup lang="ts">
// Every page except the map and updates is built in the Studio ("Pages").
// This catch-all looks up the Page whose web address matches, e.g. /about.
const route = useRoute()
// Drop empty pieces so /about/ and /about both mean "about". The live site serves pages with a
// trailing slash, and without this the browser looked for "about/", missed the baked-in copy,
// and asked Sanity for a page that doesn't exist.
const slug = ([] as string[]).concat(route.params.slug ?? []).filter(Boolean).join('/')

const { data: page } = await usePage(slug)

if (!page.value || slug === 'home') {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}


const heading = computed(() => splitHeading(page.value?.heading))

usePageSeo({
  title: () => `${page.value?.title} · Acacia Climbing Coalition`,
  description: () => page.value?.seoDescription ?? page.value?.lede,
  image: () => page.value?.shareImage,
})
</script>
