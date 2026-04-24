<template>
  <section class="px-4 sm:px-6 lg:px-12 py-10 md:py-14 lg:py-18 border-b border-ink bg-cream-soft">
    <div class="flex flex-col lg:grid lg:gap-14 lg:items-center gap-8" style="grid-template-columns: 1fr 2fr">
      <div class="font-mono text-[10px] tracking-[0.2em] text-muted">
        IN COALITION WITH
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 items-start">
        <div
          v-for="[name, tagline, desc] in partners"
          :key="name"
          class="border-t border-ink pt-4"
        >
          <div
            class="font-serif tracking-[-0.01em] font-medium"
            style="font-size: clamp(22px, 2.5vw, 34px)"
          >{{ name }}</div>
          <div class="font-serif text-[13px] lg:text-[14px] italic text-ink-soft mt-1">{{ tagline }}</div>
          <div class="text-[12px] text-muted mt-3 leading-[1.55]">{{ desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const partners = [
  ['ACAQ', 'Australian Climbing Association Queensland', 'Umbrella body · advocacy with state government'],
  ['KAYA', 'Digital guidebook platform', 'Open hosting for every documented crag'],
  ['Traditional Owners', 'Across SEQ country', 'Consultation and joint stewardship'],
]
</script>
