<template>
  <div>
    <RetroPageHeader
      eyebrow="About us"
      title="Climbers, for the long"
      accent="haul"
      lede="Acacia Climbing Coalition is a small, volunteer-run crew working to get outdoor climbing recognised and looked after across Australia. We're starting in South East Queensland, and building it in the open."
    />

    <!-- Why -->
    <section class="max-w-[1240px] mx-auto px-6 pb-20">
      <div class="grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
        <div>
          <h2 class="m-0 font-grotesk font-extrabold uppercase text-[clamp(36px,5vw,56px)] leading-[0.95] tracking-[-0.03em] text-forest">Why we started</h2>
          <p class="mt-5 mb-0 text-lg leading-relaxed">
            Most councils in Australia don't have a way to formally recognise outdoor climbing. That leaves crags with unclear access,
            no stairs or signs, and nobody speaking for climbers when decisions get made.
          </p>
          <p class="mt-4 mb-0 text-lg leading-relaxed">
            At the same time, more people than ever are climbing in gyms and wanting to head outside, with very little to tell them
            where it's okay to go and how to look after it when they get there.
          </p>
        </div>
        <div class="relative bg-wattle border-[3px] border-outline rounded-[28px] p-8 shadow-[6px_6px_0_var(--color-outline)] overflow-hidden">
          <div aria-hidden="true" class="halftone absolute -right-16 -top-16 size-64 rounded-full" />
          <p class="relative m-0 font-display text-[clamp(30px,3.6vw,44px)] leading-[1.05]">"Documented crag, protected crag."</p>
          <p class="relative mt-4 mb-0 text-[17px] leading-relaxed">
            A crag that's mapped, written up and known to council is a lot easier to keep open. So that's what we do, one crag at a time,
            and we share every step along the way.
          </p>
        </div>
      </div>
    </section>

    <!-- How -->
    <section class="bg-sandstone border-y-[3px] border-outline">
      <div class="max-w-[1240px] mx-auto px-6 py-20">
        <p class="m-0 font-poster text-2xl">Every crag goes through the same eight steps</p>
        <h2 class="mt-2 mb-0 font-grotesk font-extrabold uppercase text-[clamp(36px,5vw,56px)] leading-[0.95] tracking-[-0.03em] text-forest">How we do it</h2>
        <ol class="list-none p-0 m-0 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="(step, i) in steps"
            :key="step"
            class="tilt bg-paper-light border-[3px] border-outline rounded-[20px] p-5 shadow-[5px_5px_0_var(--color-outline)]"
            :style="{ '--tilt': (i % 2 ? 1.2 : -1.2) + 'deg' }"
          >
            <span class="inline-flex items-center justify-center size-10 rounded-full bg-moss text-paper border-[3px] border-outline font-grotesk font-extrabold">{{ i + 1 }}</span>
            <p class="mt-3 mb-0 font-grotesk font-bold text-[17px] leading-snug">{{ step }}</p>
          </li>
        </ol>
        <NuxtLink to="/progress" class="inline-block mt-10 font-grotesk font-bold text-lg text-forest">See where each crag is up to →</NuxtLink>
      </div>
    </section>

    <!-- Where we're up to -->
    <section class="max-w-[1240px] mx-auto px-6 py-20">
      <h2 class="m-0 font-grotesk font-extrabold uppercase text-[clamp(36px,5vw,56px)] leading-[0.95] tracking-[-0.03em] text-forest">Where we're up to</h2>
      <ul class="list-none p-0 m-0 mt-10 grid gap-5 md:grid-cols-2">
        <li v-for="m in milestones" :key="m.title" class="bg-paper-light border-[3px] border-outline rounded-[24px] p-6 shadow-[5px_5px_0_var(--color-outline)]">
          <span class="inline-block border-2 rounded-full px-3 py-1 text-[13px] font-bold" :class="m.chip">{{ m.when }}</span>
          <h3 class="mt-3 mb-0 font-grotesk font-extrabold text-2xl leading-tight">{{ m.title }}</h3>
          <p class="mt-2 mb-0 text-[16px] leading-relaxed">{{ m.detail }}</p>
        </li>
      </ul>
    </section>

    <!-- Who + working with -->
    <section class="max-w-[1240px] mx-auto px-6 pb-20">
      <div class="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div class="bg-paper-light border-[3px] border-outline rounded-[28px] p-8 shadow-[6px_6px_0_var(--color-outline)]">
          <h2 class="m-0 font-grotesk font-extrabold uppercase text-[clamp(30px,4vw,44px)] leading-[0.95] tracking-[-0.03em] text-forest">Who's behind it</h2>
          <p class="mt-5 mb-0 text-lg leading-relaxed">
            Right now Acacia is a small volunteer crew, coordinated by Cooper, who is also the bouldering representative for ACAQ,
            Queensland's peak climbing access body. Everything here gets done in spare hours, with a lot of help from local climbers.
          </p>
          <NuxtLink to="/get-involved" class="nudge inline-block mt-6 no-underline bg-wattle border-[3px] border-outline rounded-full px-5 py-2.5 font-grotesk font-extrabold shadow-[4px_4px_0_var(--color-outline)]">Come be part of it</NuxtLink>
        </div>
        <div class="bg-forest text-paper border-[3px] border-outline rounded-[28px] p-8 shadow-[6px_6px_0_var(--color-outline)]">
          <h2 class="m-0 font-grotesk font-extrabold uppercase text-[clamp(30px,4vw,44px)] leading-[0.95] tracking-[-0.03em]">Working with</h2>
          <ul class="list-none p-0 m-0 mt-5 flex flex-col gap-4">
            <li v-for="p in partners" :key="p.name">
              <p class="m-0 font-grotesk font-extrabold text-xl text-wattle">{{ p.name }}</p>
              <p class="mt-1 mb-0 text-[16px] leading-relaxed text-paper/90">{{ p.detail }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Country -->
    <section class="max-w-[900px] mx-auto px-6 pb-24 text-center">
      <img src="/brand/sprig-green.png" alt="" class="mx-auto w-14 h-auto" />
      <h2 class="mt-4 mb-0 font-display text-[clamp(32px,4vw,48px)] leading-[1.05]">We climb on Country</h2>
      <p class="mt-5 mb-0 text-lg leading-relaxed">
        The crags we document sit on the lands of many Aboriginal and Torres Strait Islander peoples, including the Turrbal, Jagera,
        Yugarapul, Jinibara and Kabi Kabi peoples in South East Queensland. We pay our respects to Elders past and present.
      </p>
      <p class="mt-4 mb-0 text-lg leading-relaxed">
        We want consultation with Traditional Owners to be part of how every crag is documented, not an afterthought.
        We're still building those relationships, and we'll share how that's going as it happens.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About · Acacia Climbing Coalition',
  meta: [{ name: 'description', content: 'Who we are, why we started, and how we work with councils to get outdoor climbing recognised across Australia.' }],
})

const steps = [
  'Research the area, its history and its climbing',
  'Reach out to guidebook authors and locals',
  'Talk with council and park rangers',
  'Agree a plan together',
  'Site visits: GPS, photos and mapping on KAYA',
  'Sort out any access issues',
  'Final council approvals',
  'Publish the guidebook on KAYA',
]

// Keep these true. Councils and grant bodies read this page after meetings.
const milestones = [
  { when: 'Done', chip: 'bg-moss text-paper border-forest', title: 'Tooheys Forest recognised', detail: 'Brisbane City Council formally recognises bouldering at Tooheys, with new stairs and signage now in.' },
  { when: 'Underway', chip: 'bg-wattle border-forest', title: 'White Rock and Plunketts', detail: 'Talking with Ipswich and Logan councils about formal access, with site visits and mapping underway.' },
  { when: 'Underway', chip: 'bg-wattle border-forest', title: 'Digital guidebooks', detail: 'Documenting our crags on KAYA, so every crag is properly on the record.' },
  { when: 'Next up', chip: 'bg-paper border-forest border-dashed', title: 'More of Australia', detail: 'Cedar Creek and Passchendaele are just getting started. After SEQ, the plan is every state.' },
]

const partners = [
  { name: 'ACAQ', detail: "Queensland's peak climbing access body. Our Queensland work happens under their umbrella." },
  { name: 'KAYA', detail: 'Where our digital guidebooks live, so climbers have accurate, up-to-date info.' },
  { name: 'Local councils', detail: 'Brisbane, Ipswich, Logan, Moreton Bay and Southern Downs, so far.' },
]
</script>
