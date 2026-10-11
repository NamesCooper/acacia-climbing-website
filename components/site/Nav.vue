<template>
  <!-- Full-width forest bar, matching the footer. Phones: wordmark + button on one row, links underneath.
       Desktop: all on one row. Words and links come from "Navigation" in the Studio. -->
  <header class="bg-forest text-paper border-b-[3px] border-outline">
    <div class="max-w-[1240px] mx-auto px-6 pt-4 pb-3.5 sm:py-5 grid grid-cols-[auto_auto] sm:grid-cols-[auto_1fr_auto] items-center justify-between gap-x-6 gap-y-3">
      <NuxtLink to="/" aria-label="Acacia Climbing Coalition, home" class="no-underline text-paper-light">
        <UiWordmark :size="40" />
      </NuxtLink>
      <nav aria-label="Main" class="order-3 col-span-2 sm:order-none sm:col-span-1 sm:justify-self-end flex flex-wrap items-center gap-x-6 gap-y-2 font-bold text-base">
        <NuxtLink
          v-for="l in nav?.links ?? []"
          :key="l._key ?? l.label"
          v-bind="chromeLink(l.link)"
          class="no-underline text-paper/90 hover:text-wattle"
          active-class="!text-wattle underline decoration-[3px] decoration-wattle underline-offset-[7px]"
        >{{ l.label }}</NuxtLink>
      </nav>
      <NuxtLink
        v-if="nav?.buttonLabel && nav.buttonLink"
        v-bind="chromeLink(nav.buttonLink)"
        class="nudge justify-self-end whitespace-nowrap no-underline text-outline bg-wattle border-[3px] border-outline rounded-full px-4 py-2 sm:px-5 sm:py-2.5 font-bold shadow-[4px_4px_0_var(--color-outline)]"
      >{{ nav.buttonLabel }}</NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const { data } = await useSiteChrome()
const nav = computed(() => data.value?.nav)
</script>
