export class UrlUtil {
    /**
     * Flag used to indicate the requested param value type as string.
     */
    public static STRING_TYPE = "string";

    /**
     * Flag used to indicate the requested param value type as boolean.
     */
    public static BOOLEAN_TYPE = "boolean";

    /**
     * Flag used to indicate the requested param value type as number.
     */
    public static NUMBER_TYPE = "number";

    /**
     * Returns the current URL for the browser.
     */
    public static getUrl(): string {
        return window.location.href;
    }

    /**
     * Creates an object hash of query string parameters.
     * @returns {Map<string, string>}
     */
    public static getQueryStringParams(): Map<string, string> {
        const currentUrl = UrlUtil.getUrl();
        const paramsStrIndex = currentUrl.indexOf("?");

        if (paramsStrIndex === -1) {
            return new Map();
        }

        return currentUrl
            .slice(paramsStrIndex + 1)
            .split("&")
            .reduce((acc, fullHash) => {
                const [prop, value] = fullHash.split("=");

                const paramMap: Map<string, string> = new Map();
                paramMap.set(prop.toLowerCase(), value);

                return new Map([...Array.from(acc.entries()), ...Array.from(paramMap.entries())]);
            }, new Map());
    }

    /**
     * Gets the value for a specific query string parameter's value by key.
     * @param {string} key - The name or key of the query string param in question.
     * @param {string} valueType - The type of value expected.
     * @returns {string | number | boolean}
     */
    public static getQueryStringParamValue(key: string, valueType: string = "string"): string | number | boolean {
        key = key || "";
        const params = UrlUtil.getQueryStringParams();

        const value: string = params.get(key.toLowerCase()) || "";

        switch (valueType) {
            case UrlUtil.NUMBER_TYPE:
                return parseInt(value, 10);

            case UrlUtil.BOOLEAN_TYPE:
                return value.toLowerCase() === "true";

            case UrlUtil.STRING_TYPE:
            default:
                return (value || "").trim();
        }
    }

    /**
     * Creates an object hash of query string parameters.
     * @returns {Map<string, string>}
     */
    public static getQueryStringHashParams(): Map<string, string> {
        const currentUrl = UrlUtil.getUrl();
        const paramsStrIndex = currentUrl.indexOf("#");

        if (paramsStrIndex === -1) {
            return new Map();
        }

        return currentUrl
            .slice(paramsStrIndex + 1)
            .split("&")
            .reduce((acc, fullHash) => {
                const [prop, value] = fullHash.split("=");

                const paramMap: Map<string, string> = new Map();
                paramMap.set(prop.toLowerCase(), value);

                return new Map([...Array.from(acc.entries()), ...Array.from(paramMap.entries())]);
            }, new Map());
    }

    /**
     * Gets the value for a specific query string parameter's value by key.
     * @param {string} key - The name or key of the query string param in question.
     * @param {string} valueType - The type of value expected.
     * @returns {string | number | boolean}
     */
    public static getQueryStringHashParamValue(key: string, valueType: string = "string"): string | number | boolean {
        key = key || "";
        const params = UrlUtil.getQueryStringHashParams();

        const value: string = params.get(key.toLowerCase()) || "";

        switch (valueType) {
            case UrlUtil.NUMBER_TYPE:
                return parseInt(value, 10);

            case UrlUtil.BOOLEAN_TYPE:
                return value.toLowerCase() === "true";

            case UrlUtil.STRING_TYPE:
            default:
                return (value || "").trim();
        }
    }

    /**
     * Updates multiple query string params at once.
     */
    public static updateMultipleQueryStringParams(params): void {
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                UrlUtil.updateQueryStringParam(key, params[key]);
            }
        }
    }

    /**
     * Add / Update a key-value pair in the URL query parameters
     */
    public static updateQueryStringParam(key, value) {
        // remove the hash part before operating on the URL
        let url = UrlUtil.getUrl();
        const i = url.indexOf("#");
        const hash = i === -1 ? "" : url.substr(i);
        url = i === -1 ? url : url.substr(0, i);

        const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        const separator = url.indexOf("?") !== -1 ? "&" : "?";
        if (url.match(re)) {
            url = url.replace(re, "$1" + key + "=" + value + "$2");
        } else {
            url = url + separator + key + "=" + value;
        }

        // finally append the hash as well
        window.location.href = url + hash;
    }
}
