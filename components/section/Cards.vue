<template>
  <!-- A grid of poster cards. Each card can have a chip, title, text, a small list and a button. -->
  <section class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <UiSectionTitle v-if="title" :title="title" :lead="lead" class="mb-10" />
    <p v-if="intro" class="-mt-6 mb-10 max-w-[680px] text-lg leading-relaxed">{{ intro }}</p>
    <ul class="list-none p-0 m-0 grid gap-6" :class="COLS[columns]">
      <li v-for="(c, i) in cards" :id="c.id" :key="c.title" class="scroll-mt-6">
        <UiCard :tone="c.tone ?? 'light'" :halftone="c.halftone ? 'top-right' : undefined" class="h-full">
          <!-- Optional partner logo, kept small and in its own colours -->
          <img
            v-if="c.logo?.src"
            :src="c.logo.src"
            :alt="c.logo.alt ?? ''"
            loading="lazy"
            class="block h-12 w-auto max-w-[180px] object-contain object-left mb-4"
          />
          <UiChip v-if="c.chip" :tone="c.chipTone ?? 'lichen'" :dashed="c.chipDashed">{{ c.chip }}</UiChip>
          <!-- h2 when the section has no title of its own, so heading levels never skip -->
          <component
            :is="title ? 'h3' : 'h2'"
            class="m-0 leading-[1.02]"
            :class="[c.chip ? 'mt-4' : '', titleStyle === 'display' ? 'font-display text-[clamp(30px,3.4vw,42px)]' : 'font-grotesk font-extrabold text-2xl', c.tone === 'forest' ? 'text-wattle' : '']"
          >{{ c.title }}</component>
          <p v-if="c.body" class="mt-3 mb-0 text-[17px] leading-relaxed" :class="c.tone === 'forest' ? 'text-paper/90' : ''">{{ c.body }}</p>
          <ul v-if="c.items?.length" class="list-none p-0 m-0 mt-4 flex flex-col gap-3">
            <li v-for="item in c.items" :key="item.title">
              <p class="m-0 font-grotesk font-extrabold text-lg" :class="c.tone === 'forest' ? 'text-wattle' : 'text-forest'">{{ item.title }}</p>
              <p v-if="item.body" class="mt-0.5 mb-0 text-[16px] leading-relaxed" :class="c.tone === 'forest' ? 'text-paper/90' : ''">{{ item.body }}</p>
            </li>
          </ul>
          <!-- "Text link" is a quiet read-more; anything else is a chunky button -->
          <template v-if="c.cta?.variant === 'link'">
            <NuxtLink v-if="c.cta.to" :to="c.cta.to" class="inline-block mt-5 font-grotesk font-bold text-lg underline decoration-2 underline-offset-4 hover:decoration-wattle-deep" :class="c.tone === 'forest' ? 'text-wattle' : 'text-forest'">{{ c.cta.label }}&nbsp;→</NuxtLink>
            <a v-else :href="c.cta.href" target="_blank" rel="noopener" class="inline-block mt-5 font-grotesk font-bold text-lg underline decoration-2 underline-offset-4 hover:decoration-wattle-deep" :class="c.tone === 'forest' ? 'text-wattle' : 'text-forest'">{{ c.cta.label }}&nbsp;↗<span class="sr-only"> (opens in a new tab)</span></a>
          </template>
          <UiButton v-else-if="c.cta" class="mt-6" :to="c.cta.to" :href="c.cta.href" :variant="c.cta.variant">{{ c.cta.label }}</UiButton>
        </UiCard>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { CardItem } from '~/types/content'

withDefaults(
  defineProps<{
    title?: string
    lead?: string
    intro?: string
    cards: CardItem[]
    columns?: 2 | 3 | 4
    titleStyle?: 'display' | 'grotesk'
    tilted?: boolean
  }>(),
  { columns: 2, titleStyle: 'display' },
)

const COLS = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }
</script>
