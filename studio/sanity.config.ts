import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { presentation } from './presentation'
import { SINGLETONS } from './schemaTypes/chrome'

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
    // Settings, navigation, footer and the help band are single documents, so hide them from "create new"
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
})
