<template>
  <!-- Thin yellow strip above the nav for a short-term ask (e.g. a feedback form).
       Switched on and worded in the Studio: Navigation → Banner strip. The whole strip is the link. -->
  <aside v-if="show" aria-label="Announcement">
  <component
    :is="target.to ? NuxtLink : 'a'"
    v-bind="target"
    class="group block no-underline bg-wattle text-forest border-b-[3px] border-outline px-6 py-2.5 text-center font-grotesk font-bold text-[15px] leading-snug"
  >
    {{ text }}
    <span v-if="label" class="whitespace-nowrap underline underline-offset-[3px] decoration-2 group-hover:no-underline">{{ label }} →</span>
    <span v-if="target.target" class="sr-only"> (opens in a new tab)</span>
  </component>
  </aside>
</template>

<script setup lang="ts">
import { stegaClean } from '@sanity/client/stega'

const NuxtLink = resolveComponent('NuxtLink')
const route = useRoute()
const { data } = await useSiteChrome()

const nav = computed(() => data.value?.nav)
const text = computed(() => nav.value?.bannerText ?? '')
const label = computed(() => nav.value?.bannerLinkLabel ?? '')
const target = computed(() => chromeLink(nav.value?.bannerLink))
const show = computed(() => {
  const n = nav.value
  if (!n?.bannerOn || !n.bannerText || !n.bannerLink) return false
  return stegaClean(n.bannerWhere) === 'all' || route.path === '/'
})
</script>
