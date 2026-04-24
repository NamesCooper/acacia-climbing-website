<template>
  <section class="px-4 sm:px-6 lg:px-12 py-12 md:py-16 lg:py-24 bg-cream border-b border-ink">
    <div class="flex flex-col lg:grid lg:gap-16 gap-10" style="grid-template-columns: 1fr 1fr">
      <div>
        <div class="font-mono text-[10px] tracking-[0.2em] text-wattle mb-4">
          HOW TO HELP
        </div>
        <h2
          class="font-serif font-normal m-0 tracking-[-0.03em]"
          style="font-size: clamp(30px, 6vw, 96px); line-height: 0.9"
        >
          The work is<br />
          <span class="italic">all of us</span><span class="text-wattle">.</span>
        </h2>
        <p
          class="font-serif leading-normal text-ink-soft mt-5 lg:mt-6"
          style="font-size: clamp(15px, 1.8vw, 20px); max-width: 460px"
        >
          No roles, no structure. Just climbers doing what they can –
          documenting crags, showing up well, keeping access alive for everyone.
        </p>
        <button
          class="mt-6 lg:mt-8 bg-ink text-cream border-none px-6 lg:px-8 py-4 lg:py-4.5 font-sans text-[13px] font-semibold tracking-widest uppercase cursor-pointer hover:bg-ink-soft transition-colors"
        >
          Join the Coalition →
        </button>
      </div>

      <div>
        <div
          v-for="([title, desc], i) in actions"
          :key="title"
          class="grid gap-4 lg:gap-6 py-5 lg:py-7 items-start border-t border-ink"
          :class="{ 'border-b': i === actions.length - 1 }"
          style="grid-template-columns: 44px 1fr auto"
        >
          <span class="font-mono text-[11px] text-wattle tracking-widest">0{{ i + 1 }} →</span>
          <div>
            <h4
              class="font-serif m-0 mb-1.5 font-medium tracking-[-0.01em]"
              style="font-size: clamp(18px, 2vw, 26px)"
            >{{ title }}</h4>
            <p class="text-[13px] text-ink-soft m-0 leading-[1.55]">{{ desc }}</p>
          </div>
          <span class="font-serif italic text-[20px] pt-1">→</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const actions = [
  ['Document on KAYA', 'Topo photos, beta, FA notes. In the field next weekend? Start there.'],
  ['Tell other climbers', 'Word of mouth is still the fastest map. Share this site.'],
  ['Steward a crag', 'Adopt a wall. Show up to cleanup days. Ten people per crag is enough.'],
  ['Start a chapter', 'Outside SEQ? The framework travels. Get in touch.'],
]
</script>
