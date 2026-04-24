<template>
  <footer class="px-4 sm:px-6 lg:px-12 pt-10 md:pt-14 lg:pt-18 pb-8 lg:pb-10 bg-ink text-cream">
    <h2
      class="font-serif font-normal m-0 mb-8 lg:mb-12 tracking-[-0.04em]"
      style="font-size: clamp(48px, 12vw, 220px); line-height: 0.85"
    >
      Acacia.
    </h2>

    <div
      class="grid gap-8 sm:gap-10 lg:gap-12 pt-8 lg:pt-10 border-t grid-cols-2 sm:grid-cols-4"
      style="border-color: #243824"
    >
      <p
        class="font-serif italic leading-[1.45] m-0 col-span-2 sm:col-span-2"
        style="font-size: clamp(14px, 1.5vw, 18px); color: #C4D4C0; max-width: 420px"
      >
        A field organisation for climbing access in South East Queensland.
        An ACAQ chapter. A KAYA partner. Building the long work.
      </p>

      <div v-for="[heading, items] in columns" :key="heading">
        <div
          class="font-mono text-[10px] tracking-[0.2em] mb-3 uppercase"
          style="color: #5E8A68"
        >{{ heading }}</div>
        <ul class="list-none p-0 m-0 flex flex-col gap-[7px]">
          <li v-for="item in items" :key="item" class="text-[12px] lg:text-[13px] gap-1.75">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div
      class="mt-8 lg:mt-12 pt-4 lg:pt-5 border-t flex flex-col sm:flex-row justify-between gap-2 font-mono text-[9px] lg:text-[10px] tracking-[0.12em]"
      style="border-color: #243824; color: #527A5C"
    >
      <span>© 2026 ACACIA CLIMBING PTY LTD · ABN 30 237 545 015</span>
      <span>VOL. II · AUTUMN</span>
      <span>SEQ · AUSTRALIA</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const columns: [string, string[]][] = [
  ['Explore', ['Mission', 'Progress', 'Field reports']],
  ['Act', ['Volunteer', 'Steward', 'Donate', 'Start a chapter']],
  ['Contact', ['hello@acc.org', 'Press kit', 'Submit a crag', 'Meetings']],
]
</script>
