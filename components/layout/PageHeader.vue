<template>
  <!-- Poster-style page header used by every inner page.
       The heading goes in the default slot. It's rendered twice: once in wattle,
       slightly offset, for the riso two-ink look, and once on top in dark ink. -->
  <section class="relative max-w-[1240px] mx-auto px-6 pt-10 pb-16 sm:pt-14 sm:pb-20">
    <RetroSparkle class="absolute right-[5%] top-6 text-outline hidden sm:block" :size="48" />

    <p
      v-if="eyebrow"
      class="m-0 inline-block bg-lichen border-[3px] border-outline rounded-full px-4 py-1.5 font-grotesk font-extrabold text-sm tracking-[0.06em] uppercase -rotate-2"
    >{{ eyebrow }}</p>

    <h1 class="relative mt-6 mb-0 font-display text-[clamp(52px,9vw,112px)] leading-[0.9] tracking-[-0.025em] max-w-[1000px] [&_.text-wattle]:text-moss">
      <span aria-hidden="true" class="absolute inset-0 text-wattle translate-x-[5px] translate-y-[5px] [&_*]:!text-wattle"><slot /></span>
      <span class="relative"><slot /></span>
    </h1>

    <p v-if="lede" class="mt-7 mb-0 max-w-[680px] text-lg sm:text-xl leading-relaxed">{{ lede }}</p>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  lede?: string
}>()
</script>
