<template>
  <!-- Everything stacks in one centred column: lead-in, headline, intro, buttons -->
  <section class="relative max-w-[1100px] mx-auto px-6 pt-10 pb-16 sm:pt-16 sm:pb-24 flex flex-col items-center text-center">
    <!-- Two sparkles hang off the headline itself (see the h1), so they stay clear of the words
         at every width. This one sits by the buttons. -->
    <UiSparkle class="absolute right-[8%] bottom-[18%] text-outline hidden md:block" :size="30" delay="1.4s" />

    <p v-if="label" class="relative mb-0 max-w-[640px] font-poster text-[clamp(22px,3.2vw,32px)] leading-tight text-balance">{{ label }}</p>

    <!-- Two-ink riso headline: the logo-gold copy sits slightly off-register behind the dark one.
         Each line typed in the Studio becomes its own line here. -->
    <h1 class="relative mt-4 sm:mt-5 mb-0 font-display text-[clamp(60px,12.5vw,148px)] leading-[0.9] tracking-[-0.025em]">
      <span aria-hidden="true" class="absolute inset-0 text-wattle-deep translate-x-[0.05em] translate-y-[0.05em] whitespace-pre-line">{{ heading }}</span>
      <span class="relative whitespace-pre-line">{{ heading }}</span>
      <!-- Positioned in em, so they scale with the headline and always sit just outside it -->
      <UiSparkle class="absolute -left-[0.55em] top-[1.15em] text-outline hidden min-[1360px]:block" :size="48" />
      <UiSparkle class="absolute -right-[0.4em] -top-[0.1em] text-outline hidden min-[1360px]:block" :size="36" delay=".8s" />
    </h1>

    <p v-if="body" class="relative mt-7 sm:mt-9 mb-0 max-w-[620px] text-lg sm:text-xl leading-relaxed text-balance">{{ body }}</p>

    <!-- Same-width buttons, side by side on bigger screens, stacked on phones -->
    <div v-if="primary || secondary" class="relative mt-9 sm:mt-11 grid gap-4 w-full max-w-[300px] sm:max-w-none sm:w-auto sm:grid-flow-col sm:auto-cols-fr">
      <UiButton v-if="primary" :to="primary.to" :href="primary.href" variant="moss" size="lg" class="text-center">{{ primary.label }}</UiButton>
      <UiButton v-if="secondary" :to="secondary.to" :href="secondary.href" variant="paper" size="lg" class="text-center">{{ secondary.label }}</UiButton>
    </div>

  </section>
</template>

<script setup lang="ts">
import type { Cta } from '~/types/content'

defineProps<{ label?: string; heading: string; body?: string; primary?: Cta; secondary?: Cta }>()

</script>
