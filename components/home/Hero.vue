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

    <!-- Optional short-term ask (set in the Studio's hero block), e.g. the feedback form.
         One pill-shaped link that sits right above the buttons. -->
    <component
      :is="noticeLink?.to ? NuxtLink : 'a'"
      v-if="notice && noticeLink"
      v-bind="noticeLink.to ? { to: noticeLink.to } : { href: noticeLink.href, target: '_blank', rel: 'noopener' }"
      class="nudge relative mt-9 sm:mt-11 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 max-w-full no-underline bg-paper-light border-[3px] border-outline rounded-[28px] sm:rounded-full pl-2.5 pr-5 py-2 shadow-[4px_4px_0_var(--color-outline)] text-[15px] sm:text-base leading-snug"
    >
      <span class="inline-block bg-wattle border-2 border-outline rounded-full px-2.5 py-0.5 font-grotesk font-extrabold text-[12px] uppercase tracking-[0.06em]">Open now</span>
      <span>{{ notice }}</span>
      <span class="font-grotesk font-extrabold whitespace-nowrap">{{ noticeLink.label }} →</span>
      <span v-if="!noticeLink.to" class="sr-only"> (opens in a new tab)</span>
    </component>

    <!-- Same-width buttons, side by side on bigger screens, stacked on phones -->
    <div v-if="primary || secondary" :class="notice && noticeLink ? 'mt-6' : 'mt-9 sm:mt-11'" class="relative grid gap-4 w-full max-w-[300px] sm:max-w-none sm:w-auto sm:grid-flow-col sm:auto-cols-fr">
      <UiButton v-if="primary" :to="primary.to" :href="primary.href" variant="moss" size="lg" class="text-center">{{ primary.label }}</UiButton>
      <UiButton v-if="secondary" :to="secondary.to" :href="secondary.href" variant="paper" size="lg" class="text-center">{{ secondary.label }}</UiButton>
    </div>

  </section>
</template>

<script setup lang="ts">
import type { Cta } from '~/types/content'

const props = defineProps<{ label?: string; heading: string; body?: string; primary?: Cta; secondary?: Cta; notice?: string; noticeLink?: Cta }>()
const NuxtLink = resolveComponent('NuxtLink')

</script>
