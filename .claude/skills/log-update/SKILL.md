---
name: log-update
description: Use when Cooper mentions something that happened (a council reply, a meeting, a clean-up day, new signage, a crag documented on KAYA) or types /log-update. Turns it into a published Update on the site, and updates the crag if its status changed.
---

Updates are the site's heartbeat. They show councils and climbers that things are moving.

1. Get the facts from Cooper in his own words: what happened, when, which crag(s). Don't make anything up; ask if a detail is missing.
2. Draft the update: a short title (sentence case), a one or two sentence summary, and an optional short body. Homey and honest, first person plural ("we"), no hype, no em dashes, Australian spelling. Be careful and fair when describing council positions; never imply a decision that hasn't been made.
3. Show him the draft and wait for an OK or edits.
4. With the Sanity MCP: create an `update` document (title, slug, date, summary, body, crags references), then publish it.
5. If a crag's situation changed, patch that `crag`: `status`, `councilStatus`, the relevant `milestones` item, and `updatedAt` to today. Publish.
6. Tell him it's live once the site rebuilds (a couple of minutes), and offer a matching Instagram caption.
