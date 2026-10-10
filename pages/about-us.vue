<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader
      eyebrow="ABOUT"
      lede="Acacia is a small, volunteer-run crew with a long horizon: climbing in Australia, recognised and looked after for the next hundred years. We're new, and we're building it in the open."
    >
      Climbers, <span class="italic">for the long haul</span><span class="text-wattle">.</span>
    </LayoutPageHeader>

    <!-- Origin -->
    <section class="px-4 sm:px-6 lg:px-14 py-[120px] border-b border-ink">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed">
          Origin
        </div>
        <div>
          <h2 class="font-serif font-medium text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] m-0 mb-10 text-ink">
            We started because <span class="italic">nobody else would</span><span class="text-wattle">.</span>
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-14">
            <p class="font-serif text-[19px] leading-[1.6] text-ink-soft m-0">
              Most councils in Australia don't have a way to formally recognise outdoor climbing.
              That leaves crags with unclear access, no stairs or signs, and nobody speaking for
              climbers when decisions get made. More people than ever are climbing in gyms and
              wanting to head outside, with very little to tell them where it's okay to go.
            </p>
            <p class="font-serif text-[19px] leading-[1.6] text-ink-soft m-0">
              So we started Acacia, working under ACAQ (Queensland's peak climbing access body),
              to do something about it, starting with bouldering in South East Queensland.
              We talk to councils, document crags on KAYA, and keep everyone posted along the way.
              <span class="italic text-green"> A coalition, in the literal sense.</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="px-4 sm:px-6 lg:px-14 py-[120px] border-b border-ink bg-cream-deep">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 mb-16">
        <div class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed">
          Timeline
        </div>
        <h2 class="font-serif font-medium text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] m-0 text-ink">
          Where we're <span class="italic">up to</span><span class="text-wattle">.</span>
        </h2>
      </div>
      <div class="lg:pl-[228px]">
        <div
          v-for="(m, i) in milestones"
          :key="i"
          class="grid grid-cols-1 sm:grid-cols-[160px_240px_1fr] gap-2 sm:gap-4 py-6 border-b border-ink items-baseline"
          :class="{ 'border-t border-ink': i === 0 }"
        >
          <span class="font-mono text-[12px] tracking-[0.2em] text-green">{{ m[0] }}</span>
          <span class="font-serif text-[26px] font-medium text-ink tracking-[-0.01em]">{{ m[1] }}</span>
          <span class="font-serif text-[18px] italic text-ink-soft leading-[1.5]">{{ m[2] }}</span>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="px-4 sm:px-6 lg:px-14 py-[120px] border-b border-ink">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 mb-16">
        <div class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed">
          Team
        </div>
        <h2 class="font-serif font-medium text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] m-0 text-ink">
          The people <span class="italic">behind it</span><span class="text-wattle">.</span>
        </h2>
      </div>
      <div class="lg:pl-57 max-w-[760px]">
        <p class="font-serif text-[19px] leading-[1.6] text-ink-soft m-0">
          Right now Acacia is a small volunteer crew, coordinated by Cooper, who is also ACAQ's
          bouldering representative. Everything here gets done in spare hours, with a lot of help
          from local climbers.
        </p>
        <p class="font-serif text-[19px] leading-[1.6] text-ink-soft mt-6 mb-0">
          Want to be part of it?
          <NuxtLink to="/get-involved" class="text-green">Here's how to lend a hand.</NuxtLink>
        </p>
      </div>
    </section>

    <!-- Governance -->
    <section class="px-4 sm:px-6 lg:px-14 py-[80px]">
      <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div class="font-mono text-[11px] tracking-[0.22em] text-green uppercase leading-relaxed">
          Governance
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div v-for="[h, p] in governance" :key="h" class="border-t border-ink pt-4">
            <div class="font-serif text-[22px] font-medium text-ink tracking-[-0.01em]">
              {{ h }}<span class="text-wattle">.</span>
            </div>
            <div class="text-[13px] text-ink/50 mt-1.5">{{ p }}</div>
          </div>
        </div>
      </div>
    </section>

    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'About · Acacia Climbing Coalition' })

// Keep these true. Councils and grant bodies read this page after meetings.
const milestones = [
  ['Done', 'Tooheys Forest recognised', 'Brisbane City Council formally recognises bouldering at Tooheys, with new stairs and signage.'],
  ['Underway', 'White Rock', 'Talking with Ipswich City Council about formal access.'],
  ['Underway', 'Digital guidebooks', 'Documenting our crags on KAYA, so every crag is on the record.'],
  ['Next up', 'More of SEQ', 'Plunketts is in research and site visits. Cedar Creek and Passchendaele are just getting started.'],
]

const governance = [
  ['Under ACAQ', "Queensland's peak climbing access body"],
  ['ABN registered', 'Registered Australian business'],
  ['KAYA', 'Our digital guidebook home'],
  ['Volunteer-run', 'Every hour is donated'],
]
</script>
