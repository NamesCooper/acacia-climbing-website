<template>
  <header class="max-w-[1240px] mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
    <NuxtLink to="/" aria-label="Acacia Climbing Coalition, home" class="no-underline text-outline">
      <RetroWordmark :size="44" />
    </NuxtLink>
    <nav aria-label="Main" class="flex flex-wrap items-center gap-x-6 gap-y-3 font-bold text-base">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="no-underline text-outline hover:text-moss">
        {{ link.label }}
      </NuxtLink>
      <NuxtLink
        to="/get-involved"
        class="nudge no-underline text-outline bg-wattle border-[3px] border-outline rounded-full px-5 py-2.5 shadow-[4px_4px_0_var(--color-outline)]"
      >Lend a hand</NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const links = [
  { label: 'The crags', to: '/progress' },
  { label: 'Updates', to: '/updates' },
  { label: 'About', to: '/about-us' },
]
</script>
