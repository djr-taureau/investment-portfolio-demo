export interface Config {
    // Base url with trailing slash to the Prism API e.g.,  e.g., https://prism-prod-api-management.azure-api.net/api/v1
    apiEndpoint: string;

    // The active directory client id - e.g., dcb3adab-c77b-4031-8a05-ef6823f9b6e8
    adClientId: string;

    // The active directory instance - e.g., https://login.microsoftonline.com
    adInstance: string;

    // The active directory tenant- e.g., softbank.com
    adTenant: string;

    // Flag indicating if the config has been initialized.
    initialized: boolean;
}

export const defaultConfig: Config = {
    apiEndpoint: "",
    adClientId: "",
    adInstance: "",
    adTenant: "",
    initialized: false
};
