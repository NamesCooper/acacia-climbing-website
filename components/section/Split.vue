<template>
  <!-- Text on the left, a highlight card on the right (stacks on phones). -->
  <section class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <div class="grid gap-10 lg:grid-cols-2 items-start">
      <div>
        <!-- A partner logo can sit above the heading, or stand in for it (the heading is then
             kept for screen readers and Google) -->
        <img v-if="logo?.src" :src="logo.src" :alt="logoHeading ? '' : logo.alt ?? ''" loading="lazy" class="block w-auto" :class="logoHeading ? 'h-10 sm:h-12' : 'h-8 sm:h-9 mb-6'" />
        <UiSectionTitle :title="title" :lead="lead" :class="logo?.src && logoHeading ? 'sr-only' : ''" />
        <p v-for="p in paragraphs" :key="p" class="mt-5 mb-0 text-lg leading-relaxed">{{ p }}</p>
        <UiButton v-if="cta" class="mt-6" :to="cta.to" :href="cta.href" :variant="cta.variant">{{ cta.label }}</UiButton>
      </div>
      <UiCard v-if="highlight" :tone="highlight.tone ?? 'sandstone'" size="lg" halftone="top-right">
        <p class="m-0 font-display text-[clamp(30px,3.6vw,44px)] leading-[1.05]">{{ highlight.quote }}</p>
        <p v-if="highlight.body" class="mt-4 mb-0 text-[17px] leading-relaxed">{{ highlight.body }}</p>
      </UiCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Cta, Tone } from '~/types/content'

defineProps<{
  title: string
  logo?: { src?: string; alt?: string }
  logoHeading?: boolean
  lead?: string
  paragraphs: string[]
  cta?: Cta
  highlight?: { quote: string; body?: string; tone?: Tone }
}>()
</script>
