<template>
  <!-- Full-width forest band, matching the nav: the "Got an hour?" ask on top (unless a page turns
       it off), then the logo, links and small print. Words come from the Studio's
       '"Got an hour?" band' and 'Footer' documents. -->
  <footer class="relative mt-12 sm:mt-16 bg-forest text-paper border-t-[3px] border-outline overflow-hidden">
    <div aria-hidden="true" class="halftone absolute -right-32 -top-40 size-[380px] rounded-full opacity-40 hidden lg:block" style="--dot: var(--color-moss)"></div>
    <div class="relative max-w-[1240px] mx-auto">

      <!-- The ask -->
      <section v-if="showHelp && band" id="help" aria-labelledby="help-heading" class="relative px-6 pt-16 pb-12 sm:pt-20 sm:pb-14 text-center scroll-mt-6">
        <UiSparkle class="absolute left-[7%] top-10 text-wattle hidden sm:block" :size="34" />
        <UiSparkle class="absolute right-[8%] bottom-12 text-wattle hidden sm:block" :size="26" delay="1s" />
        <img src="/brand/sprig-gold.png" alt="" class="anim-bob mx-auto w-14 h-auto" />
        <h2 id="help-heading" class="mt-4 mb-0 font-grotesk font-extrabold uppercase text-[clamp(40px,6.5vw,72px)] leading-[0.95] tracking-[-0.03em] text-balance">
          {{ band.heading }}
          <span v-if="band.accent" class="font-serif italic font-semibold normal-case tracking-[-0.01em] text-wattle">{{ band.accent }}</span>
        </h2>
        <p v-if="band.intro" class="mt-5 mb-0 text-lg text-paper/85">{{ band.intro }}</p>
        <ul v-if="band.pills?.length" class="list-none p-0 m-0 mt-8 flex flex-wrap justify-center gap-3">
          <li v-for="(p, i) in band.pills" :key="p._key ?? p.label">
            <NuxtLink
              v-bind="chromeLink(p.link)"
              class="tilt inline-block no-underline text-forest border-[3px] border-outline rounded-full px-5 py-3 font-bold shadow-[3px_3px_0_var(--color-outline)]"
              :class="PILL_BG[stegaClean(p.colour ?? '')] ?? PILL_BG.wattle"
            >{{ p.label }}</NuxtLink>
          </li>
        </ul>
        <NuxtLink
          v-if="band.linkLabel && band.linkHref"
          v-bind="chromeLink(band.linkHref)"
          class="inline-block mt-8 font-grotesk font-bold text-lg text-wattle"
        >{{ band.linkLabel }} →</NuxtLink>
      </section>

      <!-- Dashed "tear here" line between the ask and the links -->
      <div v-if="showHelp && band" aria-hidden="true" class="mx-6 border-t-[3px] border-dashed border-paper/20"></div>

      <!-- Logo and links -->
      <div class="relative grid gap-12 px-6 py-10 sm:py-14 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <UiSparkle v-if="!showHelp" class="absolute right-[7%] top-8 text-wattle hidden sm:block" :size="34" />
        <div class="max-w-[420px]">
          <NuxtLink to="/" aria-label="Acacia Climbing Coalition, home" class="no-underline text-paper-light">
            <UiWordmark :size="48" tagline />
          </NuxtLink>
          <p v-if="footer?.tagline" class="mt-6 mb-0 font-display text-[clamp(28px,3.2vw,36px)] leading-[1.04] text-wattle">{{ footer.tagline }}</p>
          <!-- The help ask already has its own buttons, so only show this when it's switched off -->
          <UiButton v-if="!showHelp && button" v-bind="button" variant="wattle" class="mt-7">{{ nav?.buttonLabel }}</UiButton>
        </div>

        <nav aria-label="Footer" class="flex flex-wrap gap-x-12 gap-y-10 lg:justify-end">
          <div v-for="(col, i) in footer?.columns ?? []" :key="col._key ?? col.heading" class="min-w-[130px]">
            <p
              class="m-0 inline-block border-2 border-outline rounded-full px-3 py-1 font-grotesk font-extrabold text-xs uppercase tracking-[0.08em] text-forest"
              :class="CHIP_BG[i % CHIP_BG.length]"
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

      <!-- Small print -->
      <div class="relative mx-6 py-6 border-t-2 border-paper/15 flex flex-wrap justify-between gap-x-6 gap-y-2 text-[13px] text-paper/70">
        <span>© {{ year }}<template v-if="footer?.smallPrint">{{ ' ' }}{{ footer.smallPrint }}</template></span>
        <span v-if="footer?.smallPrintRight">{{ footer.smallPrintRight }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { stegaClean } from '@sanity/client/stega'

const year = new Date().getFullYear()
const route = useRoute()
const { data } = await useSiteChrome()
const footer = computed(() => data.value?.footer)
const nav = computed(() => data.value?.nav)
const band = computed(() => data.value?.helpBand)

// Vue pages turn the ask off with definePageMeta({ prefooter: false });
// Studio pages with their "Got an hour?" switch off are listed in noHelpPages.
const slug = computed(() => (route.path === '/' ? 'home' : route.path.replace(/^\/|\/$/g, '')))
const showHelp = computed(() => route.meta.prefooter !== false && !data.value?.noHelpPages?.includes(slug.value))

// The nav's "Lend a hand" button, for pages without the ask
const button = computed(() => (nav.value?.buttonLabel && nav.value.buttonLink ? chromeLink(nav.value.buttonLink) : null))

const CHIP_BG = ['bg-wattle', 'bg-lichen', 'bg-sandstone', 'bg-paper-light']
const PILL_BG: Record<string, string> = { wattle: 'bg-wattle', lichen: 'bg-lichen', sandstone: 'bg-sandstone', paper: 'bg-paper-light' }
</script>
