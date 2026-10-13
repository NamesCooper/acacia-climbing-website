<template>
  <!-- Torn band. The text is doubled so the loop is seamless; screen readers get it once.
       Colourway is picked in the Studio ("Scrolling band" → Colour). -->
  <!-- Screen readers get the phrases once, here, outside the pause control -->
  <p class="sr-only">{{ items.join(', ') }}</p>
  <!-- The whole band is the pause control (moving text needs a way to stop it, WCAG 2.2.2):
       tap or click to pause or play, hover to pause. No visible button, so the look is unchanged. -->
  <div
    class="torn-band relative py-5 -rotate-[1.2deg] -mx-5 my-3 overflow-hidden cursor-pointer select-none"
    :class="look.band"
    role="button"
    tabindex="0"
    :aria-label="paused ? 'Play the scrolling band' : 'Pause the scrolling band'"
    :aria-pressed="paused"
    @click="paused = !paused"
    @keydown.enter.prevent="paused = !paused"
    @keydown.space.prevent="paused = !paused"
  >
    <div class="anim-marquee font-bagel text-[clamp(28px,4vw,40px)] uppercase whitespace-nowrap" :class="[look.text, paused ? 'is-paused' : '']" aria-hidden="true">
      <span v-for="n in 2" :key="n" class="pr-10" :class="look.shadow">
        <template v-for="item in items" :key="item">{{ item }} ✸ </template>
      </span>
    </div>
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
