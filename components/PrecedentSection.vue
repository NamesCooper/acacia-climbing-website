<template>
  <section class="px-4 sm:px-6 lg:px-12 py-12 md:py-16 lg:py-20 lg:pb-24 border-b border-ink">
    <div class="flex flex-col lg:grid lg:gap-16 lg:items-start gap-10" style="grid-template-columns: 1fr 1fr">
      <!-- Left -->
      <div class="lg:pt-4">
        <div class="font-mono text-[10px] tracking-[0.2em] text-wattle mb-4">
          FEATURE – PRECEDENT
        </div>
        <h2
          class="font-serif font-normal m-0 tracking-[-0.03em]"
          style="font-size: clamp(32px, 7vw, 104px); line-height: 0.88"
        >
          Brisbane<br />
          City Council<br />
          <span class="italic">formally</span><br />
          <span class="italic text-wattle">recognises</span><br />
          bouldering<span class="text-wattle">.</span>
        </h2>
        <p
          class="font-serif leading-normal italic text-ink-soft mt-6 lg:mt-8"
          style="font-size: clamp(15px, 2vw, 19px); max-width: 500px"
        >
          In 2025, after eighteen months of submissions, site visits and patient diplomacy,
          Tooheys Forest Park became the first council-recognised bouldering area in South
          East Queensland. A template, now, for everywhere else.
        </p>
      </div>

      <!-- Right -->
      <div>
        <div class="w-full mb-4 lg:mb-6" style="aspect-ratio: 4/5">
          <CragPlate title="Tooheys Forest · granite" number="003" variant="b" />
        </div>

        <div
          class="grid border-t border-b border-ink"
          style="grid-template-columns: repeat(3, 1fr)"
        >
          <div
            v-for="[n, l] in stats"
            :key="l"
            class="p-4 lg:p-6 text-center"
            style="border-right: 1px solid rgba(28,42,30,0.2)"
          >
            <div
              class="font-serif font-normal leading-none tracking-[-0.02em]"
              style="font-size: clamp(28px, 4vw, 56px)"
            >{{ n }}</div>
            <div class="font-sans text-[10px] lg:text-[11px] text-muted mt-2 tracking-widest uppercase">{{ l }}</div>
          </div>
        </div>

        <div class="mt-5 lg:mt-7 text-[13px] lg:text-[14px] leading-[1.65] text-ink-soft md:columns-2 md:gap-8">
          <p class="m-0">
            The work began with a letter. Then a meeting. Then twelve meetings. A management
            plan drafted jointly with council officers, reviewed against ecological and First
            Nations heritage requirements. Signage designed. Climbers consulted. Local bolters
            looped in. A legal framework that didn't exist before, now in place.
          </p>
          <p>
            The pattern repeats. White Rock at Ipswich in negotiation. Mt Ninderry on the
            Sunshine Coast in early stages. Every crag is different; the method travels.
            <em>Show up, document properly, make the case.</em>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  ['18', 'months to recognition'],
  ['72', 'problems documented'],
  ['04', 'councils in talks'],
]
</script>
