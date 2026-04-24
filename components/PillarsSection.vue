<template>
  <section class="px-4 sm:px-6 lg:px-12 py-12 md:py-16 lg:py-24 border-b border-ink bg-ink text-cream">
    <div class="flex flex-col lg:grid lg:gap-14 items-start lg:items-end gap-8 mb-10 lg:mb-16" style="grid-template-columns: 1fr 1fr">
      <h2
        class="font-serif font-normal m-0 tracking-[-0.03em]"
        style="font-size: clamp(30px, 6vw, 96px); line-height: 0.9"
      >
        Four<br />
        <span class="italic text-wattle">pillars</span>.<br />
        One coalition.
      </h2>
      <p
        class="font-serif leading-normal m-0 font-normal"
        style="font-size: clamp(15px, 1.8vw, 20px); color: #C4D4C0; text-wrap: pretty"
      >
        Advocacy moves policy. Documentation moves information. Stewardship moves dirt.
        Education moves people. All four, or the work doesn't hold.
      </p>
    </div>

    <div
      class="grid gap-px"
      style="background-color: #141914; grid-template-columns: repeat(1, 1fr)"
    >
      <!-- Mobile: 1-col stacked; sm: 2-col; lg: 4-col via inline override -->
      <div
        class="grid gap-px sm:grid-cols-2 lg:grid-cols-4 col-span-full"
        style="background-color: #141914"
      >
        <div
          v-for="[roman, title, desc, tags] in pillars"
          :key="roman"
          class="bg-ink px-5 sm:px-7 pt-8 lg:pt-10 pb-6 lg:pb-8 flex flex-col gap-4 lg:gap-5"
          style="min-height: 280px"
        >
          <div
            class="font-serif italic text-wattle font-normal"
            style="font-size: clamp(36px, 4.5vw, 64px); line-height: 1"
          >{{ roman }}</div>
          <h3 class="font-serif m-0 font-normal leading-[1.05] tracking-[-0.01em]"
            style="font-size: clamp(18px, 2.2vw, 30px)">
            {{ title }}
          </h3>
          <p class="text-[13px] lg:text-[14px] leading-[1.6] m-0" style="color: #A8BCA8">{{ desc }}</p>
          <div class="mt-auto flex flex-wrap gap-1.5">
            <span
              v-for="tag in tags"
              :key="tag"
              class="font-mono text-[9px] px-2 py-1 uppercase"
              style="border: 1px solid #2E6B40; color: #7AAF82; letter-spacing: 0.1em"
            >{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const pillars = [
  ['I', 'Council Advocacy', 'Formal recognition. Management plans. The boring letters nobody else writes.', ['Submissions', 'Meeting minutes', 'MOUs']],
  ['II', 'Guidebook Documentation', 'Every crag on KAYA. Open access, topo-verified, community-updated.', ['KAYA', 'Topos', 'FA records']],
  ['III', 'Community Building', 'Trail days. Cleanups. Turning carparks of climbers into a coalition.', ['Stewards', 'Events', 'Chapters']],
  ['IV', 'Education & Stewardship', 'Leave-no-trace in practice. First Nations partnerships. Ecology-first access.', ['LNT', 'Partnerships', 'Research']],
]
</script>
