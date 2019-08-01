import { Injectable } from "@angular/core";
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
    // TODO: @Momentum:
    //  1. Pick up REMOTE: from /app/config.js
    // this file will vary by deployment env. you might want to have a config-dev.js that is the fallback and maintain that
    // for the local dev scenario, deferring to config.js if it is available (for upper env/deployed context)
    // As Chris M if any questions!

    public static BASE_URL = {
        LOCAL: "http://localhost:4401/",
        // REMOTE: "https://prism-dev-api-management.azure-api.net/sbdevapi5/v5/",
        REMOTE: "https://prism-dev-api-management.azure-api.net/latest/",
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
        CONFIG: `assets/data/config.json`,
        LOGIN: `auth/login/`,
        REGISTER: `auth/register/`,
        EXAMPLE_DETAILS: "example/{id}/details/{id}",
        COMPANIES: "companies",
        COMPANY: "companies/{id}",
        TEAMS: "companies/{id}/team-members",
        TEAM_MEMBER: "companies/{id}/team-members/{member_id}",
        VALUATION: "companies/{id}/valuation",
        REVENUE: "companies/{id}/revenue"
    };

    /**
     * List of secure API endpoints.
     */
    public static secureEndpoints = [
        ApiEndpointService.ENDPOINT.COMPANIES,
        ApiEndpointService.ENDPOINT.TEAMS,
        ApiEndpointService.ENDPOINT.TEAM_MEMBER
    ];

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
        const isConfig = ApiEndpointService.ENDPOINT.CONFIG === endpoint;
        const url = isConfig ? `${endpoint}` : `${ApiEndpointService.getBaseUrl()}${endpoint}`;
        return StringUtil.replaceTokens(url, params);
    }

    /**
     * Getter for the base URL for the API.
     */
    public static getBaseUrl(): string {
        return ApiEndpointService.BASE_URL.REMOTE;
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
