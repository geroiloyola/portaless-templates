export declare const DEMO_PROFILE_DIR: string;
export declare const DEMO_HOME_FILE: string;
export declare const DEMO_HOME_ES_FILE: string;
export declare const DEMO_PAGES_DIR: string;
export declare const DEMO_POSTS_DIR: string;
export declare const DEMO_PUBLIC_DIR: string;
export declare const DEMO_ASSETS_LICENSES_FILE: string;

export interface DemoProfilePaths {
  root: string;
  homeFile: string;
  homeEsFile: string;
  pagesDir: string;
  postsDir: string;
  publicDir: string;
  assetsLicensesFile: string;
}

export declare function getDemoProfilePaths(): DemoProfilePaths;
