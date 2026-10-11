import type { StructureResolver } from 'sanity/structure'

// Custom sidebar: pages first (with a "still mockup" shortcut), then crags, updates and settings.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('page').title('Pages'),
      S.listItem()
        .title('Pages still with mockup copy')
        .child(S.documentList().title('Still mockup').filter('_type == "page" && copyStatus == "mockup"')),
      S.divider(),
      S.documentTypeListItem('crag').title('Crags'),
      S.documentTypeListItem('update').title('Updates'),
      S.divider(),
      // Shows on every page
      ...[
        ['navigation', 'Navigation'],
        ['helpBand', '"Got an hour?" band'],
        ['footer', 'Footer'],
      ].map(([id, title]) => S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id))),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
