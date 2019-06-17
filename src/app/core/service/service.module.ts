import { NgModule } from "@angular/core";
import { AdalAuthContextService } from "@core/auth/adal-auth-context.service";
import { ApiEndpointService } from "./api-endpoint.service";
import { AuthService } from "@core/auth/auth.service";
import { CompanyService } from "./company.service";
import { CustomIconService } from "./custom-icon.service";
const PROVIDERS = [ApiEndpointService, AuthService, AdalAuthContextService, CompanyService, CustomIconService];

@NgModule({
    providers: PROVIDERS
})
export class ServiceModule {}
