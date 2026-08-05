<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader
      eyebrow="VOLUNTEER"
      lede="Field work, desk work, council hearings — the coalition runs on people who show up. There's a role for every kind of contributor."
    >
      Give your <span class="italic">time</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <section class="border-b border-ink px-4 sm:px-6 lg:px-14 py-30">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed">
          Register
        </div>
        <div class="max-w-160">
          <p class="font-serif text-[20px] text-ink-soft leading-[1.65] m-0 mb-10">
            Crag care days, documentation surveys, council deputations, stewardship teaching, and operations support. Email us with your location, availability, and what interests you — we'll be in touch before the next field day.
          </p>
          <a
            href="mailto:volunteer@acaciaclimbing.org"
            class="font-mono text-[11px] tracking-[0.22em] uppercase bg-ink text-cream no-underline px-8 py-4 hover:opacity-90 transition-opacity inline-block"
          >
            volunteer@acaciaclimbing.org →
          </a>
        </div>
      </div>
    </section>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Volunteer · Acacia Climbing Coalition' })
</script>
