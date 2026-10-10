<template>
  <div class="overflow-x-hidden">
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:bg-wattle focus:px-4 focus:py-2 focus:rounded-full focus:border-[3px] focus:border-outline">Skip to content</a>
    <RetroNav />
    <main id="main">
      <slot />
    </main>
    <!-- Pages can hide the "Got an hour?" band with definePageMeta({ prefooter: false }) -->
    <RetroHelpPrefooter v-if="route.meta.prefooter !== false" />
    <RetroFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
