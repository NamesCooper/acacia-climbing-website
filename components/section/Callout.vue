<template>
  <!-- One big framed panel with a headline, a line of text and a button. -->
  <section class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <UiCard :tone="tone" size="lg" halftone="bottom-right">
      <div class="max-w-[720px]">
        <p v-if="lead" class="m-0 font-poster text-2xl">{{ lead }}</p>
        <UiRisoHeading :text="title" size="md" :shadow="tone === 'wattle' ? 'moss' : 'wattle'" class="mt-2 !text-[clamp(36px,5vw,60px)] !leading-[0.95]" />
        <p v-if="body" class="mt-5 mb-0 text-lg leading-relaxed">{{ body }}</p>
        <UiButton v-if="cta" class="mt-6" :to="cta.to" :href="cta.href" :variant="cta.variant ?? 'paper'">{{ cta.label }}</UiButton>
      </div>
    </UiCard>
  </section>
</template>

<script setup lang="ts">
import type { Cta } from '~/types/content'

withDefaults(
  defineProps<{ title: string; lead?: string; body?: string; cta?: Cta; tone?: 'sandstone' | 'wattle' | 'lichen' | 'gum' }>(),
  { tone: 'sandstone' },
)
</script>
