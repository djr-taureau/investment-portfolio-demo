/**
 * Truncates a target string at the provided length.
 * @param target
 * @param len
 */
export const truncate = (target: string, len: number) => target.substr(0, len - 1) + (target.length > len ? "..." : "");

/**
 * Method used to replace tokens in a URL.
 * @param template
 * @param values
 * @param {any} pattern
 * @returns {string}
 */
export function replaceTokens(template, values, pattern = null): string {
    pattern = pattern || /\{([^\{\}]*)\}/g;

    return template.replace(pattern, (a, b) => {
        const p = b.split(".");
        let r = values;

        try {
            /* tslint:disable-next-line */
            for (let s = 0; s < p.length; s++) {
                r = String(r[p[s]]);
            }
        } catch (e) {
            r = a;
        }

        if (typeof r === "undefined") {
            r = "undefined";
        } else if (r === null) {
            r = "null";
        }

        return String(typeof r === "string" || typeof r === "number" ? r : typeof r);
    });
}

/**
 * Builds an acronym from a list of words.
 * @param words
 * @param toCaps
 */
export const buildAcronymFromWords = (words: string, toCaps: boolean = true): string => {
    const result: string = words.match(/\b(\w)/g).join("");
    return toCaps ? result.toUpperCase() : result;
};

/**
 * Replaces all occurrences of a given string with another string.
 *
 * @param {string} str
 * @param {string} token
 * @param {string} replacer
 * @returns {string}
 */
export const replaceAll = (str: string, token: string, replacer: string): string => {
    if (!str && str.trim() !== "") {
        throw new Error("The target string must be a valid string.");
    }
    const pattern: RegExp = token === "*" ? new RegExp(/\*/g) : new RegExp(token, "g");
    return str.replace(pattern, replacer);
};

/**
 * Replaces all occurrences of a given string with another string.
 *
 * @param {string} str
 * @param {string} replacer
 * @returns {string}
 */
export const removeAllNonAlpha = (str: string, replacer: string = ""): string => {
    if (!str && str.trim() !== "") {
        throw new Error("The target string must be a valid string.");
    }
    return str.replace(/[^a-zA-Z/s]/gi, replacer);
};

/**
 * Gets the index of a pattern based on a given string and starting index (in case you
 * are looking for say the nth index of a pattern).
 * @param {string} target
 * @param {string} pattern
 * @param {number} occurrence
 * @return {number}
 */
export const getPatternIndex = (target: string, pattern: string, occurrence: number): number => {
    let index = -1;
    const len: number = target.length;

    while (occurrence-- && index++ < len) {
        index = target.indexOf(pattern, index);
        if (index < 0) {
            break;
        }
    }

    return index;
};

/**
 * Gets the count for a pattern for a given target string.
 * @param {string} target
 * @param {string} pattern
 * @return {number}
 */
export const getPatternCount = (target: string, pattern): number => {
    target = target || "";

    const regex = new RegExp(pattern, "g");
    const matches = target.match(regex) || [];
    return matches.length;
};

/**
 * Determines if a given string contains another string allowing for wildcards of either "%" or "*".
 *
 * Example:
 *
 *      String: Afghanistan
 *      Matches: A, %a, %a%h
 *
 * @param {string} str
 * @param {string} rule
 * @param {string} wildcard
 * @param {boolean} autoWildCardSuffix
 * @returns {boolean}
 */
export const contains = (str: string, rule: string, wildcard: string = "*", autoWildCardSuffix: boolean = false): boolean => {
    // If there's no string or rule to match then immediately bomb out with false.
    if (!str || !rule) {
        return false;
    }

    // Make sure the rule as at least an empty string.
    rule = (rule || "").toLowerCase();

    // Make sure the string as at least an empty string.
    str = (str || "").toLowerCase();

    // Replace all occurrences of asterisk with % as the wildcard character.
    rule = replaceAll(rule, "*", wildcard);

    // Optional: Add the wildcard to the end of the string so after required character matches everything matches.
    rule = autoWildCardSuffix ? rule.toLowerCase() + wildcard : rule;

    const isRuleMatch: boolean = rule ? new RegExp("^" + rule.split(wildcard).join(".*") + "$").test(str) : false;
    const runIniitalMatch: boolean = rule && autoWildCardSuffix;
    const isInitialMatch: boolean = runIniitalMatch ? str.indexOf(rule) === 0 : false;

    return isInitialMatch || isRuleMatch;
};

/**
 * Returns the file name from a path like: `path/to/my/file.txt` will yield `file.txt`.
 * @param path
 */
export const getFileName = (path: string) => path.substring(path.lastIndexOf("/") + 1);
