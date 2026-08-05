<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader
      eyebrow="GET INVOLVED"
      lede="Three ways to stand with the coalition. Pick the one that fits the season you're in."
    >
      The work <span class="italic">is all of us</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <section class="px-4 sm:px-6 lg:px-14">
      <NuxtLink
        v-for="action in actions"
        :key="action.to"
        :to="action.to"
        class="group grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-4 lg:gap-12 items-center border-b border-ink py-12 lg:py-16 no-underline hover:bg-cream-deep transition-colors -mx-4 sm:-mx-6 lg:-mx-14 px-4 sm:px-6 lg:px-14"
      >
        <div class="font-mono text-[11px] tracking-[0.22em] text-green uppercase">{{ action.label }}</div>
        <div>
          <h2
            class="font-serif font-medium m-0 mb-3 leading-none tracking-[-0.02em]"
            style="font-size: clamp(28px, 3.5vw, 48px)"
          >
            {{ action.heading }}<span class="text-wattle">.</span>
          </h2>
          <p class="font-serif italic text-[18px] text-ink-soft leading-snug m-0">{{ action.body }}</p>
        </div>
        <div class="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/40 group-hover:text-ink transition-colors shrink-0">
          {{ action.cta }} →
        </div>
      </NuxtLink>
    </section>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Get Involved · Acacia Climbing Coalition' })

const actions = [
  {
    label: 'Volunteer',
    heading: 'Give your time',
    body: 'Crag care days, council deputations, documentation surveys, stewardship teaching. Field and desk roles across SEQ.',
    cta: 'Get involved',
    to: '/volunteer',
  },
  {
    label: 'Report',
    heading: 'Eyes on the ground',
    body: 'Closed crags, new signage, changed access routes. Every report is logged, assessed, and followed up by the advocacy team.',
    cta: 'File a report',
    to: '/report',
  },
  {
    label: 'Donate',
    heading: 'Fund the work',
    body: 'Tax-deductible giving through an ACNC-registered DGR. Every dollar goes to documentation, submissions, and advocacy.',
    cta: 'Give now',
    to: '/donate',
  },
]
</script>
