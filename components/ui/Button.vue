<template>
  <!-- Chunky pill button. Pass `to` for a page on this site, `href` for email or other sites.
       With neither, it renders a real <button> (use @click). -->
  <component
    :is="tag"
    v-bind="linkAttrs"
    class="nudge inline-block no-underline whitespace-nowrap border-[3px] border-outline rounded-full font-grotesk font-extrabold"
    :class="[VARIANTS[variant], SIZES[size]]"
  ><slot /></component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'wattle' | 'moss' | 'paper'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { variant: 'wattle', size: 'md' },
)

// resolveComponent lets us switch between <NuxtLink>, <a> and <button> with one template
const NuxtLink = resolveComponent('NuxtLink')
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))
const linkAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return props.href.startsWith('http') ? { href: props.href, target: '_blank', rel: 'noopener' } : { href: props.href }
  return { type: 'button' }
})

const VARIANTS = {
  wattle: 'bg-wattle text-outline',
  moss: 'bg-moss text-paper',
  paper: 'bg-paper-light text-outline',
}
const SIZES = {
  sm: 'px-4 py-2 text-sm shadow-[3px_3px_0_var(--color-outline)]',
  md: 'px-5 py-2.5 shadow-[4px_4px_0_var(--color-outline)]',
  lg: 'px-7 py-4 text-lg shadow-[5px_5px_0_var(--color-outline)]',
}
</script>
