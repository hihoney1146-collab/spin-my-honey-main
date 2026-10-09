# Online Spin Wheel

Source code for [onlinespinwheel.fun](https://onlinespinwheel.fun): free online spin wheels (name picker, yes/no, raffle, Secret Santa and more) that run in the browser.

## Stack

- Vite, React 18, TypeScript, React Router
- Tailwind CSS and shadcn/ui components
- Static site generation: every public route is rendered to HTML at build time (`src/entry-server.tsx`, `scripts/generate-static-pages.mjs`) and hydrated in the browser
- Hosting: Vercel (static output plus one serverless function, `api/spin-counter.js`)

## Local development

Requires Node.js 18 or newer and npm.

```sh
npm install
npm run dev        # dev server on http://localhost:8080
```

## Production build

```sh
npm run build:prod # client bundle, server bundle, then static HTML for every route into dist/
npm run audit:all  # SEO and content audits against dist/
npm run test:unit  # unit tests
```

`npm run build` runs the full pipeline used for deployment (it also regenerates the sitemap, OG images and other generated assets first).

## Notes

- Page titles, descriptions and structured data per route come from `scripts/seo-routes.mjs` and `scripts/static-page-meta.mjs`.
- Code that runs during rendering must not touch `window`, `document` or `localStorage` directly; read browser-only state inside `useEffect` so the server HTML and the first client render stay identical.
