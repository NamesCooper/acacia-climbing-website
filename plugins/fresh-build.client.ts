// Keeps open tabs from showing old content after the site is rebuilt.
//
// A Nuxt "plugin" is a small file that runs when the app starts; ending the name in
// `.client.ts` means it only runs in the browser. Clicking a link inside the site doesn't reload
// the page: Nuxt fetches that page's saved data file, whose address includes the build number of
// the copy you started from. In a tab opened before the latest publish, that means data from the
// old build, which the browser happily serves from its cache.
//
// So before each in-site page change we ask the server which build is live (a tiny file, about
// 100 bytes). If it's newer than the one this tab is running, we do a normal full page load
// of where you were heading, which always gets the current site.
export default defineNuxtPlugin(() => {
  const router = useRouter()
  const thisBuild = useRuntimeConfig().app.buildId

  async function liveBuild(): Promise<string> {
    try {
      const res = await fetch(`/_nuxt/builds/latest.json?${Date.now()}`, { cache: 'no-store' })
      if (res.ok) return (await res.json()).id ?? thisBuild
    } catch {
      // Offline or blocked: carry on with the in-page navigation as normal
    }
    return thisBuild
  }

  router.beforeEach(async (to, from) => {
    if (to.path === from.path) return
    if ((await liveBuild()) !== thisBuild) {
      window.location.assign(to.fullPath)
      return false
    }
  })
})
