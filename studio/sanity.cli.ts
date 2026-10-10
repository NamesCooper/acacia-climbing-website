import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'qxrv033n',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Studio is deployed to https://acaciaclimbing.sanity.studio
  studioHost: 'acaciaclimbing',
  deployment: {
    appId: 'jdf3pnntl84ei3idshuqugkg',
    autoUpdates: true,
  },
  // The Studio doesn't use tsconfig path aliases. Turning this off stops Vite walking up
  // into the website's tsconfig, which needs .nuxt and breaks deploys on a fresh machine.
  vite: (config) => ({
    ...config,
    resolve: { ...config.resolve, tsconfigPaths: false },
  }),
})
