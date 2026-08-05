<template>
  <section class="px-4 sm:px-6 lg:px-12 py-12 md:py-16 lg:py-24 border-b border-green">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-12">
      <div>
        <h2
          class="font-serif font-normal m-0 mt-4 tracking-[-0.035em]"
          style="font-size: clamp(36px, 7vw, 124px); line-height: 0.88"
        >
          The <span class="italic">register</span><span class="text-wattle">.</span>
        </h2>
      </div>
      <NuxtLink
        to="/progress"
        class="font-serif italic text-ink border-b border-ink cursor-pointer hover:opacity-70 transition-opacity self-start sm:self-end pb-0.5"
        style="font-size: clamp(15px, 1.5vw, 22px)"
      >
        Open the Interactive Map →
      </NuxtLink>
    </div>

    <!-- Table -->
    <div
      class="hidden lg:grid gap-4 py-3 border-t border-b border-ink font-mono text-[12px] tracking-[0.15em] text-muted uppercase"
      style="grid-template-columns: 50px 2fr 1.5fr 1fr 1fr 80px"
    >
      <span>—</span><span>Site</span><span>Council</span><span>Problems</span><span>Status</span>
    </div>

    <div
      v-for="(crag, i) in crags"
      :key="crag.id"
      class="flex flex-col sm:grid gap-2 lg:gap-4 py-4 lg:py-4.5 border-b items-baseline"
      style="grid-template-columns: 50px 2fr 1.5fr 1fr 1fr 80px; border-color: rgba(46,107,64,0.3)"
    >
      <span class="font-mono text-[11px] text-muted">{{ String(i + 1).padStart(3, '0') }}</span>
      <span class="font-serif" style="font-size: clamp(18px, 1.7vw, 24px); letter-spacing: -0.01em">{{ crag.name }}</span>
      <span class="text-[15px] lg:text-[16px] text-ink-soft">{{ shortCouncil(crag.council) }}</span>
      <span class="font-mono text-[13px] lg:text-[14px] text-ink-soft">{{ crag.problems }}</span>
      <span
        class="font-mono text-[11px] lg:text-[12px] tracking-widest uppercase"
        :style="{ color: statusColors[crag.status] ?? '#888780' }"
      >→ {{ crag.statusLabel }}</span>
         </div>

  </section>
</template>

<script setup lang="ts">
interface Crag {
  id: string
  name: string
  status: string
  statusLabel: string
  council: string
  problems: string
  updatedAt: string
}

const statusColors: Record<string, string> = {
  completed: '#2E6B40',
  recognised: '#5AAA3A',
  progress: '#C8900A',
  scoping: '#888780',
}

const crags = ref<Crag[]>([])
onMounted(async () => {
  crags.value = await $fetch<Crag[]>('/data/crags.json')
})

function shortCouncil(council: string) {
  return council.replace(/ (City|Regional|Shire) Council$/, '').replace(' Council', '')
}
</script>
