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
          <p class="font-serif text-[18px] text-ink-soft leading-[1.65] m-0" :class="pillar.stats.length ? 'mb-12' : ''">{{ pillar.detail }}</p>
          <div v-if="pillar.stats.length" class="grid grid-cols-3 gap-4">
            <div v-for="[num, label] in pillar.stats" :key="label" class="min-w-0">
              <p class="font-serif text-[clamp(22px,7vw,36px)] text-ink m-0 leading-none [overflow-wrap:anywhere]">{{ num }}</p>
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

// Keep stats true. Only show numbers we can back up (they come from the crag register).

const pillars = [
  {
    n: 'I',
    name: 'Crag Advocacy',
    blurb: 'Working with councils and land managers to get outdoor bouldering formally recognised.',
    detail: 'We research each crag, talk with council and rangers, build the case for recognition, and speak up for climbers when access decisions get made.',
    stats: [['5', 'crags'], ['1', 'recognised'], ['2', 'in progress']] as [string, string][],
  },
  {
    n: 'II',
    name: 'Crag Documentation',
    blurb: 'A public register of climbing areas in South East Queensland, growing crag by crag.',
    detail: 'For each crag we record location, council, access status and progress, and digitise the guidebook on KAYA. A documented crag is a lot easier to protect.',
    stats: [['5', 'on the register'], ['2,000+', 'problems across them'], ['KAYA', 'guidebook home']] as [string, string][],
  },
  {
    n: 'III',
    name: 'Community Building',
    blurb: 'Bringing climbers, gyms and local advocates together as one voice.',
    detail: "We're starting small: crag clean-ups, track work and getting climbers along to council conversations. Gym partnerships and community nights are on the wish list. Keen to help make them happen? We'd love that.",
    stats: [] as [string, string][],
  },
  {
    n: 'IV',
    name: 'Education & Stewardship',
    blurb: 'Helping climbers look after the places they climb.',
    detail: "We'd love to run stewardship sessions in gyms and at the crags: minimum-impact climbing, respecting Country, and how access actually works. It's on the roadmap, and we're looking for people to help shape it.",
    stats: [] as [string, string][],
  },
]
</script>
