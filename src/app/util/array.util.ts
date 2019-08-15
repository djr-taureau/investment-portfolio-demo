import { Logger } from "./logger";

/**
 * Internal logger.
 */
const logger: Logger = Logger.getLogger("ArrayUtil");

/**
 * Sort function for an array of objects with a property that contains a date string of `YYYY-MM-DD`.
 *
 * Can pass an optional property key that contains the date string.
 */
export const sortDateYYYYMMDD = (prop?: string) => (item1, item2) => {
    prop = prop || "date";
    const date1 = item1[prop].split("-").join();
    const date2 = item2[prop].split("-").join();
    return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
};
