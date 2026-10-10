<template>
  <section class="bg-forest text-paper border-t-[3px] border-outline">
    <div class="max-w-[1000px] mx-auto px-6 pt-22 pb-20 text-center">
      <img src="/brand/sprig-gold.png" alt="" class="anim-bob mx-auto w-16 h-auto" />
      <h2 class="mt-4 mb-0 font-grotesk font-extrabold uppercase text-[clamp(44px,7vw,76px)] leading-[0.95] tracking-[-0.03em]">
        Got an hour?
        <span class="font-serif italic font-semibold normal-case tracking-[-0.01em] text-wattle">We'd love the help.</span>
      </h2>
      <ul class="list-none p-0 m-0 mt-9 flex flex-wrap justify-center gap-3">
        <li v-for="(p, i) in pills" :key="p.label">
          <NuxtLink
            :to="p.to"
            class="tilt inline-block no-underline text-forest border-2 border-paper rounded-full px-5 py-3 font-bold"
            :class="p.bg"
            :style="{ '--tilt': tilts[i] + 'deg' }"
          >{{ p.label }}</NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const tilts = [-3, 2, -2, 3]
const pills = [
  { label: 'Clean-up days', to: '/volunteer', bg: 'bg-wattle' },
  { label: 'Track work', to: '/volunteer', bg: 'bg-lichen' },
  { label: 'Writing to council', to: '/get-involved', bg: 'bg-sandstone' },
  { label: 'Telling us about your local', to: '/report', bg: 'bg-paper-light' },
]
</script>
