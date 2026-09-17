# Site — Design Plan

Status: **Astro retro/Bebo-style portfolio at www.cliodhnas.com, deployed by GitHub Actions to Pages.**
Profile page is built; home, blog, and photos are placeholders.

## Code review findings (2026-09-17)

Broken today
- **Home page renders without the layout.** `src/pages/index.astro` imports `Layout` and `RetroHero` but never uses them, so `/` has no `<head>`, no nav, no theme, no styles. Everything is a bare `<main>`.
- **Tests fail against the data.** `src/test/renderData.test.ts` expects 3 social links (data has 2), 2 bio paragraphs (1), 5 fun facts (1), skill categories with a `proficiency` field (the `SkillCategory` interface is empty and the array is `[]`, so `fc.constantFrom()` is called with no arguments and throws), and 4+ bookmarks with `source` and `dateString` (3 bookmarks, none with either). The suite was written for a spec the data never caught up to.
- `astro.config.mjs` has `site: 'https://yourname.com'` while `public/CNAME` says `www.cliodhnas.com`. Canonical URLs and any future sitemap/RSS will be wrong.
- `README.md` is still the Astro starter template.

Design observations
- `projects.ts` is empty so the "Top 16 Projects" panel shows 16 placeholders. There are eight real repos to list.
- Press Start 2P is loaded twice (a `@import` in `global.css` and a `<link>` in the layout).
- Social links have empty `href`s.
- Visitor counter is a hard-coded string; luv counter resets on reload.
- Sparkle animation has no `prefers-reduced-motion` guard.
- Blog and photos pages are placeholders with no content pipeline.

## Phase 1 — Make it correct (do first)

1. Wrap `index.astro` in `Layout`, render `RetroHero`, keep the projects placeholder until Phase 2 fills it.
2. Fill `projects.ts` with the real repos (flashcards, pr-radar, hand-gestures, obsidian-linear-quickadd, witch-game, flink-sql, wardrobe, this site).
3. Rewrite the tests to assert what the site actually needs: every project has a title and a URL, every bookmark URL is https, owner has a name and at least one social link, theme ids in `ThemeSwitcher` match the `[data-theme]` blocks in `global.css`.
4. Give `SkillCategory` a real shape (`category`, `skills: {name, proficiency}[]`) and fill it, or delete the panel. Recommend filling it since the CSS for it exists.
5. Set `site` to `https://www.cliodhnas.com`, fix duplicate font load, fill social hrefs, rewrite the README.
6. Add `astro check` and `vitest` to the deploy workflow so a broken page never ships again.

Done when: `npm test` and `npm run build` pass, `/` looks like the profile page, CI runs both.

## Phase 2 — Content

- Blog via Astro content collections: `src/content/blog/*.md`, a listing page, per-post page with the retro frame, RSS feed via `@astrojs/rss`.
- Photos: real image grid using `astro:assets` for optimisation, lightbox with no JS dependency (`<dialog>`).
- Projects page pulls from `projects.ts` and links each card to its repo and, where one exists, a live demo (flashcards, hand-gestures once it is on Pages).

Testing: build-time; a Vitest test loads the content collection and asserts every post has a title, date, and description. A Playwright smoke test opens each route and checks the nav and an `h1` exist.

## Phase 3 — Retro features

- Guestbook: static site needs a backend. Options in order of effort: (a) GitHub Discussions via giscus, (b) a Cloudflare Worker with KV, (c) Supabase like flashcards. Recommend giscus first, zero infrastructure.
- Real visitor counter: GoatCounter (free, privacy-friendly) or a Worker counter. Keep the odometer styling.
- Persist the luv counter in `localStorage` and show "you've sent N luv" on return.
- Now-playing widget: a marquee that cycles through a hand-picked track list (no third-party player, just text and a link). Optional last.fm scrobble later.
- Cursor trail and a "profile song" toggle, both behind `prefers-reduced-motion`.
- More skins: two-tone Winamp, MySpace black.

Testing: theme switcher test (click → `data-theme` set → survives reload via the inline script). Reduced-motion snapshot test that the sparkle layer is hidden.

## Phase 4 — Quality

- Lighthouse in CI (performance, a11y, SEO budgets).
- Open Graph image per page, sitemap.
- 404 page in the retro frame.

## Iteration notes

First draft started with the guestbook because it is the most "Bebo" feature. Moved it to Phase 3: the home page is broken and the tests fail, so nothing else should ship first. Also decided to rewrite rather than restore the tests. The old tests encode requirements from a spec doc that is not in the repo ("Property 2", "Property 5"), and the data disagrees with them; tests that describe what the site needs are more useful than tests that describe what a template wanted. Replaced "skills with animated meters" with "fill or delete" to avoid building a panel that stays empty.
