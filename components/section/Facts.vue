<template>
  <!-- A row of big-number stickers. Only ever use real, checkable numbers.
       On small phones each sticker is a single row: number on the left, label beside it. -->
  <section class="max-w-[1240px] mx-auto px-6 py-10 sm:py-14">
    <UiSectionTitle v-if="title" :title="title" :lead="lead" />
    <ul class="list-none p-0 m-0 grid gap-5 grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4" :class="title ? 'mt-9' : ''">
      <li v-for="(f, i) in facts" :key="f.label">
        <div
          class="tilt h-full flex items-center gap-4 min-[480px]:block border-[3px] border-outline rounded-[24px] px-5 py-6 shadow-[5px_5px_0_var(--color-outline)] text-forest"
          :class="TONES[f.tone ?? ORDER[i % ORDER.length]]"
          :style="{ '--tilt': TILTS[i % TILTS.length] + 'deg' }"
        >
          <p class="m-0 shrink-0 min-w-[1.4em] text-center min-[480px]:text-left font-display text-[clamp(48px,6vw,72px)] leading-[0.9]">{{ f.value }}</p>
          <p class="m-0 min-[480px]:mt-2 font-grotesk font-extrabold text-[15px] leading-snug">{{ f.label }}</p>
        </div>
      </li>
    </ul>
    <p v-if="note" class="mt-6 mb-0 text-sm opacity-80">{{ note }}</p>
  </section>
</template>

<script setup lang="ts">
type FactTone = 'wattle' | 'lichen' | 'sandstone' | 'paper'
defineProps<{ title?: string; lead?: string; note?: string; facts: { value: string; label: string; tone?: FactTone }[] }>()
const TONES: Record<FactTone, string> = { wattle: 'bg-wattle', lichen: 'bg-lichen', sandstone: 'bg-sandstone', paper: 'bg-paper-light' }
const ORDER: FactTone[] = ['wattle', 'lichen', 'sandstone', 'paper']
const TILTS = [-1.5, 1.2, -1, 1.5]
</script>
