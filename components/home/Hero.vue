<template>
  <section class="relative max-w-[1000px] mx-auto px-6 pt-8 pb-14 text-center">
    <!-- sparkles -->
    <UiSparkle class="absolute left-[4%] top-[22%] text-outline hidden sm:block" :size="64" />
    <UiSparkle class="absolute right-[6%] top-0 sm:top-[12%] text-outline" :size="44" delay=".8s" />
    <UiSparkle class="absolute right-[10%] top-[68%] text-outline hidden sm:block" :size="34" delay="1.4s" />

    <p v-if="label" class="relative m-0 font-poster text-[clamp(22px,3.4vw,34px)] leading-tight">{{ label }}</p>

    <!-- Two-ink riso headline: the wattle copy sits slightly off-register behind the dark one -->
    <h1 class="relative mt-4 mb-0 font-display text-[clamp(64px,13vw,148px)] leading-[0.88] tracking-[-0.025em]">
      <!-- Each line typed in the Studio becomes its own line here -->
      <span aria-hidden="true" class="absolute inset-0 text-wattle translate-x-[6px] translate-y-[6px] whitespace-pre-line">{{ heading }}</span>
      <span class="relative whitespace-pre-line">{{ heading }}</span>
    </h1>

    <p v-if="body" class="relative mx-auto mt-7 mb-0 max-w-[600px] text-lg sm:text-xl leading-relaxed">{{ body }}</p>

    <div v-if="primary || secondary" class="relative flex flex-wrap justify-center gap-4 mt-9">
      <UiButton v-if="primary" :to="primary.to" :href="primary.href" variant="moss" size="lg">{{ primary.label }}</UiButton>
      <UiButton v-if="secondary" :to="secondary.to" :href="secondary.href" variant="paper" size="lg">{{ secondary.label }}</UiButton>
    </div>

    <div class="relative mx-auto mt-12 size-[200px] rounded-full border-[3px] border-dashed border-outline/30 flex items-center justify-center">
      <img src="/brand/sprig-gold.png" alt="" class="anim-bob w-[120px] h-auto" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Cta } from '~/types/content'

defineProps<{ label?: string; heading: string; body?: string; primary?: Cta; secondary?: Cta }>()
</script>
