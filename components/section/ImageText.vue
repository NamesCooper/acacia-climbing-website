<template>
  <!-- A photo in a tilted poster frame beside some text. Photo side can be swapped. -->
  <section class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <div class="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
      <figure class="m-0" :class="imageSide === 'right' ? 'lg:order-2' : ''">
        <div
          class="tilt relative aspect-[4/3] bg-sandstone border-[3px] border-outline rounded-[28px] overflow-hidden shadow-[8px_8px_0_var(--color-outline)]"
          :style="{ '--tilt': (imageSide === 'right' ? 1.2 : -1.2) + 'deg' }"
        >
          <img v-if="image?.src" :src="image.src" :alt="image.alt ?? ''" class="absolute inset-0 size-full object-cover" loading="lazy" />
          <!-- Placeholder until a photo is added -->
          <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div aria-hidden="true" class="halftone absolute -right-16 -bottom-16 size-72 rounded-full" style="--dot: var(--color-sandstone-deep)"></div>
            <img src="/brand/sprig-green.png" alt="" class="relative w-20 h-auto" />
            <span class="relative font-grotesk font-extrabold text-sm uppercase tracking-[0.08em]">Your photo here</span>
          </div>
        </div>
        <figcaption v-if="image?.caption" class="mt-4 text-sm opacity-80">{{ image.caption }}</figcaption>
      </figure>
      <div>
        <UiSectionTitle :title="title" :lead="lead" />
        <p v-for="p in paragraphs" :key="p" class="mt-5 mb-0 text-lg leading-relaxed">{{ p }}</p>
        <UiButton v-if="cta" class="mt-6" :to="cta.to" :href="cta.href" :variant="cta.variant">{{ cta.label }}</UiButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Cta } from '~/types/content'

withDefaults(
  defineProps<{
    title: string
    lead?: string
    paragraphs?: string[]
    image?: { src?: string; alt?: string; caption?: string }
    imageSide?: 'left' | 'right'
    cta?: Cta
  }>(),
  { paragraphs: () => [], imageSide: 'left' },
)
</script>
