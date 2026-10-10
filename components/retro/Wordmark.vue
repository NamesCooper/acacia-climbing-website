<template>
  <!-- The "Sprig Dot" wordmark: lowercase "acacia" with the wattle sprig as the dot on the i.
       Built from live text so it stays sharp at any size. Swap for an SVG file once the logo is final. -->
  <span
    class="font-grotesk font-extrabold leading-none tracking-[-0.05em] whitespace-nowrap"
    :style="{ fontSize: size + 'px' }"
    aria-label="acacia"
    role="img"
  >acac<span class="relative inline-block">ı<img
    src="/brand/sprig-gold.png"
    alt=""
    class="absolute left-1/2 h-auto max-w-none"
    :style="{ width: size * 0.78 + 'px', top: -size * 0.42 + 'px', transform: 'translateX(-44%) rotate(-12deg)' }"
  ></span>a</span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 44 })
</script>
