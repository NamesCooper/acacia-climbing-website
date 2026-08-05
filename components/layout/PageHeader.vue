<template>
  <section class="bg-ink text-cream px-4 sm:px-6 lg:px-14 py-20 pb-24">
    <p
      v-if="eyebrow"
      class="font-mono text-[11px] tracking-[0.22em] text-wattle uppercase mb-8 m-0"
    >{{ eyebrow }}</p>

    <h1
      class="font-serif font-medium leading-[0.95] tracking-[-0.025em] m-0"
      style="font-size: clamp(56px, 8.6vw, 124px)"
    >
      <slot />
    </h1>

    <p
      v-if="lede"
      class="font-serif italic text-[24px] text-cream/85 leading-[1.4] max-w-[720px] mt-9 mb-0"
    >{{ lede }}</p>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  lede?: string
}>()
</script>
