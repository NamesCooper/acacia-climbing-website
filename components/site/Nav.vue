<template>
  <!-- Full-width forest bar, matching the footer. Menu items are tilted pills like the footer's
       column headings; items with child links drop down a paper card on hover (or tap / Enter).
       Words and links come from "Navigation" in the Studio. -->
  <header class="relative z-[1000] bg-forest text-paper border-b-[3px] border-outline">
    <div ref="barEl" class="relative max-w-[1240px] mx-auto px-6 pt-4 pb-3.5 sm:py-5 grid grid-cols-[auto_auto] sm:grid-cols-[auto_1fr_auto] items-center justify-between gap-x-6 gap-y-3" @keydown.esc="close(true)">
      <NuxtLink to="/" aria-label="Acacia Climbing Coalition, home" class="no-underline text-paper-light">
        <UiWordmark :size="40" />
      </NuxtLink>

      <nav aria-label="Main" class="order-3 col-span-2 sm:order-none sm:col-span-1 sm:justify-self-end">
        <ul class="list-none p-0 m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
          <!-- On phones the dropdown spans the bar (li is static); from sm up it sits under its pill -->
          <li
            v-for="(item, i) in items"
            :key="item._key ?? item.label"
            class="sm:relative"
            @mouseenter="hoverOpen(i)"
            @mouseleave="hoverClose(i)"
          >
            <button
              v-if="item.children?.length"
              :ref="(el) => (triggers[i] = el as HTMLButtonElement)"
              type="button"
              class="tilt inline-flex items-center gap-1.5 cursor-pointer border-2 border-outline rounded-full px-3.5 py-1.5 font-grotesk font-extrabold text-sm uppercase tracking-[0.06em] text-forest shadow-[2px_2px_0_var(--color-outline)]"
              :class="[CHIP_BG[i % CHIP_BG.length], isActive(item) ? 'ring-2 ring-wattle ring-offset-2 ring-offset-forest' : '']"
              :style="{ '--tilt': TILTS[i % TILTS.length] + 'deg' }"
              :aria-expanded="open === i"
              :aria-controls="`nav-menu-${i}`"
              @click="toggle(i)"
            >
              {{ item.label }}
              <svg aria-hidden="true" viewBox="0 0 12 12" class="size-3 transition-transform" :class="open === i ? 'rotate-180' : ''"><path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </button>
            <NuxtLink
              v-else-if="item.link"
              v-bind="chromeLink(item.link)"
              class="tilt inline-block no-underline border-2 border-outline rounded-full px-3.5 py-1.5 font-grotesk font-extrabold text-sm uppercase tracking-[0.06em] text-forest shadow-[2px_2px_0_var(--color-outline)]"
              :class="CHIP_BG[i % CHIP_BG.length]"
              :style="{ '--tilt': TILTS[i % TILTS.length] + 'deg' }"
              active-class="ring-2 ring-wattle ring-offset-2 ring-offset-forest"
            >{{ item.label }}</NuxtLink>

            <!-- Dropdown. The top padding keeps the hover area joined to the pill. -->
            <div
              v-if="item.children?.length"
              v-show="open === i"
              :id="`nav-menu-${i}`"
              class="absolute z-50 left-4 right-4 sm:left-auto sm:right-auto pt-3"
              :class="i === items.length - 1 ? 'sm:right-0' : 'sm:left-0'"
            >
              <ul class="list-none m-0 p-2 sm:min-w-[250px] bg-paper-light text-outline border-[3px] border-outline rounded-[20px] shadow-[5px_5px_0_var(--color-outline)]">
                <li v-for="c in item.children" :key="c._key ?? c.label">
                  <NuxtLink
                    v-bind="chromeLink(c.link)"
                    class="block no-underline text-outline rounded-xl px-4 py-2.5 font-bold hover:bg-wattle focus-visible:bg-wattle"
                    exact-active-class="bg-sandstone"
                    @click="close()"
                  >{{ c.label }}</NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
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
import { stegaClean } from '@sanity/client/stega'
import type { ChromeLink } from '~/composables/useSiteChrome'

type MenuItem = { _key?: string; label: string; link?: string; children?: ChromeLink[] }

const { data } = await useSiteChrome()
const nav = computed(() => data.value?.nav)
const route = useRoute()

// The Studio's Menu, or the older flat link list if Menu is empty
const items = computed<MenuItem[]>(() => (nav.value?.menu?.length ? nav.value.menu : nav.value?.links ?? []) as MenuItem[])

// Which dropdown is open (null = none). `ref` makes it reactive, so the template updates when it changes.
const open = ref<number | null>(null)
const triggers: HTMLButtonElement[] = []
const barEl = ref<HTMLElement | null>(null)
let hoverTimer: ReturnType<typeof setTimeout> | undefined

const canHover = () => import.meta.client && window.matchMedia('(hover: hover)').matches
function toggle(i: number) { open.value = open.value === i ? null : i }
function close(refocus = false) {
  if (refocus && open.value !== null) triggers[open.value]?.focus()
  open.value = null
}
// A short delay on leaving, so moving the mouse diagonally into the card doesn't snap it shut
function hoverOpen(i: number) { if (!canHover()) return; clearTimeout(hoverTimer); if (items.value[i]?.children?.length) open.value = i }
function hoverClose(i: number) { if (!canHover()) return; hoverTimer = setTimeout(() => { if (open.value === i) open.value = null }, 180) }

// Highlight a pill when you're on one of its child pages
function isActive(item: MenuItem) {
  return (item.children ?? []).some((c) => {
    const path = stegaClean(c.link ?? '').split('#')[0]
    return path.startsWith('/') && path !== '/' && route.path.replace(/\/$/, '') === path.replace(/\/$/, '')
  })
}

// Close when the page changes or when clicking anywhere outside the nav
watch(() => route.fullPath, () => close())
function onDocClick(e: MouseEvent) { if (barEl.value && !barEl.value.contains(e.target as Node)) close() }
onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))

const CHIP_BG = ['bg-wattle', 'bg-lichen', 'bg-sandstone', 'bg-paper-light']
const TILTS = [-2, 1.5, -1.5, 2]
</script>
