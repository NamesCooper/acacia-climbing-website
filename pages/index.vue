<template>
  <!-- The homepage is the Studio Page with the web address "home". It has no page header;
       its Hero block does that job. -->
  <div v-if="page">
    <SanitySections :sections="page.sections" />
    <SiteHelpBand v-if="page.showHelpBand !== false" />
  </div>
</template>

<script setup lang="ts">
const { data: page } = await usePage('home')

if (!page.value) {
  throw createError({ statusCode: 500, statusMessage: 'Homepage missing from the Studio', fatal: true })
}

// Studio pages draw the "Got an hour?" band themselves (it has an on/off switch in the Studio)
definePageMeta({ prefooter: false })

useHead({
  title: 'Acacia Climbing Coalition · Keep the crags open',
  meta: [{ name: 'description', content: () => page.value?.seoDescription ?? '' }],
})
</script>
