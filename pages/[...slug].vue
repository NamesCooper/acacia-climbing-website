<template>
  <div v-if="page">
    <SitePageHeader :eyebrow="page.eyebrow" :title="heading.title" :accent="heading.accent" :lede="page.lede" />
    <SanitySections :sections="page.sections" />
  </div>
</template>

<script setup lang="ts">
// Every page except the map and updates is built in the Studio ("Pages").
// This catch-all looks up the Page whose web address matches, e.g. /about.
const route = useRoute()
const slug = ([] as string[]).concat(route.params.slug ?? []).join('/')

const { data: page } = await usePage(slug)

if (!page.value || slug === 'home') {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}


const heading = computed(() => splitHeading(page.value?.heading))

useHead({
  title: () => `${page.value?.title} · Acacia Climbing Coalition`,
  meta: [{ name: 'description', content: () => page.value?.seoDescription ?? page.value?.lede ?? '' }],
})
</script>
