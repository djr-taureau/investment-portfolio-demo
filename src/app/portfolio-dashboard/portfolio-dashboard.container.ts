import { PortfolioDashboardOverviewRouteMonitorService } from "@core/service/portfolio-dashboard-overview.route-monitor.service";
import { appRoutePaths } from "../app.routes";
import { Component, OnInit } from "@angular/core";
import { CorePortfolioContainer } from "@shared/portfolio/core-portfolio.container";
import { Logger } from "@util/logger";
import { Store } from "@ngrx/store";

@Component({
    selector: "sbp-portfolio-dashboard-container",
    template: "<sbp-portfolio-dashboard></sbp-portfolio-dashboard>"
})
export class PortfolioDashboardContainer extends CorePortfolioContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardContainer");

    /**
     * Constructor.
     * @param store$
     * @param portfolioDashboardOverviewRouteMonitorService
     */
    constructor(protected store$: Store<any>, private portfolioDashboardOverviewRouteMonitorService: PortfolioDashboardOverviewRouteMonitorService) {
        super(store$, appRoutePaths.portfolioDashboard);
        PortfolioDashboardContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        super.ngOnInit();
        PortfolioDashboardContainer.logger.debug(`ngOnInit()`);
    }
}
