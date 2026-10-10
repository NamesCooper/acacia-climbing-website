<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader
      eyebrow="UPDATES"
      lede="A dated record of the work, crag by crag. Every meeting, submission and installation, in order."
    >
      The <span class="italic">record</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <!-- List mode -->
    <section class="px-4 sm:px-6 lg:px-14 py-16 lg:py-24">
      <p v-if="!updates.length" class="font-serif italic text-[22px] text-ink-soft m-0">
        Updates will appear here as the work progresses.
      </p>

      <article
        v-for="u in updates"
        :id="u.slug"
        :key="u.slug"
        class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-4 lg:gap-12 py-10 border-t border-ink/20 first:border-t-ink"
      >
        <div>
          <time :datetime="u.date" class="font-mono text-[11px] tracking-[0.15em] uppercase text-green">
            {{ formatDate(u.date) }}
          </time>
          <p v-if="u.crags?.length" class="text-[12px] tracking-[0.12em] uppercase text-ink/50 mt-2 mb-0">
            {{ u.crags.map(c => c.name).join(' · ') }}
          </p>
        </div>
        <div class="max-w-[720px]">
          <h2 class="font-serif font-medium m-0 leading-[1.05]" style="font-size: clamp(28px, 3vw, 40px)">
            {{ u.title }}<span class="text-wattle">.</span>
          </h2>
          <p class="font-serif italic text-[20px] text-ink-soft leading-[1.45] mt-4 mb-0">{{ u.summary }}</p>
          <div v-if="u.body?.length" class="update-body text-[16px] leading-[1.7] text-ink-soft mt-6">
            <PortableText :value="u.body" />
          </div>
        </div>
      </article>
    </section>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'

useHead({ title: 'Updates · Acacia Climbing Coalition' })

const { data: updates } = await useUpdates()

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<style scoped>
.update-body :deep(p) { margin: 0 0 1em; }
.update-body :deep(a) { color: var(--color-ink); text-decoration: underline; }
</style>
