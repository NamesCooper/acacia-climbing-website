<template>
  <!-- The "poster box": thick outline, hard shadow, big rounded corners.
       Everything inside is up to you (default slot). -->
  <component
    :is="as"
    class="relative border-[3px] border-outline overflow-hidden"
    :class="[TONES[tone], RADIUS[size], PAD[size], tilt ? 'tilt' : '']"
    :style="tilt ? { '--tilt': tilt + 'deg' } : undefined"
  >
    <UiHalftone v-if="halftone" :dot="dotFor[tone]" :class="HALFTONE_POS[halftone]" />
    <div class="relative"><slot /></div>
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string
    tone?: 'light' | 'wattle' | 'sandstone' | 'lichen' | 'forest'
    size?: 'sm' | 'md' | 'lg'
    tilt?: number
    halftone?: 'top-right' | 'bottom-left' | 'bottom-right'
  }>(),
  { as: 'div', tone: 'light', size: 'md' },
)

const TONES = {
  light: 'bg-paper-light text-outline shadow-[6px_6px_0_var(--color-outline)]',
  wattle: 'bg-wattle text-outline shadow-[6px_6px_0_var(--color-outline)]',
  sandstone: 'bg-sandstone text-outline shadow-[6px_6px_0_var(--color-outline)]',
  lichen: 'bg-lichen text-outline shadow-[6px_6px_0_var(--color-outline)]',
  forest: 'bg-forest text-paper shadow-[6px_6px_0_var(--color-outline)]',
}
const RADIUS = { sm: 'rounded-[20px]', md: 'rounded-[24px]', lg: 'rounded-[32px]' }
const PAD = { sm: 'p-5', md: 'p-7', lg: 'p-8 sm:p-12' }
// On phones the dots shrink into the corner (or hide) so they never sit behind words
const HALFTONE_POS = {
  'top-right': '-right-16 -top-16 size-32 sm:-right-14 sm:-top-14 sm:size-48 opacity-70',
  'bottom-left': 'hidden sm:block -left-20 -bottom-24 size-80',
  'bottom-right': 'hidden sm:block -right-20 -bottom-20 size-[420px]',
}
const dotFor = {
  light: 'wattle',
  wattle: 'wattle-deep',
  sandstone: 'sandstone-deep',
  lichen: 'moss',
  forest: 'moss',
} as const
</script>
