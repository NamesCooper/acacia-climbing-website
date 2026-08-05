<template>
  <div class="border border-ink self-start" style="background: var(--color-cream)">
    <!-- Header -->
    <div class="flex justify-between px-4 py-2.5 border-b border-ink font-mono text-[10px] tracking-[0.1em] text-muted">
      <span>PLATE I · SEQ</span>
      <span>Scale 1:500,000</span>
    </div>

    <!-- Map -->
    <svg viewBox="0 0 400 480" class="w-full block">
      <rect width="400" height="480" fill="#F7F3EA" />

      <!-- Grid -->
      <g stroke="#1C2A1E" stroke-opacity="0.08" stroke-width="0.5">
        <line v-for="i in 9" :key="'v'+i" :x1="(i-1)*50" y1="0" :x2="(i-1)*50" y2="480" />
        <line v-for="i in 11" :key="'h'+i" x1="0" :y1="(i-1)*48" x2="400" :y2="(i-1)*48" />
      </g>

      <!-- Coastline fill -->
      <path
        d="M 305 0 C 318 110, 332 220, 340 330 C 344 390, 347 440, 350 480 L 400 480 L 400 0 Z"
        fill="#1C2A1E" fill-opacity="0.06"
      />
      <!-- Coastline dash -->
      <path
        d="M 305 0 C 318 110, 332 220, 340 330 C 344 390, 347 440, 350 480"
        fill="none" stroke="#1C2A1E" stroke-opacity="0.3" stroke-dasharray="3 3"
      />

      <!-- Brisbane River (flows east at ~lat -27.47) -->
      <path
        d="M 195 132 Q 235 124 280 129"
        fill="none" stroke="#1C2A1E" stroke-opacity="0.2"
      />

      <!-- Cities — positioned to not conflict with crag markers -->
      <circle cx="280" cy="129" r="2" fill="#1C2A1E" fill-opacity="0.5" />
      <text x="210" y="122" font-family="'JetBrains Mono'" font-size="8" letter-spacing="0.1em" fill="#2A3E2C" fill-opacity="0.5">BRISBANE</text>
      <circle cx="233" cy="166" r="2" fill="#1C2A1E" fill-opacity="0.5" />
      <text x="227" y="170" text-anchor="end" font-family="'JetBrains Mono'" font-size="8" letter-spacing="0.1em" fill="#2A3E2C" fill-opacity="0.5">IPSWICH</text>

      <!-- Crag markers -->
      <g v-for="p in points" :key="p.id">
        <circle v-if="p.rec" :cx="p.x" :cy="p.y" r="14" fill="#D39E17" fill-opacity="0.2" />
        <rect
          :x="p.x - 4" :y="p.y - 4" width="8" height="8"
          :fill="p.rec ? '#D39E17' : '#1C2A1E'"
          stroke="#F7F3EA" stroke-width="1.5"
        />
        <text :x="p.x+9" :y="p.y-4" font-family="'JetBrains Mono'" font-size="8" letter-spacing="0.08em" fill="#2E6B40">{{ p.id }}</text>
        <text :x="p.x+9" :y="p.y+7" font-family="'Inter Tight'" font-size="10" font-weight="500" fill="#1C2A1E">{{ p.label }}</text>
      </g>

      <!-- Compass -->
      <g transform="translate(40, 440)">
        <line x1="0" y1="-20" x2="0" y2="20" stroke="#1C2A1E" stroke-opacity="0.6" />
        <path d="M 0 -20 L 4 -12 L -4 -12 Z" fill="#1C2A1E" />
        <text x="0" y="-24" text-anchor="middle" font-family="'JetBrains Mono'" font-size="8" fill="#1C2A1E">N</text>
      </g>
    </svg>

    <!-- Legend -->
    <div class="flex gap-4 px-4 py-3 border-t border-ink font-sans text-[10px] text-ink-soft">
      <span><span class="inline-block w-2 h-2 mr-1.5 align-middle" style="background:#D39E17" />Recognised</span>
      <span><span class="inline-block w-2 h-2 mr-1.5 align-middle bg-ink" />Active</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  points: { x: number; y: number; id: string; label: string; rec: boolean }[]
}>()
</script>
