import { NgModule } from "@angular/core";
import { AdalAuthContextService } from "@core/auth/adal-auth-context.service";
import { ApiEndpointService } from "./api-endpoint.service";
import { AuthService } from "@core/auth/auth.service";
import { ApiService } from "./api.service";
import { CompanyService } from "./company.service";
import { CustomIconService } from "./custom-icon.service";
import { TeamService } from "./team.service";
import { ValuationService } from "./valuation.service";

const PROVIDERS = [
    ApiService,
    ApiEndpointService,
    AuthService,
    AdalAuthContextService,
    CompanyService,
    CustomIconService,
    TeamService,
    ValuationService
];

@NgModule({
    providers: PROVIDERS
})
export class ServiceModule {}
