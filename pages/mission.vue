<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader
      eyebrow="OUR MISSION"
      lede="Acacia exists to ensure climbing in Australia is recognised, documented, and stewarded — for the climbers here now and for those who follow."
    >
      A coalition, a <span class="italic">stewardship</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <!-- Statement -->
    <section class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[120px]">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div>
          <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">Statement</p>
        </div>
        <div>
          <p
            class="font-serif m-0 leading-[1.2]"
            style="font-size: clamp(24px, 3vw, 44px)"
          >
            Climbing in Australia exists in a <span class="italic text-green">quiet uncertainty</span><span class="text-wattle">.</span> No formal status. No standing in council planning. No protection when access is withdrawn.
          </p>
          <p class="font-serif italic text-[20px] text-ink-soft leading-[1.5] mt-10 mb-0 max-w-[680px]">
            Acacia changes that — by documenting the crags, building the planning case, and standing in the room when decisions are made.
          </p>
        </div>
      </div>
    </section>

    <!-- Principles -->
    <section class="bg-cream-deep border-b border-ink px-4 sm:px-6 lg:px-14 py-[120px]">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 mb-16">
        <div>
          <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">Principles</p>
        </div>
        <div>
          <h2
            class="font-serif font-medium m-0 leading-none"
            style="font-size: clamp(40px, 5vw, 72px)"
          >
            We hold to <span class="italic">three things</span><span class="text-wattle">.</span>
          </h2>
        </div>
      </div>

      <div class="lg:pl-[228px] grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
        <div v-for="[numeral, title, body] in principles" :key="numeral">
          <p class="font-serif italic text-green m-0 leading-none" style="font-size: 56px">{{ numeral }}</p>
          <h3 class="font-serif font-medium text-[32px] mt-4 mb-0 leading-none">
            {{ title }}<span class="text-wattle">.</span>
          </h3>
          <p class="font-serif italic text-[18px] text-ink-soft leading-[1.55] mt-4 mb-0">{{ body }}</p>
        </div>
      </div>
    </section>

    <!-- Country -->
    <section class="border-b border-ink px-4 sm:px-6 lg:px-14 py-[120px]">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr_1fr] gap-8 lg:gap-12">
        <div>
          <p class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed m-0">Country</p>
        </div>
        <div>
          <h2
            class="font-serif font-medium m-0 leading-[1.05]"
            style="font-size: clamp(32px, 4vw, 56px)"
          >
            We climb on <span class="italic">unceded</span> Country<span class="text-wattle">.</span>
          </h2>
        </div>
        <div class="font-serif text-[18px] text-ink-soft leading-[1.65] flex flex-col gap-6">
          <p class="m-0">
            The crags we document sit on the Country of the Turrbal, Jagera, Jinibara, Kabi Kabi, and Yugarapul peoples, among others. We acknowledge their continuing connection to land, water and community.
          </p>
          <p class="m-0 italic text-green">
            Sovereignty was never ceded.
          </p>
          <p class="m-0">
            Acacia works in partnership with Traditional Owner groups across South East Queensland. Country consultation is a precondition of our crag documentation process — not an afterthought.
          </p>
        </div>
      </div>
    </section>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Our Mission · Acacia Climbing Coalition' })

const principles: [string, string, string][] = [
  ['I', 'Recognition', 'Outdoor climbing must be named, documented and submitted into the planning frameworks that govern the land it sits on. Invisible activities have no standing.'],
  ['II', 'Stewardship', 'Climbers are the most consistent stewards of the crags they climb. That record of care must be made legible to the institutions that hold the land.'],
  ['III', 'Coalition', 'No single climbing area, club or advocate can hold this ground alone. The coalition is the structure that makes collective action possible — and durable.'],
]
</script>
