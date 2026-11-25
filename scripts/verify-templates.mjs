#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DEMO_DIR = path.join(ROOT, "demo");
const PAGES_DIR = path.join(DEMO_DIR, "pages");
const PUBLIC_DIR = path.join(DEMO_DIR, "public");
const ASSETS_LICENSES_FILE = path.join(DEMO_DIR, "ASSETS-LICENSES.md");

const EXPECTED_D8_SLUGS = [
  "boutique",
  "club-evento",
  "creator-demo",
  "lanzamiento",
  "link-in-bio",
  "musica-merch",
  "portafolio",
  "servicios",
];

const FORBIDDEN_PATTERNS = [
  { name: "personal slug/account (jerry-bantz)", re: /jerry[-_]?bantz/i },
  { name: "unsplash external image", re: /images\.unsplash\.com|unsplash\.com/i },
  { name: "placehold.co external image", re: /placehold\.co/i },
  { name: "YouTube embed/link", re: /youtube\.com|youtu\.be/i },
  { name: "Amazon affiliate/product link", re: /amazon\.com|amzn\.to/i },
  { name: "Formspree external form endpoint", re: /formspree\.io/i },
];

function walkFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) {
      throw new Error(`Unexpected symlink in demo tree: ${path.join(dir, entry.name)}`);
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

// 1. License consistency check
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const licenseText = fs.readFileSync(path.join(ROOT, "LICENSE"), "utf8");
assert.equal(pkg.name, "@portaless/templates", "package name must be @portaless/templates");
assert.equal(pkg.license, "CC0-1.0", "package license must be CC0-1.0");
assert.ok(licenseText.includes("CC0 1.0 Universal"), "LICENSE file must contain CC0 1.0 Universal text");
assert.equal(Object.keys(pkg.dependencies ?? {}).length, 0, "package must have zero runtime dependencies");

// 2. Validate JSON files (home.json, home.es.json, pages/*.json)
const homeFiles = [path.join(DEMO_DIR, "home.json"), path.join(DEMO_DIR, "home.es.json")];
for (const file of homeFiles) {
  assert.ok(fs.existsSync(file), `Missing required home file: ${path.relative(ROOT, file)}`);
  const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  assert.equal(parsed.slug, "home", `${path.basename(file)} must have slug="home"`);
  assert.ok(Array.isArray(parsed.root) && parsed.root.length > 0, `${path.basename(file)} must have non-empty root[]`);
}

const pageFiles = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith(".json")).sort();
assert.ok(pageFiles.length >= EXPECTED_D8_SLUGS.length + 2, "Missing expected demo pages");

const parsedSlugs = new Set();
for (const file of pageFiles) {
  const full = path.join(PAGES_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const parsed = JSON.parse(raw);
  assert.ok(typeof parsed.slug === "string" && parsed.slug.length > 0, `${file} missing slug`);
  assert.ok(Array.isArray(parsed.root) && parsed.root.length > 0, `${file} missing root[]`);
  parsedSlugs.add(parsed.slug);

  // Class D & unverified media gate on every demo page JSON
  for (const { name, re } of FORBIDDEN_PATTERNS) {
    assert.equal(re.test(raw), false, `${file} violates gate (${name})`);
  }

  // Every D8 showcase page must visibly include the fictional notice
  if (EXPECTED_D8_SLUGS.includes(parsed.slug)) {
    assert.ok(
      raw.includes("Demo content, fictional"),
      `${file} must visibly include "Demo content, fictional"`,
    );
  }
}

for (const slug of EXPECTED_D8_SLUGS) {
  assert.ok(parsedSlugs.has(slug), `Missing required D8 showcase page: ${slug}.json`);
}

// 3. Verify posts/bienvenida.md exists
assert.ok(fs.existsSync(path.join(DEMO_DIR, "posts", "bienvenida.md")), "Missing demo/posts/bienvenida.md");

// 4. Verify all visual SVG assets in demo/public/ are registered in demo/ASSETS-LICENSES.md
//    and that no forbidden external/personal references exist in demo/public/
const assetsLicenses = fs.readFileSync(ASSETS_LICENSES_FILE, "utf8");
const publicFiles = walkFiles(PUBLIC_DIR);
let svgCount = 0;

for (const full of publicFiles) {
  const relFromDemo = path.relative(DEMO_DIR, full).split(path.sep).join("/");
  const raw = fs.readFileSync(full, "utf8");
  for (const { name, re } of FORBIDDEN_PATTERNS) {
    assert.equal(re.test(raw), false, `${relFromDemo} violates gate (${name})`);
  }
  if (full.endsWith(".svg")) {
    svgCount += 1;
    assert.ok(
      assetsLicenses.includes(`\`${relFromDemo}\``),
      `SVG asset not documented in demo/ASSETS-LICENSES.md: ${relFromDemo}`,
    );
  }
}

assert.equal(svgCount, 21, `Expected 21 original SVG assets in demo/public/, found ${svgCount}`);

console.log(
  `[verify-templates] OK: ${pageFiles.length} demo pages (8/8 D8 fictional), ${svgCount} documented SVGs, 0 forbidden references, license ${pkg.license} verified.`,
);
