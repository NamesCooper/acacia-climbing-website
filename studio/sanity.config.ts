import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { presentation } from './presentation'

// The project ID is not a secret. It is set once you run `npx sanity init` (see README).
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'qxrv033n'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'acc',
  title: 'Acacia Climbing Coalition',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), presentation, visionTool()],
  schema: {
    types: schemaTypes,
    // Site settings is a single document, so hide it from the "create new" menu
    templates: (templates) => templates.filter(({ schemaType }) => schemaType !== 'siteSettings'),
  },
})
