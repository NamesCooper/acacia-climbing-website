<template>
  <!-- One big framed panel with a headline, a line of text and a button. -->
  <section class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <UiCard :tone="tone" size="lg" :halftone="image?.src ? undefined : 'bottom-right'">
      <div :class="image?.src ? 'grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:gap-14' : ''">
      <!-- Optional square photo: black and white in a poster frame, beside the words (above them on phones) -->
      <img
        v-if="image?.src"
        :src="image.src"
        :alt="image.alt ?? ''"
        width="600"
        height="600"
        loading="lazy"
        class="block size-[150px] sm:size-[220px] lg:size-[280px] object-cover grayscale contrast-[1.1] border-[3px] border-outline rounded-[28px] shadow-[6px_6px_0_var(--color-outline)] sm:order-2"
      />
      <div class="max-w-[720px]">
        <p v-if="lead" class="m-0 font-poster text-2xl">{{ lead }}</p>
        <!-- Plain heading: an offset shadow blurs on a coloured panel -->
        <h2 class="mt-2 mb-0 font-display text-[clamp(36px,5vw,60px)] leading-[0.95] tracking-[-0.025em]">{{ title }}</h2>
        <p v-if="body" class="mt-5 mb-0 text-lg leading-relaxed">{{ body }}</p>
        <UiButton v-if="cta" class="mt-6" :to="cta.to" :href="cta.href" :variant="cta.variant ?? (tone === 'light' ? 'wattle' : 'paper')">{{ cta.label }}</UiButton>
      </div>
      </div>
    </UiCard>
  </section>
</template>

<script setup lang="ts">
import type { Cta } from '~/types/content'

withDefaults(
  defineProps<{ title: string; lead?: string; body?: string; cta?: Cta; image?: { src?: string; alt?: string }; tone?: 'light' | 'sandstone' | 'wattle' | 'lichen' | 'gum' }>(),
  { tone: 'sandstone' },
)
</script>
