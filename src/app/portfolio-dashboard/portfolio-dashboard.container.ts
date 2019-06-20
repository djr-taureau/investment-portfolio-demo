import { appRoutePaths } from "../app.routes";
import { Component, OnInit } from "@angular/core";
import { CorePortfolioContainer } from "../shared/portfolio/core-portfolio.container";
import { Logger } from "../util/logger";
import { Store } from "@ngrx/store";

@Component({
    selector: "sbp-portfolio-dashboard-container",
    template: "<sbp-portfolio-dashboard></sbp-portfolio-dashboard>"
})
export class PortfolioDashboardContainer extends CorePortfolioContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardContainerComponent");

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        super.ngOnInit();
    }

    constructor(protected store$: Store<any>) {
        super(store$, appRoutePaths.portfolioDashboard);
    }
}
