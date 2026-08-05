<template>
  <div class="bg-cream text-ink font-sans">
    <LayoutTheNav />

    <LayoutPageHeader
      eyebrow="ABOUT"
      lede="Acacia is a small organisation with a long horizon. Six staff, 2,400 members, one mission — climbing in Australia, recognised and stewarded for the next hundred years."
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
              In late 2024, three crags in South East Queensland were closed in the same month —
              each for a different reason, none of them with a climbing voice in the room.
              A handful of climbers met at a Brisbane gym to ask the obvious question: who is
              supposed to be advocating for outdoor climbing in this state?
            </p>
            <p class="font-serif text-[19px] leading-[1.6] text-ink-soft m-0">
              The answer was nobody. So Acacia formed — not as another club, but as the
              connective layer between the climbers, the gyms, the councils and the Traditional
              Owner groups whose Country we climb on.
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
          Two years, <span class="italic">moving slowly</span><span class="text-wattle">.</span>
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
          The people <span class="italic">at the desk</span><span class="text-wattle">.</span>
        </h2>
      </div>
      <div class="lg:pl-57 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
        <div v-for="[name, role, loc] in team" :key="name" class="border-t border-ink pt-5 pb-8 pr-8">
          <div class="font-serif text-[26px] font-medium text-ink tracking-[-0.01em] leading-none">{{ name }}</div>
          <div class="font-serif text-[17px] italic text-green mt-2">{{ role }}</div>
          <div class="font-mono text-[10px] tracking-[0.18em] text-ink/40 uppercase mt-2">{{ loc }}</div>
        </div>
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

const team = [
  ['Maya Tully', 'Founder & Director', 'Brisbane'],
  ['Jordan Hale', 'Crag Advocacy Lead', 'Sunshine Coast'],
  ['Nia Coleman', 'Documentation Lead', 'Brisbane'],
  ['Sam Ferreira', 'Community & Events', 'Gold Coast'],
  ['Lior Brennan', 'Stewardship Curriculum', 'Toowoomba'],
  ['Wren Okafor', 'Operations & Treasury', 'Brisbane'],
]

const milestones = [
  ['2024', 'Coalition formed', 'Six founding members. First crag survey at White Rock.'],
  ['2025 · I', 'First recognition', 'Brisbane City Council formally recognises bouldering at White Rock.'],
  ['2025 · II', 'Register v.1', 'Public crag register launches — 42 crags, 680 routes documented.'],
  ['2025 · III', 'Stewardship cohort', 'First 80 climbers complete the stewardship curriculum across 4 partner gyms.'],
  ['2026 · I', 'Sunshine Coast', 'Active negotiation with Sunshine Coast Council for recognition at three crags.'],
  ['2026 · II', 'Register v.2', '86 crags, 1,240 routes — including land tenure and access status.'],
]

const governance = [
  ['Incorporated', 'Inc. Association · QLD'],
  ['ACNC-registered', 'Charity status, MMXXV'],
  ['DGR endorsed', 'Item 1, Sub-item 4.1.1'],
  ['Audit', 'Annual external review'],
]
</script>
