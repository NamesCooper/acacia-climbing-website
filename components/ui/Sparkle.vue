<template>
  <!-- Four-point retro sparkle. Decorative only. -->
  <svg aria-hidden="true" :width="size" :height="size" viewBox="-32 -32 64 64" class="anim-twinkle" :style="{ animationDelay: delay }">
    <path d="M0 -32 C5 -8 8 -5 32 0 C8 5 5 8 0 32 C-5 8 -8 5 -32 0 C-8 -5 -5 -8 0 -32 Z" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number; delay?: string }>(), { size: 56, delay: '0s' })
</script>
