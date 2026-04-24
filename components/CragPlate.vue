<template>
  <div class="relative overflow-hidden w-full h-full">
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      class="w-full h-full block"
    >
      <rect width="800" height="600" :fill="p[3]" />
      <path
        d="M 0 320 C 120 280, 220 300, 360 290 C 480 282, 580 298, 800 276 L 800 600 L 0 600 Z"
        :fill="p[2]"
      />
      <path
        d="M 0 380 C 180 340, 280 360, 420 340 C 560 324, 680 356, 800 336 L 800 600 L 0 600 Z"
        :fill="p[1]"
      />
      <path
        d="M 0 460 L 80 420 L 160 440 L 240 400 L 340 430 L 420 390 L 520 420 L 620 400 L 720 430 L 800 410 L 800 600 L 0 600 Z"
        :fill="p[0]"
      />
      <g :stroke="p[0]" stroke-opacity="0.5" stroke-width="1">
        <line
          v-for="i in 40"
          :key="i"
          :x1="(i - 1) * 22"
          :y1="500 + ((i - 1) % 3) * 10"
          :x2="(i - 1) * 22 + 18"
          :y2="540 + ((i - 1) % 3) * 12"
        />
      </g>
      <g :fill="p[3]" fill-opacity="0.08">
        <circle
          v-for="i in 120"
          :key="i"
          :cx="((i - 1) * 73) % 800"
          :cy="((i - 1) * 37) % 600"
          r="1.3"
        />
      </g>
    </svg>
    <div
      class="absolute bottom-3 left-3 flex items-baseline gap-2.5 text-cream font-mono text-[10px] tracking-[0.1em] mix-blend-difference"
    >
      <span class="opacity-70">·</span>
      <span class="italic font-serif text-[12px]">{{ title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  number: string
  variant?: 'a' | 'b' | 'c' | 'd'
}>()

const palettes = {
  a: ['#3B4A3B', '#5C6B48', '#8A8063', '#C9B585'],
  b: ['#2E3A2E', '#4A5442', '#7C7856', '#B8A97A'],
  c: ['#1F2A1E', '#3E4D3C', '#6B6C4E', '#A89E72'],
  d: ['#2A342A', '#4C5A42', '#7E7654', '#D4BC88'],
}

const p = computed(() => palettes[props.variant ?? 'a'])
</script>
