# `@portaless/templates`

Standalone fictional demo profile, showcase templates, and original geometric SVG assets for [Portaless](https://github.com/geroiloyola/portaless) (Decision **D11**).

## Contents

- `demo/home.json` & `demo/home.es.json`: Bilingual EN/ES marketing demo home layouts.
- `demo/posts/bienvenida.md`: Sample demo blog post.
- `demo/pages/`:
  - `ejemplo-atomic-elements.json` & `ejemplo-atomic-elements.en.json`: Atomic Elements catalog.
  - Eight fictional D8 showcase use cases (`creator-demo`, `musica-merch`, `link-in-bio`, `club-evento`, `boutique`, `portafolio`, `lanzamiento`, `servicios`), each visibly labeled **"Demo content, fictional"**.
- `demo/public/`: 21 original geometric SVG assets (no real people, no third-party stock images, no external YouTube embeds, no Formspree endpoints) plus demo-only redirects and auxiliary previews.
- `demo/ASSETS-LICENSES.md`: Per-asset origin and license register (PR-B1 §3 gate).

## Fictional Content & Asset Policy

Every showcase page and visual asset in this repository is strictly fictional and self-contained:

- Zero personal social accounts, personal avatars, or affiliate links.
- Zero external `images.unsplash.com`, `placehold.co`, YouTube embeds, or external form endpoints.
- Every SVG in `demo/public/` is registered in `demo/ASSETS-LICENSES.md`.

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
npm run verify         # JSON schema/structure, Class D & media gate, license parity
npm run smoke:tarball  # npm pack + isolated install + entrypoint/file check
```

## License

Dedicated under **CC0-1.0** (`LICENSE`), with per-asset provenance documented in `demo/ASSETS-LICENSES.md`.
