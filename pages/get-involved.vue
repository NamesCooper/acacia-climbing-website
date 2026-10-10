<template>
  <div>
    <RetroPageHeader
      eyebrow="Lend a hand"
      title="Every bit"
      accent="helps"
      lede="We're a small crew, so a bit of help goes a long way. Pick whatever suits you, flick us an email, and we'll take it from there."
    />

    <section class="max-w-[1240px] mx-auto px-6 pb-20">
      <ul class="list-none p-0 m-0 grid gap-6 md:grid-cols-2">
        <li
          v-for="(w, i) in ways"
          :id="w.id"
          :key="w.id"
          class="relative bg-paper-light border-[3px] border-outline rounded-[28px] p-7 shadow-[6px_6px_0_var(--color-outline)] overflow-hidden scroll-mt-6"
        >
          <div aria-hidden="true" class="halftone absolute -right-12 -top-12 size-44 rounded-full opacity-70" :style="{ '--dot': w.dot }" />
          <span class="relative inline-block border-2 border-forest rounded-full px-3 py-1 text-[13px] font-bold" :class="w.chip">{{ w.label }}</span>
          <h2 class="relative mt-4 mb-0 font-display text-[clamp(32px,3.6vw,44px)] leading-[1]">{{ w.title }}</h2>
          <p class="relative mt-3 mb-0 text-[17px] leading-relaxed">{{ w.body }}</p>
          <a
            :href="mailto(w.subject)"
            class="nudge relative inline-block mt-6 no-underline border-[3px] border-outline rounded-full px-5 py-2.5 font-grotesk font-extrabold shadow-[4px_4px_0_var(--color-outline)]"
            :class="i === 0 ? 'bg-moss text-paper' : 'bg-wattle'"
          >{{ w.cta }}</a>
        </li>
      </ul>
    </section>

    <!-- Anywhere in Australia -->
    <section class="max-w-[1240px] mx-auto px-6 pb-24">
      <div class="relative bg-sandstone border-[3px] border-outline rounded-[32px] p-8 sm:p-12 shadow-[8px_8px_0_var(--color-outline)] overflow-hidden">
        <div aria-hidden="true" class="halftone absolute -left-20 -bottom-24 size-80 rounded-full" style="--dot: var(--color-sandstone-deep)" />
        <div class="relative max-w-[720px]">
          <p class="m-0 font-poster text-2xl">Not in South East Queensland?</p>
          <h2 class="mt-2 mb-0 font-display text-[clamp(36px,5vw,60px)] leading-[0.95]">We want to hear from climbers everywhere</h2>
          <p class="mt-5 mb-0 text-lg leading-relaxed">
            We're starting in SEQ, but the goal is every state. If there's a crag near you with access worries, or you're already
            looking after one, tell us about it. It all helps shape where we go next.
          </p>
          <a :href="mailto('Climbing near me')" class="nudge inline-block mt-6 no-underline bg-paper-light border-[3px] border-outline rounded-full px-5 py-2.5 font-grotesk font-extrabold shadow-[4px_4px_0_var(--color-outline)]">Tell us about your local</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// The big "Got an hour?" band would just repeat this page, so hide it here
definePageMeta({ prefooter: false })

useHead({
  title: 'Get involved · Acacia Climbing Coalition',
  meta: [{ name: 'description', content: 'Volunteer, report a crag issue, help with council letters or chip in. Every bit helps keep Australian crags open.' }],
})

const mailto = (subject: string) => `mailto:hello@acaciaclimbing.org?subject=${encodeURIComponent(subject)}`

const ways = [
  {
    id: 'volunteer',
    label: 'Volunteer',
    chip: 'bg-lichen',
    dot: 'var(--color-lichen)',
    title: 'Give an hour or two',
    body: 'Crag clean-ups, track work, site visits and mapping. Weekends mostly, and no experience needed beyond knowing your way around a crag.',
    cta: "I'm keen to volunteer",
    subject: 'Keen to volunteer',
  },
  {
    id: 'report',
    label: 'Report',
    chip: 'bg-wattle',
    dot: 'var(--color-wattle-deep)',
    title: 'Be our eyes on the ground',
    body: "Closed tracks, new signs, damage, a gate that wasn't there last week. Tell us what you've seen, where and when, and we'll log it and follow it up.",
    cta: 'Report a crag issue',
    subject: 'Crag report',
  },
  {
    id: 'council',
    label: 'Speak up',
    chip: 'bg-sandstone',
    dot: 'var(--color-sandstone-deep)',
    title: 'Help with council letters',
    body: "When a council is deciding something, letters from local climbers really count. We'll let you know when it matters and help with what to say.",
    cta: 'Count me in',
    subject: 'Keen to help with council letters',
  },
  {
    id: 'donate',
    label: 'Donate',
    chip: 'bg-paper border-dashed',
    dot: 'var(--color-wattle)',
    title: 'Chip in for the crags',
    body: "Donations go straight to signage, mapping and council submissions. We're not a registered charity yet, so it isn't tax-deductible for now.",
    cta: "I'd like to donate",
    subject: 'Donating to Acacia',
  },
]
</script>
