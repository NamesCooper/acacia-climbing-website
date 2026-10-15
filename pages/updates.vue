<template>
  <div>
    <SitePageHeader
      eyebrow="Updates"
      title="What's been"
      accent="happening"
      lede="A running record of the work, crag by crag. Every meeting, submission, sign and clean-up, as it happens."
    />

    <section class="max-w-[1000px] mx-auto px-6 pb-24">
      <!-- Empty state -->
      <div v-if="!updates.length" class="relative bg-paper-light border-[3px] border-outline rounded-[28px] p-8 sm:p-10 shadow-[6px_6px_0_var(--color-outline)] overflow-hidden">
        <div aria-hidden="true" class="halftone absolute -right-16 -top-16 size-56 rounded-full" style="--dot: var(--color-wattle)" />
        <p class="relative m-0 font-display text-[clamp(30px,4vw,44px)] leading-[1.05]">First updates coming soon</p>
        <p class="relative mt-4 mb-0 text-lg leading-relaxed max-w-[600px]">
          We've just rebuilt the site, and updates from the crags will land here as things happen.
          In the meantime, the crag map shows where each crag is up to.
        </p>
        <NuxtLink to="/progress" class="nudge relative inline-block mt-6 no-underline bg-wattle border-[3px] border-outline rounded-full px-5 py-2.5 font-grotesk font-extrabold shadow-[4px_4px_0_var(--color-outline)]">See the crag map</NuxtLink>
      </div>

      <!-- Updates -->
      <ol v-else class="list-none p-0 m-0 flex flex-col gap-6">
        <li
          v-for="u in updates"
          :id="u.slug"
          :key="u.slug"
          class="bg-paper-light border-[3px] border-outline rounded-[28px] p-7 sm:p-8 shadow-[6px_6px_0_var(--color-outline)] scroll-mt-6"
        >
          <div class="flex flex-wrap items-center gap-2">
            <time :datetime="u.date" class="inline-block bg-wattle border-2 border-forest rounded-full px-3 py-1 text-[13px] font-bold">{{ formatDate(u.date) }}</time>
            <span v-for="c in u.crags ?? []" :key="c.id" class="inline-block bg-paper border-2 border-forest rounded-full px-3 py-1 text-[13px] font-bold">{{ c.name }}</span>
          </div>
          <h2 class="mt-4 mb-0 font-display text-[clamp(28px,3.4vw,40px)] leading-[1.05]">{{ u.title }}</h2>
          <p class="mt-3 mb-0 text-lg leading-relaxed">{{ u.summary }}</p>
          <div v-if="u.body?.length" class="update-body mt-4 text-[17px] leading-relaxed">
            <PortableText :value="u.body" />
          </div>
        </li>
      </ol>

      <!-- Day to day, the small stuff goes on Instagram first -->
      <div class="mt-12 bg-gum border-[3px] border-outline rounded-[28px] p-7 sm:p-9 shadow-[6px_6px_0_var(--color-outline)] flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 justify-between">
        <div>
          <p class="m-0 font-poster text-[22px] sm:text-[24px] leading-tight">For the day-to-day</p>
          <h2 class="mt-1 mb-0 font-display text-[clamp(28px,3.4vw,38px)] leading-[1.05]">Follow along on Instagram</h2>
          <p class="mt-3 mb-0 text-[17px] leading-relaxed max-w-[520px]">Crag days, mapping trips and the small wins land there first. The big milestones end up here.</p>
        </div>
        <a
          href="https://www.instagram.com/acaciaclimbing/"
          target="_blank"
          rel="noopener"
          class="nudge self-start sm:self-center flex-shrink-0 inline-flex items-center gap-2 no-underline text-outline bg-paper-light border-[3px] border-outline rounded-full px-6 py-3 font-grotesk font-extrabold shadow-[4px_4px_0_var(--color-outline)]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
          @acaciaclimbing<span class="sr-only"> on Instagram (opens in a new tab)</span>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'

usePageSeo({
  title: () => 'Updates · Acacia Climbing Coalition',
  description: () => 'The latest from the crags: council meetings, submissions, signage and clean-ups.',
})

const { data: updates } = await useUpdates()

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<style scoped>
.update-body :deep(p) { margin: 0 0 1em; }
.update-body :deep(a) { color: var(--color-moss); font-weight: 700; }
.update-body :deep(img) { max-width: 100%; height: auto; border: 3px solid var(--color-outline); border-radius: 20px; }
</style>
