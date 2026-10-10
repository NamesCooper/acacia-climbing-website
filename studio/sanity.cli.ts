import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '9cry3kpb',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Studio will deploy to https://acaciaclimbing.sanity.studio
  studioHost: 'acaciaclimbing',
  autoUpdates: true,
})
