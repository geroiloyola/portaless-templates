# `@portaless/templates`

Official fictional demo profile, showcase templates, original geometric SVG assets, and live static demo deployment for [Portaless](https://github.com/geroiloyola/portaless) (Decision **D11**).

- **Live official demo:** [geroiloyola.github.io/portaless-templates](https://geroiloyola.github.io/portaless-templates/) *(static showcase only — GitHub Pages runs no `functions/`, so admin, login, and dynamic `/trust/:siteId` require self-hosting or Cloudflare Pages)*
- **License:** [CC0-1.0](./LICENSE) with per-asset provenance in [`demo/ASSETS-LICENSES.md`](./demo/ASSETS-LICENSES.md)

---

## What this repo is

- **The official Portaless demo profile (`demo/`):** bilingual EN/ES marketing home (`home.json`, `home.es.json`), sample blog post (`posts/bienvenida.md`), Atomic Elements catalog (`ejemplo-atomic-elements`), and all **eight fictional D8 showcase use cases** (`creator-demo`, `musica-merch`, `link-in-bio`, `club-evento`, `boutique`, `portafolio`, `lanzamiento`, `servicios`), each visibly labeled **"Demo content, fictional"**.
- **Self-contained original visual assets (`demo/public/`):** 21 original geometric SVGs (no real people, no third-party stock photos, no YouTube embeds, no Formspree endpoints), all registered in [`demo/ASSETS-LICENSES.md`](./demo/ASSETS-LICENSES.md).
- **Live demo deployment (`.github/workflows/deploy-demo-pages.yml`):** builds `geroiloyola/portaless` with `PORTALESS_SITE_PROFILE=demo` and publishes to GitHub Pages.

## What this repo is not

- It is **not** the Portaless CMS engine, onboarding generator (`packages/onboarding/`), or dashboard skin system (`packages/dashboard/src/skins/`): those remain in [`geroiloyola/portaless`](https://github.com/geroiloyola/portaless) (Decision **D9**).
- It has **zero runtime dependencies** on Portaless core or any external registry.

---

## Consuming via GitHub Release Tarball

Pin the immutable release tarball in `package.json` (no npm registry token required):

```json
{
  "devDependencies": {
    "@portaless/templates": "https://github.com/geroiloyola/portaless-templates/releases/download/v0.1.0/portaless-templates-0.1.0.tgz"
  }
}
```

Resolve demo profile paths from Node or Astro:

```js
import { getDemoProfilePaths } from "@portaless/templates";

const paths = getDemoProfilePaths();
console.log(paths.root, paths.pagesDir, paths.postsDir, paths.publicDir);
```

## Verification

```bash
npm run verify         # JSON structure, D8 fictional labels, Class D & media gate, CC0-1.0 parity
npm run smoke:tarball  # npm pack + isolated install + entrypoint/file check
```

---

## Roadmap (`portaless-templates`)

- `[x]` Extract fictional D8 showcase, 21 original local SVGs, and `ASSETS-LICENSES.md` (`v0.1.0`).
- `[x]` Automated GitHub Pages live demo deployment (`deploy-demo-pages.yml`).
- `[ ]` Publish refreshed, anonymized visual screenshots gallery (`screenshots/`) captured from the fictional demo runtime.
- `[ ]` Add additional community-contributed fictional starter templates (all gated by `verify-templates.mjs` and `ASSETS-LICENSES.md`).

---

## Ecosystem (5 connected gears)

| Repository | Role | License |
|---|---|---|
| [`verared/vera-trust-spec`](https://github.com/verared/vera-trust-spec) | Normative specification, schemas & conformance vectors (`@verared/spec`) | **CC BY 4.0** |
| [`verared/vera-trust-stack`](https://github.com/verared/vera-trust-stack) | Neutral reference implementation (`@verared/*`, L0-net/L1/L2) | **Apache-2.0** |
| [`geroiloyola/portaless-plugin-sdk`](https://github.com/geroiloyola/portaless-plugin-sdk) | Third-party plugin types, manifest validator & capability catalog (`@portaless/plugin-sdk`) | **MIT** |
| **`geroiloyola/portaless-templates`** *(this repo)* | Official fictional demo profile, templates, SVGs & live demo (`@portaless/templates`) | **CC0-1.0** |
| [`geroiloyola/portaless`](https://github.com/geroiloyola/portaless) | Sovereign reference CMS node (`starter` default) | **AGPL-3.0-or-later** |
