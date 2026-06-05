# CLAUDE.md

## Project Overview

**academic-home-astro** — Jiacai Yi's personal academic homepage. A content-driven, minimal, fast academic site.

It integrates two MIT-licensed templates:
- **Layout / framework**: [academic-portfolio-astro](https://github.com/rubzip/academic-portfolio-astro) (two-column academic layout, content collections)
- **Polish / aesthetic**: inspired by [AstroPaper](https://github.com/satnaing/astro-paper) (typography, theming, Pagefind search)

## Tech Stack

- **Astro 6** + **Tailwind CSS 4** (`@tailwindcss/vite`, no `tailwind.config.js`)
- **Content**: Markdown + YAML frontmatter via Astro Content Collections (no database)
- **Math**: KaTeX (`remark-math` + `rehype-katex`)
- **Search**: Pagefind (`pagefind --site dist` runs after `astro build`)
- **Fonts**: Inter (body) + JetBrains Mono (code/meta), self-hosted via fontsource
- **Deploy**: GitHub Pages via `.github/workflows/deploy.yml` (`withastro/action`)

## Commands

```bash
npm run dev      # dev server (localhost:4321)
npm run build    # astro build + pagefind index → dist/
npm run preview  # preview production build (needed to test search locally)
npm run migrate  # re-run content migration from ../academic-home/content
```

## Structure

```
src/
├── config/        # site.ts, social.ts, navigation.ts, pages.ts, themes.ts (barrel: index.ts)
├── content/       # publications/ projects/ posts/ talks/ + bio.md cv.md
├── components/
│   ├── layout/    # LeftSidebar, Navbar, RightMain, Footer
│   ├── content/   # ContentHeader, ContentLinks, NewsList
│   └── ui/        # BaseItemCard, Tag, Timeline, Icon, ...
├── layouts/       # BaseLayout, BaseDetail, BaseListing
├── data/news.ts   # home-page News timeline data
├── pages/         # index, search, publications/, projects/, posts/, talks/, cv/, tags/
└── styles/global.css  # ALL styles (no <style> in .astro files)

content.config.ts  # collection schemas
scripts/migrate.mjs # one-off TermHub → new schema migration
public/images/     # migrated image assets
```

## Content Collections (schema in `src/content.config.ts`)

| Collection | Key frontmatter |
|---|---|
| publications | title, author, date, journal, external_url, image, description, tags |
| projects | title, description, external_url, image, tags |
| posts (blog) | title, date, description, author, tags |
| talks | title, date, event, external_url, description, tags |
| bio (single) | name, avatar, shortBio, institution |
| cv (single) | name, title, experience[], education[] |

## Conventions

- **No `<style>` in `.astro` files** — all styles live in `src/styles/global.css` using the unified class system (see `DESIGN-GUIDE.md`).
- **Flat design**: no shadows/glassmorphism; 1px borders; one accent color per theme.
- **Themes**: edit `THEME_CONFIG` in `src/config/site.ts`; palettes in `src/config/themes.ts`. Preview all at `/dev-tools`.
- **Brand/social icons**: Tabler outline SVGs in `src/assets/icons/`; register in `src/config/social.ts` (`SOCIAL_ICONS`).

## Deployment

- Push to `main` → GitHub Pages deploy. Target: `https://jiacai0101.github.io` (`base: '/'`).
- For a project-page repo instead, set `base` in `astro.config.mjs` accordingly.

## Bilingual (i18n)

- Astro i18n: `defaultLocale: 'en'` (no prefix), `zh` under `/zh/`. Config in `astro.config.mjs`.
- UI strings + helpers in `src/i18n/ui.ts` (`useTranslations`, `getLangFromUrl`, `localizePath`, `stripLocaleId`).
- Content: EN at each collection root, ZH in `<collection>/zh/` (entry ids prefixed `zh/`). Single-file `bio.md`/`bio-zh.md`, `cv.md`/`cv-zh.md`.
- `BaseListing`/`BaseDetail` take a `locale` prop and filter by id prefix. EN page routes exclude `zh/`; zh routes live under `src/pages/zh/`.
- Language switcher + localized nav labels in `Navbar.astro`. Tags are EN-only (hidden on the zh site).
- Pagefind indexes both languages automatically.

## Notes / Follow-ups

- **MCP**: the upstream `termhub` MCP server (`../academic-home/mcp-server`) targets the old `content/` schema; it needs adapting to these collections (and the en/zh split) before reuse.
- Migration is reproducible via `npm run migrate` (deterministic, bilingual, field mapping in `scripts/migrate.mjs`).
