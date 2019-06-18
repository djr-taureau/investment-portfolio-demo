import { NgModule } from "@angular/core";
import { AdalAuthContextService } from "@core/auth/adal-auth-context.service";
import { ApiEndpointService } from "./api-endpoint.service";
import { AuthService } from "../auth/auth.service";
import { ApiService } from "./api.service";
import { CompanyService } from "./company.service";
import { CustomIconService } from "./custom-icon.service";

const PROVIDERS = [ApiService, ApiEndpointService, AuthService, AdalAuthContextService, CompanyService, CustomIconService];

@NgModule({
    providers: PROVIDERS
})
export class ServiceModule {}
