<template>
  <!-- A photo beside some text. Two looks:
       - frame: the photo in a tilted poster frame
       - cutout: a black and white cut-out (PNG with the background removed) standing on a
         bold palette shape, with the caption as a sticker. Makes any phone photo look on-brand. -->
  <section class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <div class="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
      <figure class="m-0" :class="imageSide === 'right' ? 'lg:order-2' : ''">
        <!-- Cut-out -->
        <div v-if="look === 'cutout'" class="relative mx-auto max-w-[520px] aspect-square">
          <div
            class="absolute inset-[8%_4%_0_4%] border-[3px] border-outline rounded-[48%_52%_44%_56%/55%_45%_55%_45%] overflow-hidden shadow-[8px_8px_0_var(--color-outline)]"
            :class="SHAPES[shape]"
          >
            <div aria-hidden="true" class="halftone absolute -right-10 -top-10 size-56 rounded-full opacity-80" :style="{ '--dot': DOTS[shape] }"></div>
          </div>
          <img
            v-if="image?.src"
            :src="image.src"
            :alt="image.alt ?? ''"
            class="absolute inset-x-[6%] bottom-0 mx-auto max-h-[100%] w-[88%] object-contain object-bottom grayscale contrast-[1.15] drop-shadow-[4px_4px_0_var(--color-outline)]"
            loading="lazy"
          />
          <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <img src="/brand/sprig-green.png" alt="" class="relative w-20 h-auto" />
            <span class="relative font-grotesk font-extrabold text-sm uppercase tracking-[0.08em]">Your cut-out here</span>
          </div>
          <UiSparkle class="absolute left-[2%] top-[6%] text-outline" :size="34" />
          <figcaption
            v-if="image?.caption"
            class="tilt absolute right-[2%] bottom-[6%] max-w-[70%] bg-paper-light border-[3px] border-outline rounded-full px-4 py-1.5 font-grotesk font-extrabold text-sm shadow-[3px_3px_0_var(--color-outline)]"
            style="--tilt: 3deg"
          >{{ image.caption }}</figcaption>
        </div>

        <!-- Framed photo -->
        <template v-else>
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
        </template>
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

type Shape = 'wattle' | 'moss' | 'lichen' | 'sandstone'

withDefaults(
  defineProps<{
    title: string
    lead?: string
    paragraphs?: string[]
    image?: { src?: string; alt?: string; caption?: string }
    imageSide?: 'left' | 'right'
    look?: 'frame' | 'cutout'
    shape?: Shape
    cta?: Cta
  }>(),
  { paragraphs: () => [], imageSide: 'left', look: 'frame', shape: 'wattle' },
)

const SHAPES: Record<Shape, string> = { wattle: 'bg-wattle', moss: 'bg-moss', lichen: 'bg-lichen', sandstone: 'bg-sandstone' }
const DOTS: Record<Shape, string> = {
  wattle: 'var(--color-wattle-deep)',
  moss: 'var(--color-forest)',
  lichen: 'var(--color-moss)',
  sandstone: 'var(--color-sandstone-deep)',
}
</script>
