<template>
  <!-- Poster-style header for inner pages. Pass the heading as `title`;
       `accent` is an optional word shown in moss after it (e.g. title "Lend a" accent "hand"). -->
  <section class="relative max-w-[1240px] mx-auto px-6 pt-8 pb-12 sm:pt-12 sm:pb-16">
    <UiSparkle class="absolute right-[6%] top-4 text-outline hidden sm:block" :size="48" />

    <!-- Small friendly label above the headline (usually the page name), with an optional
         partner logo beside it, e.g. "Guidebooks on [KAYA]" -->
    <div v-if="eyebrow || logo?.src" class="flex flex-wrap items-center gap-x-3 gap-y-2">
      <p v-if="eyebrow" class="m-0 font-poster text-[22px] sm:text-[26px] leading-tight">{{ eyebrow }}</p>
      <img v-if="logo?.src" :src="logo.src" :alt="logo.alt ?? ''" class="block h-6 sm:h-7 w-auto" />
    </div>

    <h1 class="relative mt-3 sm:mt-4 mb-0 font-display text-[clamp(40px,13vw,52px)] sm:text-[clamp(52px,9vw,108px)] leading-[0.9] [overflow-wrap:break-word] tracking-[-0.025em] max-w-[1000px]">
      <span aria-hidden="true" class="absolute inset-0 text-wattle-deep translate-x-[0.05em] translate-y-[0.05em]">{{ accent ? `${title} ${accent}` : title }}</span>
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
  logo?: { src?: string; alt?: string }
  lede?: string
}>()
</script>
