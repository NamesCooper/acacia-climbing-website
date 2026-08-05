<template>
  <footer class="px-4 sm:px-6 lg:px-12 pt-10 md:pt-14 lg:pt-18 pb-8 lg:pb-10 bg-ink text-cream">
    <h2
      class="font-serif font-normal m-0 mb-8 lg:mb-12 tracking-[-0.04em]"
      style="font-size: clamp(36px, 12vw, 120px); line-height: 0.85"
    >
      Acacia Climbing.
    </h2>

    <div
      class="grid gap-8 sm:gap-10 lg:gap-12 pt-8 lg:pt-10 border-t grid-cols-2 sm:grid-cols-4"
      style="border-color: #2E3A2E"
    >
      <!-- Tagline -->
      <p
        class="font-serif italic leading-[1.45] m-0 col-span-2 sm:col-span-1"
        style="font-size: clamp(16px, 1.5vw, 20px); color: #C4D4C0; max-width: 420px"
      >
        A field organisation for climbing access in South East Queensland.
        An ACAQ chapter. A KAYA partner. Building the long work.
      </p>

      <!-- Nav columns -->
      <div v-for="[heading, items] in columns" :key="heading">
        <div class="font-mono text-[12px] tracking-[0.2em] mb-3 uppercase text-wattle">{{ heading }}</div>
        <ul class="list-none p-0 m-0 flex flex-col gap-1.75">
          <li v-for="[label, to] in items" :key="label">
            <NuxtLink
              :to="to"
              class="text-[12px] lg:text-[14px] hover:text-wattle transition-colors no-underline"
              style="color: #C4D4C0"
            >{{ label }}</NuxtLink>
          </li>
        </ul>
      </div>

    </div>

    <div
      class="mt-8 lg:mt-12 pt-4 lg:pt-5 border-t flex flex-col sm:flex-row justify-between gap-2 font-mono text-[9px] lg:text-[12px] tracking-[0.12em]"
      style="border-color: #2E3A2E; color: #8A9078"
    >
      <span>© 2026 ACACIA CLIMBING PTY LTD · ABN 38 237 542 815</span>
      <div class="flex gap-4">
        <NuxtLink to="/legal" class="hover:text-cream transition-colors no-underline" style="color: #8A9078">Privacy & Terms</NuxtLink>
        <span>SEQ · AUSTRALIA</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const columns: [string, [string, string][]][] = [
  ['Explore', [
    ['Our Mission', '/mission'],
    ['The Work', '/work'],
    ['About', '/about-us'],
    ['Crag Map', '/progress'],
  ]],
  ['Act', [
    ['Volunteer', '/volunteer'],
    ['Donate', '/donate'],
    ['File a report', '/report'],
  ]],
  ['Contact', [
    ['hello@acaciaclimbing.org', 'mailto:hello@acaciaclimbing.org'],
    ['Submit a crag', 'mailto:hello@acaciaclimbing.org'],
  ]],
]
</script>
