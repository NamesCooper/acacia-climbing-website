<template>
  <section class="px-4 sm:px-6 lg:px-12 py-12 md:py-16 lg:py-24 border-b border-green bg-cream">
    <div class="flex flex-col lg:grid lg:gap-16 gap-10" style="grid-template-columns: 1fr 2fr">

      <!-- Left -->
      <div>
        <h2
          class="font-serif font-normal m-0 mt-4 tracking-tight"
          style="font-size: clamp(32px, 4.5vw, 72px); line-height: 0.9"
        >
          A coalition,<br/>
          <span class="italic">not a silo</span><span class="text-wattle">.</span>
        </h2>
        <p
          class="font-serif italic mt-6 leading-[1.55] text-ink-soft"
          style="font-size: clamp(17px, 1.7vw, 22px); max-width: 420px"
        >
          ACC operates as the South East Queensland chapter under the ACAQ umbrella,
          partnered with KAYA for open documentation. The long-term vision is a national
          coalition of chapters, each with local knowledge, shared frameworks.
        </p>
      </div>

      <!-- Right: 2×2 partner cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
        <div
          v-for="p in partners"
          :key="p.name"
          class="border border-ink p-6 lg:p-7 bg-cream"
        >
          <div class="font-mono text-[12px] tracking-[0.2em] text-wattle uppercase mb-3.5">{{ p.rel }}</div>
          <div
            class="font-serif font-medium leading-none tracking-[-0.01em]"
            style="font-size: clamp(20px, 2.5vw, 36px)"
          >{{ p.name }}</div>
          <div class="font-serif italic text-[15px] lg:text-[18px] text-ink-soft mt-1">{{ p.role }}</div>
          <p class="text-[14px] lg:text-[15px] leading-relaxed text-ink-soft mt-4 mb-0">{{ p.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const partners = [
  {
    name: 'ACAQ',
    role: 'Umbrella organisation',
    body: 'Australian Climbing Association Queensland. Our formal parent body; ACC operates as its SEQ chapter. State-level advocacy, insurance, legal standing.',
    rel: 'Chapter of',
  },
  {
    name: 'KAYA',
    role: 'Guidebook platform',
    body: 'Every documented crag published openly on KAYA. Topos, photos, first-ascent records. Free for climbers; maintained by the coalition.',
    rel: 'Data partner',
  },
  {
    name: 'Brisbane City Council',
    role: 'Land manager',
    body: 'First council to formally recognise bouldering (Tooheys Forest, 2025). Co-signed management plan. Template for further councils.',
    rel: 'Recognising authority',
  },
  {
    name: 'Traditional Owners',
    role: 'Country',
    body: 'Ongoing consultation with TOs across SEQ country. No access advocacy proceeds without country-first conversation.',
    rel: 'In consultation',
  },
]
</script>
