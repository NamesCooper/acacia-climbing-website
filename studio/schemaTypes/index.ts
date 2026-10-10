import { crag } from './crag'
import { milestone } from './milestone'
import { update } from './update'
import { siteSettings } from './siteSettings'
import { page } from './page'
import { sectionTypes } from './sections'

export const schemaTypes = [page, ...sectionTypes, crag, milestone, update, siteSettings]
