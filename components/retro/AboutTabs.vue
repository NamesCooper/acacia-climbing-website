<template>
  <section id="about" class="max-w-[1240px] mx-auto px-6 pt-22 scroll-mt-6">
    <div class="relative bg-sandstone border-[3px] border-outline rounded-[32px] overflow-hidden shadow-[8px_8px_0_var(--color-outline)]">
      <div aria-hidden="true" class="halftone absolute -right-20 -bottom-20 size-[420px] rounded-full" style="--dot: var(--color-sandstone-deep)"></div>

      <div class="relative px-6 py-12 sm:px-14 sm:py-16 flex flex-wrap gap-10 items-center">
        <div class="flex-[999_1_480px] min-w-0">
          <!-- Tabs: arrow keys move between them, as screen readers expect -->
          <div role="tablist" aria-label="About ACC" class="flex flex-wrap gap-2.5" @keydown="onKey">
            <button
              v-for="(t, i) in tabs"
              :id="'about-tab-' + t.id"
              :key="t.id"
              ref="tabRefs"
              type="button"
              role="tab"
              :aria-selected="active === i"
              :aria-controls="'about-panel-' + t.id"
              :tabindex="active === i ? 0 : -1"
              class="font-grotesk font-extrabold text-base border-[3px] border-outline rounded-full px-5 py-2.5 cursor-pointer"
              :class="active === i
                ? 'bg-outline text-paper shadow-[3px_3px_0_var(--color-moss)]'
                : 'bg-paper-light text-outline shadow-[3px_3px_0_var(--color-outline)]'"
              @click="active = i"
            >{{ t.label }}</button>
          </div>

          <div
            v-for="(t, i) in tabs"
            v-show="active === i"
            :id="'about-panel-' + t.id"
            :key="t.id"
            role="tabpanel"
            :aria-labelledby="'about-tab-' + t.id"
          >
            <h2 class="mt-7 mb-0 font-display text-[clamp(44px,6vw,72px)] leading-[0.92] tracking-[-0.02em]">{{ t.heading }}</h2>
            <p class="mt-4 mb-0 text-lg leading-relaxed max-w-[560px]" v-html="t.body"></p>
          </div>
        </div>

        <!-- Spot for the mascot once it's ready -->
        <div class="flex-[1_1_240px] flex justify-center">
          <div class="w-[180px] h-[200px] sm:w-[240px] sm:h-[280px] bg-paper border-[3px] border-outline rounded-3xl flex items-center justify-center">
            <img src="/brand/sprig-green.png" alt="" class="anim-bob w-[100px] sm:w-[140px] h-auto" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// `ref` makes a value reactive: when it changes, the template re-renders.
const active = ref(0)
const tabRefs = ref<HTMLButtonElement[]>([])

// Copy lives here for now. It moves into Sanity with the rest of the page copy.
const tabs = [
  {
    id: 'what',
    label: 'What',
    heading: 'What is ACC?',
    body: 'A bunch of climbers working under ACAQ to get outdoor bouldering <strong>formally recognised by councils</strong>, so crags stay open and get the good stuff: stairs, signs and proper tracks.',
  },
  {
    id: 'how',
    label: 'How',
    heading: 'How does it work?',
    body: 'Research the area, chat with council and rangers, map every boulder on <strong>KAYA</strong>, sort out access, then get it signed off. Documented crag, protected crag.',
  },
  {
    id: 'where',
    label: 'Where',
    heading: 'Where are we?',
    body: 'Right now: <strong>Tooheys, White Rock, Plunketts, Cedar Creek and Passchendaele</strong>. Got a local spot that needs some love? Tell us about it.',
  },
]

function onKey(e: KeyboardEvent) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  const dir = e.key === 'ArrowRight' ? 1 : -1
  active.value = (active.value + dir + tabs.length) % tabs.length
  tabRefs.value[active.value]?.focus()
}
</script>
