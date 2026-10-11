<template>
  <!-- Phones: wordmark + button on one row, links underneath. Desktop: all on one row.
       Words and links come from "Navigation" in the Studio. -->
  <header class="max-w-[1240px] mx-auto px-6 pt-5 pb-4 sm:py-6 grid grid-cols-[auto_auto] sm:grid-cols-[auto_1fr_auto] items-center justify-between gap-x-6 gap-y-3">
    <NuxtLink to="/" aria-label="Acacia Climbing Coalition, home" class="no-underline text-outline">
      <UiWordmark :size="40" />
    </NuxtLink>
    <nav aria-label="Main" class="order-3 col-span-2 sm:order-none sm:col-span-1 sm:justify-self-end flex flex-wrap items-center gap-x-6 gap-y-2 font-bold text-base">
      <NuxtLink
        v-for="l in nav?.links ?? []"
        :key="l._key ?? l.label"
        v-bind="chromeLink(l.link)"
        class="no-underline text-outline hover:text-moss"
        active-class="underline decoration-[3px] decoration-wattle underline-offset-[6px]"
      >{{ l.label }}</NuxtLink>
    </nav>
    <NuxtLink
      v-if="nav?.buttonLabel && nav.buttonLink"
      v-bind="chromeLink(nav.buttonLink)"
      class="nudge justify-self-end whitespace-nowrap no-underline text-outline bg-wattle border-[3px] border-outline rounded-full px-4 py-2 sm:px-5 sm:py-2.5 font-bold shadow-[4px_4px_0_var(--color-outline)]"
    >{{ nav.buttonLabel }}</NuxtLink>
  </header>
</template>

<script setup lang="ts">
const { data } = await useSiteChrome()
const nav = computed(() => data.value?.nav)
</script>
