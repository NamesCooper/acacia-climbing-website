<template>
  <section class="px-4 sm:px-6 lg:px-12 py-12 md:py-16 lg:py-24 border-b border-green bg-cream">

    <!-- Header -->
    <div
      class="flex flex-col lg:grid lg:gap-12 items-start lg:items-end mb-10 lg:mb-14 pb-6 lg:pb-8"
      style="grid-template-columns: 1fr auto"
    >
      <div>
        <h2
          class="font-serif font-normal m-0 mt-4 tracking-[-0.035em]"
          style="font-size: clamp(28px, 6vw, 124px); line-height: 0.88"
        >
          The <span class="italic">work</span>, in four pillars.
        </h2>
      </div>
    </div>

    <!-- Desktop column headers -->
    <div
      class="hidden lg:grid gap-6 py-3 border-b border-green font-mono text-[10px] tracking-[0.18em] uppercase text-green"
      style="grid-template-columns: 60px 2fr 3fr 1fr 1fr"
    >
      <span></span>
      <span>Pillar</span>
      <span>Operational definition</span>
      <span>Active sites</span>
      <span>Status</span>
    </div>

    <!-- Rows -->
    <div
      v-for="[n, title, desc, sites, status] in pillars"
      :key="n"
      class="flex flex-col lg:grid gap-3 lg:gap-6 py-6 lg:py-7 border-b items-start"
      style="grid-template-columns: 60px 2fr 3fr 1fr 1fr; border-color: rgba(46,107,64,0.25)"
    >
      <div
        class="font-serif italic font-normal text-green"
        style="font-size: clamp(32px, 4.5vw, 56px); line-height: 0.9"
      >{{ n }}</div>
      <h3
        class="font-serif font-normal m-0 leading-[1.05] tracking-[-0.015em]"
        style="font-size: clamp(18px, 2vw, 34px)"
      >{{ title }}</h3>
      <p class="text-[13px] lg:text-[14px] leading-[1.6] m-0 text-ink-soft">{{ desc }}</p>
      <div class="font-mono text-[11px] tracking-wider text-ink">{{ sites }}</div>
      <div>
        <span
          class="font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1 border"
          style="border-color: #D39E17; color: #D39E17"
        >→ {{ status }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const pillars: [string, string, string, string, string][] = [
  ['I',   'Council Advocacy',         'Engage directly with councils and land managers to secure formal recognition and clean legal status for SEQ climbing areas.',   'BCC · ICC · SCC', 'Active'],
  ['II',  'Guidebook Documentation',  'Every problem, every topo, geolocated on KAYA. Open-access, verified by local volunteers, updated as new lines go up.',          '12 crags',        'Active'],
  ['III', 'Community Building',       'Trail days. Cleanups. The quiet work of turning a carpark of climbers into a coalition that can speak with one voice.',           '6 chapters',      'Growing'],
  ['IV',  'Education & Stewardship',  'Leave-no-trace in practice. First Nations partnerships. Ecology-led access planning with qualified consultants.',                'State-wide',      'Ongoing'],
]
</script>
