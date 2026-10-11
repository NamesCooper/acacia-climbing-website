<template>
  <!-- Torn riso band. The text is doubled so the loop is seamless; screen readers get it once. -->
  <div class="torn-band relative bg-riso-green py-5 -rotate-[1.2deg] -mx-5 my-3 overflow-hidden">
    <p class="sr-only">{{ items.join(', ') }}</p>
    <div class="anim-marquee font-bagel text-[clamp(28px,4vw,40px)] text-paper-light uppercase whitespace-nowrap" aria-hidden="true">
      <span v-for="n in 2" :key="n" class="pr-10 [text-shadow:3px_3px_0_var(--color-sunflower)]">
        <template v-for="item in items" :key="item">{{ item }} ✸ </template>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ items?: string[] }>(), {
  items: () => ['Australian bouldering', 'starting in SEQ', 'climbers looking after crags', '5 crags and counting', "come say g'day"],
})
</script>
