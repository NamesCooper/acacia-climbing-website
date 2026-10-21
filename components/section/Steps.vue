<template>
  <!-- Checklist look: one card of ticks on the plain page (e.g. "what to bring") -->
  <section v-if="look === 'checklist'" class="max-w-[1240px] mx-auto px-6 py-12 sm:py-16">
    <UiSectionTitle :title="title" :lead="lead" />
    <p v-if="intro" class="mt-4 mb-0 max-w-[720px] text-lg leading-relaxed">{{ intro }}</p>
    <UiCard tone="light" class="mt-8 sm:mt-10 max-w-[900px]">
      <ul class="list-none p-0 m-0 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        <li v-for="item in steps" :key="item" class="flex items-start gap-3">
          <span aria-hidden="true" class="flex-shrink-0 inline-flex items-center justify-center size-8 rounded-full bg-wattle border-[3px] border-outline">
            <svg viewBox="0 0 12 12" class="size-3.5"><path d="M2 6.5 4.8 9 10 3" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <p class="m-0 pt-1 font-grotesk font-bold text-[17px] leading-snug">{{ item }}</p>
        </li>
      </ul>
    </UiCard>
    <NuxtLink v-if="link" :to="link.to" class="inline-block mt-8 font-grotesk font-bold text-lg text-forest">{{ link.label }} →</NuxtLink>
  </section>

  <!-- Full-width coloured band with numbered step cards. -->
  <section v-else class="border-y-[3px] border-outline my-10 sm:my-14" :class="BANDS[band] ?? BANDS.sandstone">
    <div class="max-w-[1240px] mx-auto px-6 py-12 sm:py-20">
      <UiSectionTitle :title="title" :lead="lead" />
      <p v-if="intro" class="mt-4 mb-0 max-w-[720px] text-lg leading-relaxed">{{ intro }}</p>

      <!-- Phones: one card with a numbered list inside, so 8 steps stay about one screen tall -->
      <UiCard size="sm" class="sm:hidden mt-8">
        <ol class="list-none p-0 m-0 divide-y-2 divide-outline/15">
          <li v-for="(step, i) in steps" :key="step" class="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
            <span class="flex-shrink-0 inline-flex items-center justify-center size-8 rounded-full bg-moss text-paper border-2 border-outline font-grotesk font-extrabold text-sm">{{ i + 1 }}</span>
            <p class="m-0 font-grotesk font-bold text-[16px] leading-snug">{{ step }}</p>
          </li>
        </ol>
      </UiCard>

      <!-- Bigger screens: a card per step in a grid -->
      <ol class="hidden sm:grid list-none p-0 m-0 mt-10 gap-4 grid-cols-2" :class="LG_COLS[steps.length] ?? 'lg:grid-cols-4'">
        <li v-for="(step, i) in steps" :key="step">
          <UiCard size="sm" class="h-full">
            <span class="inline-flex items-center justify-center size-10 rounded-full bg-moss text-paper border-[3px] border-outline font-grotesk font-extrabold">{{ i + 1 }}</span>
            <p class="m-0 mt-3 font-grotesk font-bold text-[17px] leading-snug">{{ step }}</p>
          </UiCard>
        </li>
      </ol>
      <NuxtLink v-if="link" :to="link.to" class="inline-block mt-8 sm:mt-10 font-grotesk font-bold text-lg text-forest">{{ link.label }} →</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    lead?: string
    intro?: string
    steps: string[]
    link?: { label: string; to: string }
    band?: 'sandstone' | 'wattle' | 'lichen' | 'gum'
    look?: 'numbered' | 'checklist'
  }>(),
  { band: 'sandstone', look: 'numbered' },
)

// Fit 3 or 5 steps on one row on wide screens instead of leaving one on its own
const LG_COLS: Record<number, string> = { 3: 'lg:grid-cols-3', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-3' }
const BANDS = { sandstone: 'bg-sandstone', wattle: 'bg-wattle', lichen: 'bg-lichen', gum: 'bg-gum' }
</script>
