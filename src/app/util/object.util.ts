/**
 * Determines if the target value is a number.
 * @param {any} value
 * @return boolean
 */
export const isNumber = (value: any) => typeof value === "number";

/**
 * Determines if the target value is a string.
 * @param {any} value
 * @return boolean
 */
export const isString = (value: any) => typeof value === "string";

/**
 * Determines if the target value is a boolean.
 * @param {any} value
 * @return boolean
 */
export const isBoolean = (value: any) => value === true || value === false;

/**
 * Converts a Map to an object using the keys from the Map as property names (keys) in the object.
 * @param {Map} map
 * @return {object}
 */
export const convertMapToObject = (map: Map<any, any>) =>
    Array.from(map).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});

/**
 * Attempts to locate a deeply nested property by path. Optionally provide a default value if
 * the property is not found.
 *
 * Examples:
 *
 *      1)  Object: const foo = { bar: { name: "John Smith" } }
 *
 *          // Gets the expected value
 *          getNestedPropIfExists(foo, ["bar", "name"]);
 *
 *          // Can't find expected value and uses default
 *          getNestedPropIfExists(foo, ["bar", "name"], "default value);
 *
 *      2)  Object: const foo = [ { bar: { name: "John Smith" }, { bar: { name: "Jane Doe" } ]
 *
 *          // Uses index based array accessors
 *          getNestedPropIfExists(foo, ["0", "bar", "name"]);
 *          getNestedPropIfExists(foo, ["1", "bar", "name"]);
 *
 * @param item
 * @param path
 * @param defaultValue
 */
export const getNestedPropIfExists = (item: any, path: string[] | number[], defaultValue: any = null) => {
    if (path.length > 0) {
        const newPath = path.slice(1, path.length);
        const prop = path[0];

        if (item && item[prop]) {
            return getNestedPropIfExists(item[prop], newPath, defaultValue);
        }

        return defaultValue || null;
    }

    return item;
};
