---
name: check-site
description: Use before merging a branch, after a bigger change, or when Cooper types /check-site. Builds the static site the way Cloudflare Pages does and reports anything broken in plain words.
---

1. Run `pnpm generate` and confirm it finishes with "Generated public .output/public".
2. If it fails, find the first real error (skip Browserslist and sourcemap warnings), explain it in one or two plain sentences, and offer the fix.
3. If it passes, spot-check that the crag names appear in `.output/public/index.html`.
4. Mention any new mobile, accessibility or "claim that isn't true yet" issues you noticed in the changed files.
5. Report back in three lines or fewer: passed or not, anything to fix, and whether it's safe to merge.
