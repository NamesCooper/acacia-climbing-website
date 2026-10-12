<template>
  <!-- Riso halftone dot circle. Decorative only. Position it with classes,
       e.g. <UiHalftone class="-right-16 -top-16 size-56" dot="wattle-deep" /> -->
  <div aria-hidden="true" class="halftone absolute rounded-full pointer-events-none" :style="{ '--dot': `var(--color-${dot})` }" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ dot?: 'wattle' | 'wattle-deep' | 'sandstone-deep' | 'gum-deep' | 'lichen' | 'moss' }>(),
  { dot: 'wattle-deep' },
)
</script>
