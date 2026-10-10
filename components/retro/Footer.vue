<template>
  <footer class="bg-forest text-paper border-t-2 border-paper/20 px-6 py-9">
    <div class="max-w-[1240px] mx-auto flex flex-wrap justify-between items-center gap-5">
      <RetroWordmark :size="40" />
      <p class="m-0 font-poster text-2xl">Made by climbers, for the places we love</p>
      <div class="flex flex-wrap gap-5 text-[15px]">
        <a href="mailto:hello@acaciaclimbing.org" class="text-paper">hello@acaciaclimbing.org</a>
        <NuxtLink to="/legal" class="text-paper/80">Privacy and terms</NuxtLink>
      </div>
    </div>
  </footer>
</template>
