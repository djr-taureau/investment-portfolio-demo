import { Injectable } from "@angular/core";
import { UrlUtil } from "@util/url.util";
import * as StringUtil from "@util/string.util";

@Injectable({
    providedIn: "root"
})
export class ApiEndpointService {
    /**
     * Map of possible base url values.
     *
     * Local: Uses the local Node API URL.
     * Remote: Uses the remote AWS API URL.
     * Build: Uses the compile time provided API URL.
     */
    public static BASE_URL = {
        LOCAL: "http://localhost:4401/",
        REMOTE: "https://remote.api.com/",
        BUILD: "https://DOMAIN_URL"
    };

    /**
     * Map of possible base url values.
     *
     * Local: Uses the local Node API URL.
     * Remote: Uses the remote AWS API URL.
     * Build: Uses the compile time provided API URL.
     */
    public static API_CONTEXT = {
        LOCAL: "local",
        REMOTE: "remote",
        BUILD: "build"
    };

    /**
     * Map of protocols for API endpoints.
     */
    public static PROTOCOL = {
        HTTP: "http://",
        HTTPS: "https://"
    };

    /**
     * Map of contexts for API endpoints.
     */
    public static CONTEXT = "api";

    /**
     * Map of contexts for API endpoints.
     */
    public static AUTH_CONTEXT = "auth/";

    /**
     * Map of API endpoints.
     */
    public static ENDPOINT = {
        LOGIN: `auth/login/`,
        REGISTER: `auth/register/`,
        EXAMPLE_DETAILS: "example/{id}/details/{id}",
        COMPANIES: "companies"
    };

    /**
     * List of secure API endpoints.
     */
    public static secureEndpoints = [ApiEndpointService.ENDPOINT.COMPANIES];

    /**
     * Constructor.
     */
    constructor() {}

    /**
     * Constructs an API endpoint.
     *
     * NOTE: In the future this could construct API endpoints using environmental configs provided
     * at build time or at runtime via (for example) query string params...but for now we'll
     * keep this dumb simple.
     */
    public static getEndpoint(endpoint: string, params?: {}): string {
        const url = `${ApiEndpointService.getBaseUrl()}${endpoint}`;
        return StringUtil.replaceTokens(url, params);
    }

    /**
     * Getter for the base URL for the API.
     */
    public static getBaseUrl(): string {
        const apiBaseUrl: string = UrlUtil.getQueryStringParamValue("api", UrlUtil.STRING_TYPE) as string;
        const isLocal: boolean = apiBaseUrl.toLowerCase() === ApiEndpointService.API_CONTEXT.LOCAL.toLowerCase();
        // const isLocal: boolean = apiBaseUrl.toLowerCase() === ApiEndpointService.API_CONTEXT.LOCAL.toLowerCase();
        return ApiEndpointService.BASE_URL.LOCAL;
    }

    /**
     * Determines if the requested URL is an authentication API endpoint.
     * @param {string} url
     * @returns {boolean}
     */
    public static isAuthEndpoint(url: string = ""): boolean {
        return url.toLowerCase().indexOf(ApiEndpointService.AUTH_CONTEXT) > -1;
    }

    /**
     * Determines if the requested URL is an API endpoint.
     * @param {string} url
     * @returns {boolean}
     */
    public static isApiEndpoint(url: string = ""): boolean {
        return url.toLowerCase().indexOf(ApiEndpointService.CONTEXT) > -1;
    }

    /**
     * Determines if the requested URL is a secure API endpoint.
     * @param {string} requestedUrl
     * @returns {boolean}
     */
    public static isSecureEndpoint(requestedUrl: string = ""): boolean {
        return this.secureEndpoints.some((url: string) => requestedUrl.toLowerCase().indexOf(url) > -1);
    }

    /**
     * Determines if the current route is a mock for UX testing.
     * @param {string} url
     * @returns {boolean}
     */
    public static isMockRoute(url: string = ""): boolean {
        return url.toLowerCase().indexOf("mock") > -1;
    }
}
