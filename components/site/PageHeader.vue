<template>
  <!-- Poster-style header for inner pages. Pass the heading as `title`;
       `accent` is an optional word shown in moss after it (e.g. title "Lend a" accent "hand"). -->
  <section class="relative max-w-[1240px] mx-auto px-6 pt-8 pb-12 sm:pt-12 sm:pb-16">
    <UiSparkle class="absolute right-[6%] top-4 text-outline hidden sm:block" :size="48" />

    <p
      v-if="eyebrow"
      class="m-0 inline-block bg-lichen border-[3px] border-outline rounded-full px-4 py-1.5 font-grotesk font-extrabold text-sm tracking-[0.06em] uppercase -rotate-2"
    >{{ eyebrow }}</p>

    <h1 class="relative mt-6 mb-0 font-display text-[clamp(40px,13vw,52px)] sm:text-[clamp(52px,9vw,108px)] leading-[0.9] [overflow-wrap:break-word] tracking-[-0.025em] max-w-[1000px]">
      <span aria-hidden="true" class="absolute inset-0 text-wattle translate-x-[5px] translate-y-[5px]">{{ accent ? `${title} ${accent}` : title }}</span>
      <!-- The space is written as {{ ' ' }} because Vue strips plain spaces between tags -->
      <span class="relative">{{ title }}<template v-if="accent">{{ ' ' }}<span class="text-moss">{{ accent }}</span></template></span>
    </h1>

    <p v-if="lede" class="mt-7 mb-0 max-w-[680px] text-lg sm:text-xl leading-relaxed">{{ lede }}</p>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  accent?: string
  eyebrow?: string
  lede?: string
}>()
</script>
