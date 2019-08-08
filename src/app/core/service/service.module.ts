import { NgModule } from "@angular/core";
import { AdalAuthContextService } from "@core/auth/adal-auth-context.service";
import { PortfolioDashboardOverviewRouteMonitorService } from "@core/service/portfolio-dashboard-overview.route-monitor.service";
import { ApiEndpointService } from "@core/service/api-endpoint.service";
import { AuthService } from "@core/auth/auth.service";
import { ApiService } from "@core/service/api.service";
import { CompanyService } from "@core/service/company.service";
import { CustomIconService } from "@core/service/custom-icon.service";
import { TeamService } from "@core/service/team.service";
import { ValuationService } from "@core/service/valuation.service";

const PROVIDERS = [
    ApiService,
    ApiEndpointService,
    AuthService,
    AdalAuthContextService,
    CompanyService,
    CustomIconService,
    PortfolioDashboardOverviewRouteMonitorService,
    TeamService,
    ValuationService
];

@NgModule({
    providers: PROVIDERS
})
export class ServiceModule {}
