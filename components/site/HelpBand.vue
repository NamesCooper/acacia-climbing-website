<template>
  <!-- Words, pills and colours come from '"Got an hour?" band' in the Studio -->
  <section v-if="band" id="help" class="bg-forest text-paper border-t-[3px] border-outline scroll-mt-6">
    <div class="max-w-[1000px] mx-auto px-6 pt-22 pb-20 text-center">
      <img src="/brand/sprig-gold.png" alt="" class="anim-bob mx-auto w-16 h-auto" />
      <h2 class="mt-4 mb-0 font-grotesk font-extrabold uppercase text-[clamp(44px,7vw,76px)] leading-[0.95] tracking-[-0.03em]">
        {{ band.heading }}
        <span v-if="band.accent" class="font-serif italic font-semibold normal-case tracking-[-0.01em] text-wattle">{{ band.accent }}</span>
      </h2>
      <p v-if="band.intro" class="mt-5 mb-0 text-lg text-paper/85">{{ band.intro }}</p>
      <ul v-if="band.pills?.length" class="list-none p-0 m-0 mt-8 flex flex-wrap justify-center gap-3">
        <li v-for="(p, i) in band.pills" :key="p._key ?? p.label">
          <NuxtLink
            v-bind="chromeLink(p.link)"
            class="tilt inline-block no-underline text-forest border-2 border-paper rounded-full px-5 py-3 font-bold"
            :class="PILL_BG[stegaClean(p.colour ?? '')] ?? PILL_BG.wattle"
            :style="{ '--tilt': TILTS[i % TILTS.length] + 'deg' }"
          >{{ p.label }}</NuxtLink>
        </li>
      </ul>
      <NuxtLink
        v-if="band.linkLabel && band.linkHref"
        v-bind="chromeLink(band.linkHref)"
        class="inline-block mt-8 font-grotesk font-bold text-lg text-wattle"
      >{{ band.linkLabel }} →</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { stegaClean } from '@sanity/client/stega'

const { data } = await useSiteChrome()
const band = computed(() => data.value?.helpBand)

const TILTS = [-3, 2, -2, 3]
const PILL_BG: Record<string, string> = {
  wattle: 'bg-wattle',
  lichen: 'bg-lichen',
  sandstone: 'bg-sandstone',
  paper: 'bg-paper-light',
}
</script>
