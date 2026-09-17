# cliodhnas.com

My personal site — a 2000s Bebo/MySpace-style profile built with [Astro](https://astro.build), deployed to GitHub Pages at [www.cliodhnas.com](https://www.cliodhnas.com).

## Develop

```sh
npm install
npm run dev        # localhost:4321
npm test           # data-integrity tests (Vitest)
npm run build      # static build to dist/
```

## How it's put together

- `src/data/*.ts` — all the content: owner profile, projects, skills, bookmarks, skins. Edit these to change the site.
- `src/components/*.astro` — retro panels (profile sidebar, Top 16 projects, whiteboard, sparkles, theme switcher).
- `src/styles/global.css` — the skins. Each theme is a `[data-theme]` token block; the switcher sets `data-theme` on `<html>` and persists it in `localStorage`.
- Tests assert the data is complete enough to render (links are https, orders unique, every skin has a CSS block), so bad data fails CI before it ships.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`: test, build, publish to GitHub Pages.
