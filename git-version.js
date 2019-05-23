const { gitDescribeSync } = require("git-describe");
const { version } = require("./package.json");
const { resolve, relative } = require("path");
const { writeFileSync } = require("fs-extra");

const gitInfo = gitDescribeSync({
  dirtyMark: false,
  dirtySemver: false
});

gitInfo.version = version;

const file = "src/version.ts";
writeFileSync(file,
  `/* IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT! */

export interface SemVer {
  raw: string;
  major: number;
  minor: number;
  patch: number;
  prerelease: any[];
  build: any[];
  version: string;
}

export interface AppVersion {
  dirty: boolean;
  raw: string;
  hash: string;
  distance: number;
  tag: string;
  semver: SemVer;
  suffix: string;
  semverString: string;
  version: string;
}

export const VERSION: AppVersion = ${JSON.stringify(gitInfo, null, 4)};

`, { encoding: "utf-8" });

console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, ".."), file)}`);