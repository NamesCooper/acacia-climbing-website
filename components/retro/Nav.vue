<template>
  <!-- Phones: wordmark + button on one row, links underneath. Desktop: all on one row. -->
  <header class="max-w-[1240px] mx-auto px-6 pt-5 pb-4 sm:py-6 grid grid-cols-[auto_auto] sm:grid-cols-[auto_1fr_auto] items-center justify-between gap-x-6 gap-y-3">
    <NuxtLink to="/" aria-label="Acacia Climbing Coalition, home" class="no-underline text-outline">
      <RetroWordmark :size="40" />
    </NuxtLink>
    <nav aria-label="Main" class="order-3 col-span-2 sm:order-none sm:col-span-1 sm:justify-self-end flex flex-wrap items-center gap-x-6 gap-y-2 font-bold text-base">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="no-underline text-outline hover:text-moss"
        active-class="underline decoration-[3px] decoration-wattle underline-offset-[6px]"
      >{{ link.label }}</NuxtLink>
    </nav>
    <NuxtLink
      to="/get-involved"
      class="nudge justify-self-end whitespace-nowrap no-underline text-outline bg-wattle border-[3px] border-outline rounded-full px-4 py-2 sm:px-5 sm:py-2.5 font-bold shadow-[4px_4px_0_var(--color-outline)]"
    >Lend a hand</NuxtLink>
  </header>
</template>

<script setup lang="ts">
const links = [
  { label: 'The crags', to: '/progress' },
  { label: 'Updates', to: '/updates' },
  { label: 'About', to: '/about' },
]
</script>
