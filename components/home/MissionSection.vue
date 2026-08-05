<template>
  <section class="px-4 sm:px-6 lg:px-12 py-12 md:py-16 lg:py-24 border-b border-green bg-cream">
    <div class="flex flex-col lg:grid lg:gap-12 gap-8" style="grid-template-columns: 1fr 3fr">

      <!-- Left: label -->
      <div class="lg:pt-3">
        <div
          class="font-serif italic mt-4 lg:mt-6 font-normal leading-[0.95]"
          style="font-size: clamp(48px, 4vw, 56px)"
        >
          Our<br/>mission.
        </div>
      </div>

      <!-- Right: statement + audiences -->
      <div>
        <p
          class="font-serif font-normal m-0 leading-[1.15] tracking-[-0.015em]"
          style="font-size: clamp(26px, 3.5vw, 48px); text-wrap: pretty"
        >
          To unite the climbing community and <em>professionalise</em> what
          has been, for decades, a scattered volunteer effort, so that outdoor
          climbing in Australia is <em>recognised</em>, <em>documented</em>,
          and <em>defensible</em> for everyone who comes next.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 lg:mt-12 pt-8 lg:pt-10 border-t border-green">
          <div v-for="[k, v] in audiences" :key="k">
            <div class="font-mono text-[10px] tracking-[0.18em] text-green uppercase mb-3">{{ k }}</div>
            <p
              class="font-serif italic m-0 leading-snug"
              style="font-size: clamp(18px, 1.8vw, 24px)"
            >{{ v }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const audiences = [
  ['For climbers', 'Open crags. Accurate topos. A community with a voice.'],
  ['For councils', 'Credible counterparty. Evidence-based submissions. Real stewardship.'],
  ['For country', 'Ecology-first access. Partnership with Traditional Owners. The land first, always.'],
]
</script>
