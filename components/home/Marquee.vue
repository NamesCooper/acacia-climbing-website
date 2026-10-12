<template>
  <!-- Torn band. The text is doubled so the loop is seamless; screen readers get it once.
       Colourway is picked in the Studio ("Scrolling band" → Colour). -->
  <div class="torn-band relative py-5 -rotate-[1.2deg] -mx-5 my-3 overflow-hidden" :class="look.band">
    <p class="sr-only">{{ items.join(', ') }}</p>
    <div class="anim-marquee font-bagel text-[clamp(28px,4vw,40px)] uppercase whitespace-nowrap" :class="[look.text, paused ? 'is-paused' : '']" aria-hidden="true">
      <span v-for="n in 2" :key="n" class="pr-10" :class="look.shadow">
        <template v-for="item in items" :key="item">{{ item }} ✸ </template>
      </span>
    </div>
    <!-- Moving text needs a way to stop it (WCAG 2.2.2). Hidden when motion is already off. -->
    <button
      type="button"
      class="motion-reduce:hidden absolute right-8 sm:right-10 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-9 cursor-pointer rounded-full bg-paper-light text-outline border-[3px] border-outline shadow-[2px_2px_0_var(--color-outline)]"
      :aria-label="paused ? 'Play the scrolling band' : 'Pause the scrolling band'"
      :aria-pressed="paused"
      @click="paused = !paused"
    >
      <svg aria-hidden="true" viewBox="0 0 12 12" class="size-3">
        <path v-if="paused" d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
        <path v-else d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ items?: string[]; colour?: 'moss' | 'forest' | 'wattle' }>(), {
  items: () => [],
  colour: 'moss',
})

// Three colourways, all from the brand palette
const LOOKS = {
  moss: { band: 'bg-moss', text: 'text-paper-light', shadow: '[text-shadow:3px_3px_0_var(--color-wattle)]' },
  forest: { band: 'bg-forest', text: 'text-wattle', shadow: '[text-shadow:3px_3px_0_var(--color-moss)]' },
  wattle: { band: 'bg-wattle', text: 'text-forest', shadow: '[text-shadow:3px_3px_0_var(--color-paper-light)]' },
}
const look = computed(() => LOOKS[props.colour] ?? LOOKS.moss)
const paused = ref(false)
</script>
