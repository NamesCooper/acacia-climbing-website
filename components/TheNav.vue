<template>
  <header class="relative z-10 bg-cream px-4 sm:px-6 lg:px-12 py-4.5">
    <!-- Mobile row -->
    <div class="flex items-center justify-between lg:hidden">
      <div class="flex items-center gap-3">
        <div class="leading-none">
          <div class="font-serif text-[15px] font-semibold tracking-[0.02em]">Acacia Climbing Coalition</div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="menuOpen = !menuOpen"
          class="text-ink p-1"
          aria-label="Toggle menu"
        >
          <svg v-if="!menuOpen" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
          </svg>
          <svg v-else width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" />
          </svg>
        </button>
        <button class="bg-ink text-cream border-none px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.08em] uppercase cursor-pointer">
          Donate
        </button>
      </div>
    </div>

    <!-- Mobile dropdown -->
    <nav
      v-if="menuOpen"
      class="lg:hidden border-t border-ink mt-4 pt-4 flex flex-col gap-4 pb-2"
    >
      <a
        v-for="item in navItems"
        :key="item"
        class="text-ink text-[14px] font-medium cursor-pointer hover:text-wattle transition-colors"
      >{{ item }}</a>
    </nav>

    <!-- Desktop layout -->
    <div
      class="hidden lg:grid items-center gap-6"
      style="grid-template-columns: auto 1fr auto"
    >
      <div class="flex items-center gap-3">
        <div class="leading-none">
          <div class="font-serif text-[20px] font-semibold tracking-[0.02em]">Acacia Climbing Coalition</div>
        </div>
      </div>
      <nav class="flex gap-8 justify-center text-[13px] font-medium">
        <a
          v-for="item in navItems"
          :key="item"
          class="text-ink no-underline cursor-pointer hover:text-wattle transition-colors"
        >{{ item }}</a>
      </nav>
      <button class="bg-ink text-cream border-none px-5 py-2.5 font-sans text-[12px] font-semibold tracking-[0.08em] uppercase cursor-pointer hover:bg-ink-soft transition-colors">
        Donate
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
const navItems = ['Our Mission', 'The Work', 'Get Involved', 'Progress']
</script>
