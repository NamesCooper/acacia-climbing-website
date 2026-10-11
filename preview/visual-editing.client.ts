// Registered in nuxt.config.ts for the preview build only (not in /plugins, so the live site never bundles it).
// Click-to-edit overlays, only on the preview site and only inside the Studio's
// Presentation tab. ".client" in the file name means Nuxt runs it in the browser only.
export default defineNuxtPlugin(async () => {
  const { sanity } = useRuntimeConfig().public
  if (!sanity.preview) return
  if (window.self === window.top && !window.opener) return

  const { enableVisualEditing } = await import('@sanity/visual-editing')
  const router = useRouter()

  enableVisualEditing({
    // Keeps the Studio's address bar and the preview in step
    history: {
      subscribe: (navigate) => router.afterEach((to) => navigate({ type: 'push', url: to.fullPath })),
      update: (u) => {
        if (u.type === 'push') router.push(u.url)
        else if (u.type === 'replace') router.replace(u.url)
        else if (u.type === 'pop') router.back()
      },
    },
    // When you type in the Studio, re-run the page's queries so the preview updates
    refresh: () => refreshNuxtData(),
  })
})
