import type { StructureResolver } from 'sanity/structure'

// Custom sidebar: Site settings as a single editable document, then crags and updates.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('crag').title('Crags'),
      S.documentTypeListItem('update').title('Updates'),
    ])
