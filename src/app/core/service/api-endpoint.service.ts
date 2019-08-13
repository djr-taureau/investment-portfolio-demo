import { Injectable } from "@angular/core";
import * as StringUtil from "@util/string.util";
import * as _ from "lodash";

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
        V5: "https://prism-dev-api-management.azure-api.net/sbdevapi5/v5/",
        REMOTE: "https://prism-dev-api-management.azure-api.net/latest/",
        FROM_CONFIG: "POPULATED_BY_CONFIG.JSON"
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
        REGISTER: `auth/register`,
        EXAMPLE_DETAILS: "example/{id}/details/{id}",
        COMPANIES: "companies",
        COMPANY: "companies/{id}",
        COMPANY_INITIATIVES: `assets/data/mock-initiatives.json`, // "companies/{id}/initiatives",
        TEAMS: "companies/{id}/team-members",
        TEAM_MEMBER: "companies/{id}/team-members/{member_id}",
        VALUATION: "companies/{id}/valuation",
        REVENUE: "companies/{id}/revenue",
        PORTFOLIOS: "portfolio",
        PORTFOLIO: "portfolio/{id}",
        PORTFOLIO_INVESTMENT_SUMMARY: "portfolio/{id}/investmentsummary"
    };

    /**
     * List of secure API endpoints.
     */
    public static secureEndpoints = [
        ApiEndpointService.ENDPOINT.COMPANIES,
        ApiEndpointService.ENDPOINT.TEAMS,
        ApiEndpointService.ENDPOINT.TEAM_MEMBER,
        ApiEndpointService.ENDPOINT.PORTFOLIOS
    ];

    public static addParams(template, params): string {
        let result = template;

        let i = 0;
        const useableParams = _.pickBy(params, (p) => !_.isNil(p) && p !== "");
        // add the params
        _.forEach(useableParams, (v, k) => {
            const startQuery = i === 0 || result.indexOf("?") === -1;
            result += startQuery ? "?" : "&";
            result += k + "=" + v;
            i++;
        });

        return result;
    }

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
    public getEndpoint(endpoint: string, params?: {}): string {
        const isConfig = ApiEndpointService.ENDPOINT.CONFIG === endpoint;
        const isInitiatives = ApiEndpointService.ENDPOINT.COMPANY_INITIATIVES === endpoint;
        const url = isConfig || isInitiatives ? `${endpoint}` : `${this.getBaseUrl()}${endpoint}`;
        return StringUtil.replaceTokens(url, params);
    }

    /**
     * Getter for the base URL for the API.
     */
    public getBaseUrl(): string {
        // TODO: BMR: 08/07/2019: Once Jon adds a trailing "/" to the config.json's API endpioint value we can remove the trailing "/" here.
        return `${ApiEndpointService.BASE_URL.FROM_CONFIG}/`;
    }

    /**
     * Determines if the requested URL is an authentication API endpoint.
     * @param {string} url
     * @returns {boolean}
     */
    public isAuthEndpoint(url: string = ""): boolean {
        return url.toLowerCase().indexOf(ApiEndpointService.AUTH_CONTEXT) > -1;
    }

    /**
     * Determines if the requested URL is an API endpoint.
     * @param {string} url
     * @returns {boolean}
     */
    public isApiEndpoint(url: string = ""): boolean {
        return url.toLowerCase().indexOf(ApiEndpointService.CONTEXT) > -1;
    }

    /**
     * Determines if the requested URL is a secure API endpoint.
     * @param {string} requestedUrl
     * @returns {boolean}
     */
    public isSecureEndpoint(requestedUrl: string = ""): boolean {
        const check = ApiEndpointService.secureEndpoints.some((url: string) => requestedUrl.toLowerCase().indexOf(url) > -1);
        return check;
    }

    /**
     * Determines if the current route is a mock for UX testing.
     * @param {string} url
     * @returns {boolean}
     */
    public isMockRoute(url: string = ""): boolean {
        return url.toLowerCase().indexOf("mock") > -1;
    }
}
