# Dater Landing

Vite + React marketing site for [dater.social](https://dater.social).

## Production SEO / hosting

- **Vercel** serves the site (JS/CSS/images).
- **Express** only gets Vite’s **`index.html`** and injects SEO from Postgres.
- [`middleware.js`](middleware.js) proxies `/`, `/about`, etc. to `api.dater.social`.

Details: [`../backend/docs/LANDING_SEO.md`](../backend/docs/LANDING_SEO.md).

```bash
npm run build
npm run sync:seo-html   # copies ONLY dist/index.html → backend/public/landing/
# redeploy backend, then redeploy this Vercel project
```

Local `vite` still uses the static placeholders in `index.html`.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
