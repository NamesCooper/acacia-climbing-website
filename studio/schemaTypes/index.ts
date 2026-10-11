import { crag } from './crag'
import { milestone } from './milestone'
import { update } from './update'
import { siteSettings } from './siteSettings'
import { page } from './page'
import { sectionTypes } from './sections'
import { chromeTypes } from './chrome'

export const schemaTypes = [page, ...sectionTypes, ...chromeTypes, crag, milestone, update, siteSettings]
