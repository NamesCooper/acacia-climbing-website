<template>
  <!-- A big forest-green poster card sitting on the paper, with the small print underneath.
       Words and links come from "Footer" in the Studio; the button reuses the nav's yellow button. -->
  <footer class="px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
    <div class="relative max-w-[1240px] mx-auto bg-forest text-paper border-[3px] border-outline rounded-[28px] sm:rounded-[36px] shadow-[8px_8px_0_var(--color-outline)] overflow-hidden">
      <div aria-hidden="true" class="halftone absolute -left-28 -bottom-36 size-[340px] rounded-full opacity-60 hidden lg:block" style="--dot: var(--color-moss)"></div>
      <UiSparkle class="absolute right-[7%] top-8 text-wattle hidden sm:block" :size="34" />

      <div class="relative grid gap-12 px-7 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div class="max-w-[420px]">
          <NuxtLink to="/" aria-label="Acacia Climbing Coalition, home" class="no-underline text-paper-light">
            <UiWordmark :size="48" />
          </NuxtLink>
          <p v-if="footer?.tagline" class="mt-6 mb-0 font-display text-[clamp(30px,3.6vw,40px)] leading-[1.02] text-wattle">{{ footer.tagline }}</p>
          <UiButton v-if="button" v-bind="button" variant="wattle" class="mt-7">{{ nav?.buttonLabel }}</UiButton>
        </div>

        <nav aria-label="Footer" class="flex flex-wrap gap-x-12 gap-y-10 lg:justify-end">
          <div v-for="(col, i) in footer?.columns ?? []" :key="col._key ?? col.heading" class="min-w-[130px]">
            <p
              class="tilt m-0 inline-block border-2 border-outline rounded-full px-3 py-1 font-grotesk font-extrabold text-xs uppercase tracking-[0.08em] text-forest"
              :class="CHIP_BG[i % CHIP_BG.length]"
              :style="{ '--tilt': TILTS[i % TILTS.length] + 'deg' }"
            >{{ col.heading }}</p>
            <ul class="list-none p-0 m-0 mt-4 flex flex-col gap-2.5">
              <li v-for="l in col.links ?? []" :key="l._key ?? l.label">
                <NuxtLink
                  v-bind="chromeLink(l.link)"
                  class="font-bold text-paper/90 no-underline hover:text-wattle hover:underline decoration-2 underline-offset-4 [overflow-wrap:break-word]"
                >{{ l.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <div class="max-w-[1240px] mx-auto mt-6 px-1 flex flex-wrap justify-between gap-x-6 gap-y-2 text-[13px] text-outline/75">
      <span>© {{ year }}<template v-if="footer?.smallPrint">{{ ' ' }}{{ footer.smallPrint }}</template></span>
      <span v-if="footer?.smallPrintRight">{{ footer.smallPrintRight }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const { data } = await useSiteChrome()
const footer = computed(() => data.value?.footer)
const nav = computed(() => data.value?.nav)

// The nav's "Lend a hand" button, repeated at the bottom for people who scrolled all the way
const button = computed(() => (nav.value?.buttonLabel && nav.value.buttonLink ? chromeLink(nav.value.buttonLink) : null))

const CHIP_BG = ['bg-wattle', 'bg-lichen', 'bg-sandstone', 'bg-paper-light']
const TILTS = [-2, 1.5, -1.5, 2]
</script>
