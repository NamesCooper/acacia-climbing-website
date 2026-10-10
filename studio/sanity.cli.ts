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
})
