<template>
  <section id="help" class="bg-forest text-paper border-t-[3px] border-outline scroll-mt-6">
    <div class="max-w-[1000px] mx-auto px-6 pt-22 pb-20 text-center">
      <img src="/brand/sprig-gold.png" alt="" class="anim-bob mx-auto w-16 h-auto" />
      <h2 class="mt-4 mb-0 font-grotesk font-extrabold uppercase text-[clamp(44px,7vw,76px)] leading-[0.95] tracking-[-0.03em]">
        Got an hour?
        <span class="font-serif italic font-semibold normal-case tracking-[-0.01em] text-wattle">We'd love the help.</span>
      </h2>
      <p class="mt-5 mb-0 text-lg text-paper/85">Pick one and flick us an email. We'll take it from there.</p>
      <ul class="list-none p-0 m-0 mt-8 flex flex-wrap justify-center gap-3">
        <li v-for="(p, i) in pills" :key="p.label">
          <a
            :href="mailto(p.subject)"
            class="tilt inline-block no-underline text-forest border-2 border-paper rounded-full px-5 py-3 font-bold"
            :class="p.bg"
            :style="{ '--tilt': tilts[i] + 'deg' }"
          >{{ p.label }}</a>
        </li>
      </ul>
      <NuxtLink to="/get-involved" class="inline-block mt-8 font-grotesk font-bold text-lg text-wattle">More ways to help →</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const tilts = [-3, 2, -2, 3]
// Each pill opens an email to hello@ with the subject filled in, so the inbox is easy to sort
const pills = [
  { label: 'Clean-up days', subject: 'Keen for clean-up days', bg: 'bg-wattle' },
  { label: 'Track work', subject: 'Keen to help with track work', bg: 'bg-lichen' },
  { label: 'Writing to council', subject: 'Keen to help with council letters', bg: 'bg-sandstone' },
  { label: 'Telling us about your local', subject: 'Crag report', bg: 'bg-paper-light' },
]
const mailto = (subject: string) => `mailto:hello@acaciaclimbing.org?subject=${encodeURIComponent(subject)}`
</script>
