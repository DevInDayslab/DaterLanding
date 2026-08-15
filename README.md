# Dater Landing

Vite + React marketing site for [dater.social](https://dater.social).

## Production SEO / hosting (Hostinger)

- **Hostinger** serves the site (JS/CSS/images) from `dist/`.
- **Express** gets a copy of the Vite SPA shell (`index-spa.html` → `backend/public/landing/index.html`) and injects SEO from Postgres for crawlers.
- [`public/index.php`](public/index.php) + [`.htaccess`](public/.htaccess) route document requests: **bots** are proxied to `api.dater.social`; **browsers** get `index-spa.html`.

Details: [`../backend/docs/LANDING_SEO.md`](../backend/docs/LANDING_SEO.md).

```bash
npm run build:deploy   # build dist/ + sync SPA shell to backend/public/landing/
# upload dist/ to Hostinger docroot, then redeploy backend
```

`dist/` layout after build: `index.php`, `index-spa.html`, `.htaccess`, `assets/`, static files. No `index.html` in dist.

Local `vite dev` still uses the static placeholders in `index.html`.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
