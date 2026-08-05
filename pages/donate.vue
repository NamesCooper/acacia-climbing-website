<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader
      eyebrow="DONATE"
      lede="Acacia is an ACNC-registered DGR. Donations are tax-deductible and go directly to crag documentation, council submissions, and access advocacy."
    >
      Fund the <span class="italic">work</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <section class="border-b border-ink px-4 sm:px-6 lg:px-14 py-30">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed">
          Give
        </div>
        <div class="max-w-160">
          <p class="font-serif text-[20px] text-ink-soft leading-[1.65] m-0 mb-10">
            Every dollar funds the steady, unglamorous work of access advocacy — surveys, submissions, hearings, and stewardship. No overhead fluff.
          </p>
          <a
            href="mailto:donate@acaciaclimbing.org"
            class="font-mono text-[11px] tracking-[0.22em] uppercase bg-wattle text-ink no-underline px-8 py-4 hover:opacity-90 transition-opacity inline-block"
          >
            Donate now →
          </a>
        </div>
      </div>
    </section>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Donate · Acacia Climbing Coalition' })
</script>
