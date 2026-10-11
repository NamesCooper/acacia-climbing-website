// Registered in nuxt.config.ts for the preview build only (not in /plugins, so the live site never bundles it).
// Click-to-edit overlays, only on the preview site and only inside the Studio's
// "Visual editor" tab. ".client" in the file name means Nuxt runs it in the browser only.
export default defineNuxtPlugin(async () => {
  const { sanity } = useRuntimeConfig().public
  if (!sanity.preview) return
  if (window.self === window.top && !window.opener) return

  const { enableVisualEditing } = await import('@sanity/visual-editing')
  const router = useRouter()

  type Navigate = Parameters<NonNullable<Parameters<typeof enableVisualEditing>[0]>['history']['subscribe']>[0]
  let navigate: Navigate | undefined
  let fromStudio = false

  // The Studio may send a full address; the router only wants the path part
  const toPath = (url: string) => {
    const u = new URL(url, window.location.origin)
    return u.pathname + u.search + u.hash
  }

  // Tell the Studio whenever the preview changes page (unless the Studio asked for it)
  router.afterEach((to) => {
    if (navigate && !fromStudio) navigate({ type: 'push', url: to.fullPath })
    fromStudio = false
  })

  enableVisualEditing({
    // Keeps the Studio's address bar and the preview in step
    history: {
      subscribe: (_navigate) => {
        navigate = _navigate
        // Say where we are as soon as we connect
        navigate({ type: 'replace', url: window.location.pathname + window.location.search })
        return () => {
          navigate = undefined
        }
      },
      update: (u) => {
        if (u.type === 'push' || u.type === 'replace') {
          fromStudio = true
          router[u.type](toPath(u.url))
        } else if (u.type === 'pop') {
          router.back()
        }
      },
    },
    // When you type in the Studio, re-run the page's queries so the preview updates
    refresh: () => refreshNuxtData(),
  })
})
