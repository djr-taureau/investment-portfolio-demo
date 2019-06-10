/* IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT! */

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

export const VERSION: AppVersion = {
    dirty: true,
    raw: "9775c9c-dirty",
    hash: "9775c9c",
    distance: null,
    tag: null,
    semver: null,
    suffix: "9775c9c-dirty",
    semverString: null,
    version: "0.0.89"
};
