<template>
  <!-- Nuxt shows this page for any error, mostly "page not found". NuxtLayout wraps it in the
       usual nav and footer so a wrong link still feels like part of the site. -->
  <NuxtLayout>
    <SitePageHeader
      :eyebrow="notFound ? 'Page not found' : 'Something went wrong'"
      :title="notFound ? 'Off the' : 'Bit of a'"
      :accent="notFound ? 'track' : 'slip'"
      :lede="notFound
        ? `The page you're after isn't here. It may have moved, or the link might be a little off.`
        : `Something broke on our end. Try again in a minute, or head back home.`"
    />
    <div class="max-w-[1240px] mx-auto px-6 pb-16 flex flex-wrap gap-4">
      <UiButton variant="moss" @click="go('/')">Back to home</UiButton>
      <UiButton variant="paper" @click="go('/progress')">See the crag map</UiButton>
      <UiButton variant="paper" @click="go('/contact')">Contact us</UiButton>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error?.statusCode === 404)

// clearError leaves the error page and goes to the new address
const go = (to: string) => clearError({ redirect: to })

useHead({ title: () => (notFound.value ? 'Page not found' : 'Something went wrong') + ' · Acacia Climbing Coalition', meta: [{ name: 'robots', content: 'noindex' }] })
</script>
