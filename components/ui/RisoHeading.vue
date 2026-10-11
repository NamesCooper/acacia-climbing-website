<template>
  <!-- Big italic headline printed in "two inks": a wattle copy sits slightly off-register
       behind the dark one. Use \n in `text` for a line break. `accent` adds a word in moss. -->
  <component :is="as" class="relative m-0 font-display leading-[0.9] tracking-[-0.025em] whitespace-pre-line" :class="SIZES[size]">
    <span aria-hidden="true" class="absolute inset-0 translate-x-[5px] translate-y-[5px]" :class="shadow === 'moss' ? 'text-moss' : 'text-wattle'">{{ accent ? `${text} ${accent}` : text }}</span>
    <!-- {{ ' ' }} keeps the space: Vue strips plain spaces between tags -->
    <span class="relative">{{ text }}<template v-if="accent">{{ ' ' }}<span class="text-moss">{{ accent }}</span></template></span>
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string
    accent?: string
    as?: string
    size?: 'md' | 'lg' | 'xl'
    shadow?: 'wattle' | 'moss'
  }>(),
  { as: 'h2', size: 'lg', shadow: 'wattle' },
)

const SIZES = {
  md: 'text-[clamp(30px,3.8vw,46px)]',
  lg: 'text-[clamp(52px,9vw,108px)]',
  xl: 'text-[clamp(64px,13vw,148px)] leading-[0.88]',
}
</script>
