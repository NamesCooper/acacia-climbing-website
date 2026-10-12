<template>
  <!-- Everything stacks in one centred column: sprig badge, lead-in, headline, intro, buttons -->
  <section class="relative max-w-[1100px] mx-auto px-6 pt-10 pb-16 sm:pt-16 sm:pb-24 flex flex-col items-center text-center">
    <!-- Sparkles sit out at the edges on bigger screens, clear of the words -->
    <UiSparkle class="absolute left-[3%] top-[30%] text-outline hidden md:block" :size="56" />
    <UiSparkle class="absolute right-[4%] top-[14%] text-outline hidden md:block" :size="40" delay=".8s" />
    <UiSparkle class="absolute right-[8%] bottom-[18%] text-outline hidden md:block" :size="30" delay="1.4s" />

    <span class="relative inline-flex items-center justify-center size-16 sm:size-20 rounded-full bg-paper-light border-[3px] border-outline shadow-[4px_4px_0_var(--color-outline)]">
      <img src="/brand/sprig-gold.png" alt="" class="anim-bob w-9 sm:w-11 h-auto" />
    </span>

    <p v-if="label" class="relative mt-6 mb-0 max-w-[640px] font-poster text-[clamp(22px,3.2vw,32px)] leading-tight text-balance">{{ label }}</p>

    <!-- Two-ink riso headline: the wattle copy sits slightly off-register behind the dark one.
         Each line typed in the Studio becomes its own line here. -->
    <h1 class="relative mt-4 sm:mt-5 mb-0 font-display text-[clamp(60px,12.5vw,148px)] leading-[0.9] tracking-[-0.025em]">
      <span aria-hidden="true" class="absolute inset-0 text-wattle translate-x-[5px] translate-y-[5px] sm:translate-x-[6px] sm:translate-y-[6px] whitespace-pre-line">{{ heading }}</span>
      <span class="relative whitespace-pre-line">{{ heading }}</span>
    </h1>

    <p v-if="body" class="relative mt-7 sm:mt-9 mb-0 max-w-[620px] text-lg sm:text-xl leading-relaxed text-balance">{{ body }}</p>

    <!-- Same-width buttons, side by side on bigger screens, stacked on phones -->
    <div v-if="primary || secondary" class="relative mt-9 sm:mt-11 grid gap-4 w-full max-w-[300px] sm:max-w-none sm:w-auto sm:grid-flow-col sm:auto-cols-fr">
      <UiButton v-if="primary" :to="primary.to" :href="primary.href" variant="moss" size="lg" class="text-center">{{ primary.label }}</UiButton>
      <UiButton v-if="secondary" :to="secondary.to" :href="secondary.href" variant="paper" size="lg" class="text-center">{{ secondary.label }}</UiButton>
    </div>

    <!-- Proof line: small, true facts a council officer can check. Kept quiet on purpose
         (no outlines or shadows) so it reads as fine print, not as more buttons. -->
    <ul v-if="proof?.length" class="relative list-none p-0 m-0 mt-8 sm:mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 max-w-[760px] font-grotesk font-bold text-[14px] sm:text-[15px] leading-snug text-forest">
      <li v-for="p in proof" :key="p" class="inline-flex items-center gap-2">
        <span aria-hidden="true" class="inline-flex items-center justify-center size-5 shrink-0 rounded-full bg-lichen border-2 border-forest">
          <svg viewBox="0 0 12 12" class="size-2.5"><path d="M2 6.5 4.8 9 10 3" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
        {{ p }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Cta } from '~/types/content'

defineProps<{ label?: string; heading: string; body?: string; primary?: Cta; secondary?: Cta; proof?: string[] }>()
</script>
