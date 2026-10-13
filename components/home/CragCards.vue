<template>
  <section class="max-w-[1240px] mx-auto px-6 py-24">
    <div class="flex flex-wrap justify-between items-end gap-4">
      <h2 class="m-0 font-grotesk font-extrabold uppercase text-forest text-[clamp(44px,6vw,72px)] leading-[0.9] tracking-[-0.03em]">{{ heading || "Where it's at" }}</h2>
      <NuxtLink to="/progress" class="font-grotesk font-bold text-lg text-forest">{{ linkLabel || 'See where every crag is up to' }} →</NuxtLink>
    </div>

    <!-- Four across on desktop, two on tablets, one on phones -->
    <ul class="list-none p-0 m-0 mt-9 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="(c, i) in cards"
        :key="c.id"
        class="tilt bg-paper-light border-[3px] border-forest rounded-[20px] p-[22px] shadow-[6px_6px_0_var(--color-forest)]"
      >
        <span class="inline-block border-2 rounded-full px-3 py-1 text-[13px] font-bold" :class="statusChip(c.status)">
          {{ statusLabel(c.status) }}
        </span>
        <h3 class="mt-4 mb-0 font-grotesk font-extrabold leading-none text-forest text-[28px] [overflow-wrap:break-word]">{{ c.name }}</h3>
        <p class="mt-1.5 mb-0 text-sm">{{ c.council }}</p>
        <div
          class="mt-[18px] h-3.5 border-2 border-forest rounded-full bg-paper overflow-hidden"
          role="progressbar"
          :aria-valuenow="c.done"
          aria-valuemin="0"
          :aria-valuemax="c.total"
          :aria-label="c.name + ' access pathway'"
        >
          <div class="anim-fill h-full bg-moss" :style="{ width: c.pct + '%' }"></div>
        </div>
        <p class="mt-2 mb-0 text-[13px] font-bold">{{ c.done }} of {{ c.total }} steps done</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
defineProps<{ heading?: string; linkLabel?: string }>()

// Crag data comes from Sanity at build time (see composables/useCragData.ts)
const { data } = await useCragData()



// How many crags to show on the homepage. The rest are one click away on the map.
const SHOW = 4

// `computed` recalculates automatically whenever the data it uses changes.
// Cards are sorted by progress so the furthest-along crags lead.
const cards = computed(() =>
  data.value.crags
    .map((c) => {
      const steps = data.value.milestones.filter((m) => m.crag_id === c.id)
      const done = steps.filter((m) => m.status === 'done').length
      const total = steps.length || 8
      return { ...c, done, total, pct: Math.round((done / total) * 100) }
    })
    .sort((a, b) => b.pct - a.pct)
    .slice(0, SHOW),
)
</script>
