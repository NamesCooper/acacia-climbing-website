// Every GROQ query the site runs, in one place. Shared by the normal build
// (composables) and the preview server (server/api/preview-query.post.ts).

export const QUERIES = {
  crags: /* groq */ `
*[_type == "crag" && defined(slug.current)]
| order(select(status == "completed" => 0, status == "recognised" => 1, status == "progress" => 2, 3) asc, name asc) {
  "id": slug.current,
  name, subtitle, status, statusLabel, council, councilStatus, description,
  problems, style, season, state, region, updatedAt, kayaUrl, areaGeoJson,
  "lat": location.lat,
  "lng": location.lng,
  "milestones": milestones[]{ text, status }
}`,

  updates: /* groq */ `
*[_type == "update" && defined(slug.current)] | order(date desc) {
  "slug": slug.current, title, date, summary, body,
  "crags": crags[]->{ "id": slug.current, name }
}`,

  page: /* groq */ `
*[_type == "page" && slug.current == $slug][0] {
  title, "slug": slug.current, seoDescription, eyebrow, heading, lede, showHelpBand,
  "sections": coalesce(sections, [])
}`,

  // Navigation, footer and "Got an hour?" band: one trip for all three
  chrome: /* groq */ `{
  "nav": *[_id == "navigation"][0]{ links[]{ _key, label, link }, buttonLabel, buttonLink },
  "footer": *[_id == "footer"][0]{ tagline, columns[]{ _key, heading, links[]{ _key, label, link } }, smallPrint, smallPrintRight },
  "helpBand": *[_id == "helpBand"][0]{ heading, accent, intro, pills[]{ _key, label, link, colour }, linkLabel, linkHref },
  "noHelpPages": *[_type == "page" && showHelpBand == false].slug.current
}`,
} as const

export type QueryName = keyof typeof QUERIES

// Queries whose text can carry hidden click-to-edit markers in preview.
// Crags are left out because the map uses their values (status, coordinates) as data.
export const EDITABLE_QUERIES: QueryName[] = ['updates', 'page', 'chrome']
