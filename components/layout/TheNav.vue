<template>
  <header class="relative z-10 bg-ink px-4 sm:px-6 lg:px-12 py-4.5">
    <!-- Mobile row -->
    <div class="flex items-center justify-between lg:hidden">
      <div class="leading-none">
        <NuxtLink to="/" class="font-serif text-[15px] font-semibold tracking-[0.02em] text-cream no-underline">Acacia Climbing Coalition</NuxtLink>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="menuOpen = !menuOpen"
          class="text-cream p-1"
          aria-label="Toggle menu"
        >
          <svg v-if="!menuOpen" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
          </svg>
          <svg v-else width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" />
          </svg>
        </button>
        <NuxtLink
          to="/get-involved"
          class="bg-wattle text-ink no-underline px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.08em] uppercase hover:opacity-90 transition-opacity"
        >
          Donate
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile menu -->
    <nav v-if="menuOpen" class="lg:hidden border-t border-green/30 mt-4 pt-4 flex flex-col gap-4 pb-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        class="text-[14px] font-medium no-underline transition-colors"
        :class="$route.path === item.to ? 'text-wattle' : 'text-cream hover:text-wattle'"
        @click="menuOpen = false"
      >{{ item.label }}</NuxtLink>
    </nav>

    <!-- Desktop layout -->
    <div
      class="hidden lg:grid items-center gap-6"
      style="grid-template-columns: auto 1fr auto"
    >
      <NuxtLink to="/" class="font-serif text-[24px] font-semibold tracking-[0.02em] text-cream no-underline hover:text-wattle transition-colors leading-none">
        Acacia Climbing Coalition
      </NuxtLink>
      <nav class="flex gap-8 justify-center text-[13px] font-medium">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="no-underline transition-colors"
          :class="$route.path === item.to ? 'text-wattle' : 'text-cream hover:text-wattle'"
        >{{ item.label }}</NuxtLink>
      </nav>
      <NuxtLink
        to="/get-involved"
        class="bg-wattle text-ink no-underline px-5 py-2.5 font-sans text-[12px] font-semibold tracking-[0.08em] uppercase hover:opacity-90 transition-opacity"
      >
        Donate
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)

const navItems = [
  { label: 'Our Mission', to: '/mission' },
  { label: 'The Work', to: '/work' },
  { label: 'About', to: '/about-us' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Crag Map', to: '/progress' },
]
</script>
