<template>
  <!-- The homepage is the Studio Page with the web address "home". It has no page header;
       its Hero block does that job. -->
  <div v-if="page">
    <SanitySections :sections="page.sections" />
  </div>
</template>

<script setup lang="ts">
const { data: page } = await usePage('home')

if (!page.value) {
  throw createError({ statusCode: 500, statusMessage: 'Homepage missing from the Studio', fatal: true })
}


usePageSeo({
  title: () => 'Acacia Climbing Coalition · Keep the crags open',
  description: () => page.value?.seoDescription,
  image: () => page.value?.shareImage,
})
</script>
