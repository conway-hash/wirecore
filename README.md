# WireCore

Static marketing site for WireCore — professional electrical installations, security camera systems, and solar panel installation.

Built with **Svelte 5 + SvelteKit**, fully pre-rendered, and deployed on **Cloudflare Pages**.

## Tech stack

- [Svelte 5](https://svelte.dev) with SvelteKit
- [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static) — outputs a pure static `build/` directory
- TypeScript
- Vite

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The output is placed in `build/`. Preview locally:

```bash
npm run preview
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub / GitLab.
2. In the [Cloudflare Pages dashboard](https://pages.cloudflare.com/), create a new project and connect the repo.
3. Set the build configuration:
   - **Framework preset**: SvelteKit
   - **Build command**: `npm run build`
   - **Build output directory**: `build`
4. Deploy.

> **Before going live** — update these placeholders:
> - Domain `wirecore.sk` in `src/routes/+page.svelte` (canonical, OG, Twitter meta tags)
> - Domain `wirecore.sk` in `static/robots.txt` and `static/sitemap.xml`
> - Phone number and email in the Contact section
> - `<lastmod>` date in `static/sitemap.xml` when content changes

## SEO checklist

- [x] Slovak `lang="sk"` on `<html>`
- [x] Unique `<title>` and `<meta name="description">`
- [x] Canonical URL
- [x] Open Graph tags
- [x] Twitter/X card tags
- [x] JSON-LD structured data (LocalBusiness)
- [x] `robots.txt`
- [x] `sitemap.xml`
- [x] `prerender = true` on all routes
- [x] Semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `aria-*`)
