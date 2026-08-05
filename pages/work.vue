<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader
      eyebrow="THE WORK"
      lede="The work isn't a campaign. It's the steady, decade-long discipline of making climbing visible to the institutions that hold the keys to the land."
    >
      Four pillars, <span class="italic">one coalition</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <!-- Pillar sections -->
    <section
      v-for="(pillar, i) in pillars"
      :key="pillar.n"
      class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[120px]"
      :class="i % 2 === 0 ? 'bg-cream-deep' : 'bg-cream'"
    >
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr_1fr] gap-12 lg:gap-8">
        <!-- Col 1: roman numeral -->
        <div>
          <p class="font-serif italic text-green m-0 leading-none" style="font-size: 96px">{{ pillar.n }}</p>
        </div>

        <!-- Col 2: name + blurb -->
        <div>
          <h2
            class="font-serif font-medium m-0 mb-6 leading-none"
            style="font-size: clamp(40px, 5vw, 64px)"
          >
            {{ pillar.name }}<span class="text-wattle">.</span>
          </h2>
          <p class="font-serif italic text-[22px] text-ink-soft leading-[1.45] m-0">{{ pillar.blurb }}</p>
        </div>

        <!-- Col 3: detail + stats -->
        <div>
          <p class="font-serif text-[18px] text-ink-soft leading-[1.65] m-0 mb-12">{{ pillar.detail }}</p>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="[num, label] in pillar.stats" :key="label">
              <p class="font-serif text-[36px] text-ink m-0 leading-none">{{ num }}</p>
              <p class="font-mono text-[10px] tracking-[0.18em] text-green uppercase m-0 mt-1">{{ label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'The Work · Acacia Climbing Coalition' })

const pillars = [
  {
    n: 'I',
    name: 'Crag Advocacy',
    blurb: 'Securing formal recognition with councils, land managers and Traditional Owner groups.',
    detail: 'We document the climbing record at each crag, build the planning case, and represent climbers in council submissions, hearings and access negotiations. Where access is at risk, we are the named party in the room.',
    stats: [['12', 'crags'], ['2', 'recognitions'], ['7', 'in negotiation']] as [string, string][],
  },
  {
    n: 'II',
    name: 'Crag Documentation',
    blurb: 'A public register of every climbing area in South East Queensland — visible, defensible, complete.',
    detail: 'The register records location, land tenure, climbing history, environmental sensitivities, and current access status for every documented crag. It is the evidentiary spine that planning submissions, environmental reviews and partner conversations all draw from.',
    stats: [['86', 'crags logged'], ['1,240', 'routes documented'], ['v.2.4', 'release']] as [string, string][],
  },
  {
    n: 'III',
    name: 'Community Building',
    blurb: 'Connecting climbers, gyms, advocates and Traditional Owners into a single coalition voice.',
    detail: 'Acacia hosts crag clean-ups, council deputations, education evenings at partner gyms, and Country-walks led by Traditional Owners. The coalition exists because climbers showed up — every event, every submission, every season.',
    stats: [['28', 'events / year'], ['2,400+', 'members'], ['9', 'partner gyms']] as [string, string][],
  },
  {
    n: 'IV',
    name: 'Education & Stewardship',
    blurb: 'Training the next generation of climber-stewards in ethics, ecology, and Country.',
    detail: 'Our stewardship curriculum runs in partner gyms and at the crags themselves: minimum-impact practice, ecological awareness, Country protocol, and the planning literacy climbers need to participate in their own access conversations.',
    stats: [['340', 'climbers trained'], ['4', 'curricula released'], ['MMXXVI', 'cohort open']] as [string, string][],
  },
]
</script>
