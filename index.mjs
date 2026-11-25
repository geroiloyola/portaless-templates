import path from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_ROOT = path.dirname(fileURLToPath(import.meta.url));

export const DEMO_PROFILE_DIR = path.join(PACKAGE_ROOT, "demo");
export const DEMO_HOME_FILE = path.join(DEMO_PROFILE_DIR, "home.json");
export const DEMO_HOME_ES_FILE = path.join(DEMO_PROFILE_DIR, "home.es.json");
export const DEMO_PAGES_DIR = path.join(DEMO_PROFILE_DIR, "pages");
export const DEMO_POSTS_DIR = path.join(DEMO_PROFILE_DIR, "posts");
export const DEMO_PUBLIC_DIR = path.join(DEMO_PROFILE_DIR, "public");
export const DEMO_ASSETS_LICENSES_FILE = path.join(DEMO_PROFILE_DIR, "ASSETS-LICENSES.md");

export function getDemoProfilePaths() {
  return {
    root: DEMO_PROFILE_DIR,
    homeFile: DEMO_HOME_FILE,
    homeEsFile: DEMO_HOME_ES_FILE,
    pagesDir: DEMO_PAGES_DIR,
    postsDir: DEMO_POSTS_DIR,
    publicDir: DEMO_PUBLIC_DIR,
    assetsLicensesFile: DEMO_ASSETS_LICENSES_FILE,
  };
}
