<template>
  <!-- A calm, centred block of text with the sprig on top. Good for acknowledgements and big ideas.
       For the Acknowledgement of Country it can show the Aboriginal flag instead. The flag is drawn
       plainly at its true proportions and colours, never restyled, tilted or outlined like the
       poster pieces. -->
  <section class="max-w-[900px] mx-auto px-6 py-14 sm:py-20 text-center">
    <svg
      v-if="flag"
      viewBox="0 0 200 100"
      role="img"
      aria-label="Aboriginal flag"
      class="mx-auto block w-24 sm:w-28 h-auto"
    >
      <rect width="200" height="50" fill="#000000" />
      <rect y="50" width="200" height="50" fill="#CC0000" />
      <circle cx="100" cy="50" r="25" fill="#FFCC00" />
    </svg>
    <img v-else-if="sprig" src="/brand/sprig-green.png" alt="" class="mx-auto w-14 h-auto" />
    <UiRisoHeading :text="title" size="md" :class="flag ? 'mt-6' : 'mt-4'" />
    <p v-for="p in paragraphs" :key="p" class="mt-5 mb-0 text-lg leading-relaxed">{{ p }}</p>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string; paragraphs: string[]; sprig?: boolean; flag?: boolean }>(), { sprig: true, flag: false })
</script>
