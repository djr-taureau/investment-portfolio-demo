import { NgModule } from "@angular/core";
import { AdalAuthConfig } from "./adal-auth.config";
import { AdalAuthService } from "./adal-auth.service";
import { AdalAuthConfigService } from "./auth-config.service";

/**
 * ADAL Auth Config.
 */
const authConfig: AdalAuthConfig = {
    instance: "https://login.microsoftonline.com/",
    tenant: "softbank.com",
    clientId: "5694e2d0-946a-4fb3-8864-3e0914280d03",
    postLogoutRedirectUri: window.location.origin,
    cacheLocation: "localStorage", // enable this for IE, as sessionStorage does not work for localhost.
    restApiEndpoint: "https://prism-dev-api-management.azure-api.net/echo/resource",
    mockApiEndpoint: "https://prism-dev-api-management.azure-api.net/sbdevapi5"
};

@NgModule({
    providers: [
        AdalAuthService,
        {
            provide: AdalAuthConfigService,
            useValue: authConfig
        }
    ]
})
export class AuthServiceModule {}
