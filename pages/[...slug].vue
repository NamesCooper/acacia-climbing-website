<template>
  <div v-if="page">
    <SitePageHeader :eyebrow="page.eyebrow" :title="heading.title" :accent="heading.accent" :lede="page.lede" />
    <SanitySections :sections="page.sections" />
  </div>
</template>

<script setup lang="ts">
// Catch-all page: any address that doesn't have its own file in /pages
// (e.g. /events) looks for a Page with that slug in the Studio.
// Pages that do have a file (about.vue etc.) always win, so they're untouched.
const route = useRoute()
const slug = ([] as string[]).concat(route.params.slug ?? []).join('/')

const { data: page } = await usePage(slug)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const heading = computed(() => splitHeading(page.value?.heading))

useHead({
  title: () => `${page.value?.title} · Acacia Climbing Coalition`,
  meta: [{ name: 'description', content: () => page.value?.seoDescription ?? page.value?.lede ?? '' }],
})
</script>
