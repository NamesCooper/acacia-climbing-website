<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader
      eyebrow="FILE A REPORT"
      lede="If something has changed at a crag — a closure, new signage, a gate, a development — tell us. Every report is logged, assessed, and followed up."
    >
      Eyes on the <span class="italic">ground</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <section class="border-b border-ink px-4 sm:px-6 lg:px-14 py-30">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed">
          Report
        </div>
        <div class="max-w-160">
          <p class="font-serif text-[20px] text-ink-soft leading-[1.65] m-0 mb-10">
            Closures, new signage, development, changed access routes — anything that affects climbing at a crag. Email us the crag name, what you saw, and an approximate date. We aim to respond within five working days and log every report to the register.
          </p>
          <a
            href="mailto:report@acaciaclimbing.org"
            class="font-mono text-[11px] tracking-[0.22em] uppercase bg-ink text-cream no-underline px-8 py-4 hover:opacity-90 transition-opacity inline-block"
          >
            report@acaciaclimbing.org →
          </a>
        </div>
      </div>
    </section>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'File a Report · Acacia Climbing Coalition' })
</script>
