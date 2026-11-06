# Thomas Abraham's Portfolio

A website detailing some of my previous work which can act as a dynamic portfolio and resume.

## Domain : [thomas-abraham13.github.io](https://thomas-abraham13.github.io)

## Development

Requires Node 20 or later (see `.nvmrc`).

```sh
npm ci
npm start        # dev server at http://localhost:5173
npm test         # Vitest
npm run lint     # ESLint (Airbnb)
npm run build    # production build in build/
npm run preview  # serve the production build locally
```

Built with Vite, React 19 and React Router 7.

## Editing content

All page content lives in JSON under [`src/profile/`](src/profile) and is bundled
at build time. Images live under [`public/images/`](public/images) and are
referenced from the JSON by their path relative to `public/`
(e.g. `images/projects/nginx-streaming.webp`). Prefer WebP, sized to roughly twice the
display size.

New pages are added in `src/profile/routes.json` (and a matching component in
`src/MainApp.jsx`) plus a link in `src/profile/navbar.json`.

## Deployment

Pushing to `main` runs [CI](.github/workflows/ci.yml): lint, test, build, then
publish `build/` to the `gh-pages` branch, which GitHub Pages serves. Pull
requests run the same checks without deploying. `npm run deploy` still works for
a manual deploy from a local machine.

GitHub Pages has no server-side rewrites, so the build also writes `build/404.html`
(a copy of `index.html`). Direct visits to routes such as `/projects` load the app
from that page and React Router renders the right section.

## Analytics

Google Analytics loads only in production and only after the visitor allows
analytics. Set `VITE_GA_MEASUREMENT_ID` in the production environment; the
current GitHub Pages value is stored in `.env.production`.

GA4 Enhanced Measurement is responsible for page views. In the GA4 web data
stream, enable **Enhanced measurement > Page views > Page changes based on
browser history events** so React Router navigation is counted without adding
duplicate manual page-view events.

The app also records consented resume, documentation, social, project-link, and
theme interactions. Web performance is reported through `CLS`, `INP`, `LCP`,
`FCP`, and `TTFB` events using GA4's recommended metric parameters.
