import * as _ from "lodash";
import "rxjs-compat/add/operator/first";
import { appRoutePaths } from "../app.routes";
import { Component, OnInit } from "@angular/core";
import { getPortfolioNavLinks } from "../core/state";
import { CorePortfolioContainer } from "../shared/portfolio/core-portfolio.container";
import { Logger } from "../util/logger";
import { NavigationBarLink } from "../shared/navigation-bar/navigation-bar-link";
import { select, Store } from "@ngrx/store";
import { SetSelectedPortfolioLink } from "@core/state/layout/layout.actions";

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
