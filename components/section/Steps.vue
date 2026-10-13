<template>
  <!-- Full-width coloured band with numbered step cards. -->
  <section class="border-y-[3px] border-outline my-10 sm:my-14" :class="BANDS[band] ?? BANDS.sandstone">
    <div class="max-w-[1240px] mx-auto px-6 py-16 sm:py-20">
      <UiSectionTitle :title="title" :lead="lead" />
      <ol class="list-none p-0 m-0 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(step, i) in steps" :key="step">
          <UiCard size="sm" class="h-full">
            <span class="inline-flex items-center justify-center size-10 rounded-full bg-moss text-paper border-[3px] border-outline font-grotesk font-extrabold">{{ i + 1 }}</span>
            <p class="mt-3 mb-0 font-grotesk font-bold text-[17px] leading-snug">{{ step }}</p>
          </UiCard>
        </li>
      </ol>
      <NuxtLink v-if="link" :to="link.to" class="inline-block mt-10 font-grotesk font-bold text-lg text-forest">{{ link.label }} →</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    lead?: string
    steps: string[]
    link?: { label: string; to: string }
    band?: 'sandstone' | 'wattle' | 'lichen' | 'gum'
  }>(),
  { band: 'sandstone' },
)

const BANDS = { sandstone: 'bg-sandstone', wattle: 'bg-wattle', lichen: 'bg-lichen', gum: 'bg-gum' }
</script>
