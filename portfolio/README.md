# Abdessamad Belahcen — Portfolio

One-page personal portfolio. Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui · static export.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm start          # serve ./out locally
```

Checks: `npm run typecheck` and `npm run lint`.

## Edit content

All text lives in `src/data/`. You never need to touch components to change content.

| File | What it holds |
| --- | --- |
| `src/data/profile.ts` | Name, title, location, intro, photo, email, LinkedIn, GitHub, CV paths, SEO text, nav |
| `src/data/projects.ts` | The 6 featured project cards |
| `src/data/also-built.ts` | "Also built" list (with optional badge/link) |
| `src/data/skills.ts` | Skill groups and chips |
| `src/data/experience.ts` | Experience timeline |
| `src/data/types.ts` | Types for all of the above |

Search for `TODO` to find everything that still needs real content:

```bash
grep -rn TODO src/data
```

### Files to add in `public/`

- `public/photo.jpg`: your photo (square, about 600×600, under 100 KB). The current file is a placeholder.
- `public/cv-en.pdf` and `public/cv-fr.pdf`: the CV download buttons link here.

### Project images

Covers are WebP at 1200×750 (16:10), with a 640px copy for phones. To add or replace one:

1. Put the screenshot in `images-src/` (any name, e.g. `n8n-automation.png`).
2. Run `npm run images`. This writes `public/projects/n8n-automation.webp` and `-640.webp`.
3. Point the project's `image.src` in `src/data/projects.ts` to `/projects/n8n-automation.webp`.

## Deploy on Vercel

1. Import the GitHub repo in Vercel.
2. If the site is still inside the `EvoMarket-app` repo, set **Root Directory** to `portfolio`.
3. Framework preset: Next.js (auto-detected). Vercel serves the static `out/` export.
4. Environment variables (all optional):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, e.g. `https://abdessamad.dev`. Used in metadata, sitemap, robots and JSON-LD. Defaults to the Vercel production URL. |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Enables Umami analytics. No script is loaded when empty. |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | Umami script URL (default: Umami Cloud). For self-hosted Umami, e.g. `https://analytics.evomarket.ma/script.js`. |

Environment variables are read at build time, so redeploy after changing them.

## What's included

- **SEO:** metadata, canonical URL, Open Graph and Twitter cards, a generated OG image (`/opengraph-image`), `sitemap.xml`, `robots.txt`, and JSON-LD `Person` schema. TODO values are left out of the schema automatically.
- **Performance:** fully static, WebP covers with `srcset` (custom `next/image` loader for static export), self-hosted Inter font, and no animation libraries.
- **Accessibility:** semantic landmarks and headings, skip link, visible focus rings, alt text, external links announced to screen readers, and AA contrast.

Lighthouse on the production build, served with compression: mobile 95–99 performance and 100 for accessibility, best practices and SEO; desktop 100 in every category.
