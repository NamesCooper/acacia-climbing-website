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
  title: () => "Acacia Climbing Coalition · Looking after Australia's crags",
  description: () => page.value?.seoDescription,
  image: () => page.value?.shareImage,
})

// Tells Google who we are, so a search for "Acacia Climbing Coalition" can show the right name,
// logo, email and Instagram. Only on the homepage, which is the organisation's main page.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Acacia Climbing Coalition',
        alternateName: 'ACC',
        url: 'https://acaciaclimbing.org/',
        logo: 'https://acaciaclimbing.org/brand/sprig-green.png',
        email: 'hello@acaciaclimbing.org',
        description: "Climbers working with councils so Australia's bouldering spots get recognised, mapped and looked after. Starting in South East Queensland.",
        areaServed: 'Australia',
        taxID: '38 237 542 815',
        sameAs: ['https://www.instagram.com/acaciaclimbing/', 'https://www.facebook.com/profile.php?id=61595665970911'],
      }),
    },
  ],
})
</script>
