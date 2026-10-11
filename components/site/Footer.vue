<template>
  <!-- Words and links come from "Footer" in the Studio -->
  <footer class="bg-forest text-paper border-t-2 border-paper/20 px-6 pt-12 pb-8">
    <div class="max-w-[1240px] mx-auto">
      <div class="flex flex-wrap justify-between items-start gap-10">
        <div class="max-w-[360px]">
          <UiWordmark :size="40" />
          <p v-if="footer?.tagline" class="mt-4 mb-0 font-poster text-2xl leading-snug">{{ footer.tagline }}</p>
        </div>
        <nav aria-label="Footer" class="flex flex-wrap gap-x-14 gap-y-8">
          <div v-for="col in footer?.columns ?? []" :key="col._key ?? col.heading">
            <p class="m-0 mb-3 font-grotesk font-extrabold text-sm uppercase tracking-[0.08em] text-wattle">{{ col.heading }}</p>
            <ul class="list-none p-0 m-0 flex flex-col gap-2">
              <li v-for="l in col.links ?? []" :key="l._key ?? l.label">
                <NuxtLink v-bind="chromeLink(l.link)" class="text-paper/85 hover:text-wattle no-underline">{{ l.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="mt-12 pt-5 border-t border-paper/20 flex flex-wrap justify-between gap-3 text-[13px] text-paper/70">
        <span>© {{ year }}<template v-if="footer?.smallPrint">{{ ' ' }}{{ footer.smallPrint }}</template></span>
        <span v-if="footer?.smallPrintRight">{{ footer.smallPrintRight }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const { data } = await useSiteChrome()
const footer = computed(() => data.value?.footer)
</script>
