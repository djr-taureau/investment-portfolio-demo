export interface AdalAuthConfig {
    instance: string;
    tenant: string;
    clientId: string;
    postLogoutRedirectUri: string;
    cacheLocation: string;
    restApiEndpoint: string;
    mockApiEndpoint: string;
}
