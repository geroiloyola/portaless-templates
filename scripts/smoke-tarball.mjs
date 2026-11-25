#!/usr/bin/env node
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "portaless-templates-smoke-"));

try {
  const packOut = execFileSync("npm", ["pack", "--pack-destination", tmpRoot], {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();
  const tarballName = packOut.split(/\r?\n/).pop().trim();
  const tarballPath = path.join(tmpRoot, tarballName);
  assert.ok(fs.existsSync(tarballPath), `Tarball not created: ${tarballPath}`);

  const consumerDir = path.join(tmpRoot, "consumer");
  fs.mkdirSync(consumerDir, { recursive: true });
  fs.writeFileSync(
    path.join(consumerDir, "package.json"),
    JSON.stringify({ name: "templates-smoke-consumer", private: true, type: "module" }, null, 2),
  );

  execFileSync("npm", ["install", "--no-audit", "--no-fund", tarballPath], {
    cwd: consumerDir,
    stdio: "inherit",
  });

  const installedRoot = path.join(consumerDir, "node_modules", "@portaless", "templates");
  const mod = await import(pathToFileURL(path.join(installedRoot, "index.mjs")).href);
  const paths = mod.getDemoProfilePaths();

  for (const required of [
    paths.homeFile,
    paths.homeEsFile,
    paths.assetsLicensesFile,
    path.join(paths.postsDir, "bienvenida.md"),
    path.join(paths.pagesDir, "creator-demo.json"),
    path.join(paths.pagesDir, "ejemplo-atomic-elements.json"),
    path.join(paths.pagesDir, "ejemplo-atomic-elements.en.json"),
    path.join(paths.publicDir, "avatars", "creator-demo.svg"),
    path.join(paths.publicDir, "demo-assets", "video-preview-course.svg"),
    path.join(installedRoot, "LICENSE"),
    path.join(installedRoot, "README.md"),
  ]) {
    assert.ok(fs.existsSync(required), `Missing expected file in installed tarball: ${required}`);
  }

  console.log(`[smoke-tarball] OK: ${tarballName} installed cleanly and all demo profile paths resolved.`);
} finally {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
}
