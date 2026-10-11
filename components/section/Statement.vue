<template>
  <!-- A calm, centred block of text with the sprig on top. Good for acknowledgements and big ideas. -->
  <section class="max-w-[900px] mx-auto px-6 py-14 sm:py-20 text-center">
    <img v-if="sprig" src="/brand/sprig-green.png" alt="" class="mx-auto w-14 h-auto" />
    <UiRisoHeading :text="title" size="md" class="mt-4" />
    <p v-for="p in paragraphs" :key="p" class="mt-5 mb-0 text-lg leading-relaxed">{{ p }}</p>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string; paragraphs: string[]; sprig?: boolean }>(), { sprig: true })
</script>
