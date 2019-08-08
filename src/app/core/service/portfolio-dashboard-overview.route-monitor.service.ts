import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { portfolioDashboardFinancialsNavBarLink } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import { Logger } from "@util/logger";
import { Store } from "@ngrx/store";
import * as PortfolioDashboardOverviewLayoutActions from "@core/state/portfolio-dashboard/portfolio-dashboard-overview-layout.actions";

@Injectable({
    providedIn: "root"
})
export class PortfolioDashboardOverviewRouteMonitorService {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardOverviewRouteMonitorService");

    /**
     * Constructor.
     * @param router
     * @param store$
     */
    constructor(private router: Router, private store$: Store<any>) {
        PortfolioDashboardOverviewRouteMonitorService.logger.debug(`constructor()`);
        this.watchForRouteChanges();
    }

    /**
     * Watches for route changes and fires off a show or hide header action depending on the route.
     */
    public watchForRouteChanges() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Determine if the requested URL should show or hide the header.
                const url: string = event.url;
                const financialsRoute: string = portfolioDashboardFinancialsNavBarLink.route;
                const isFinancials: boolean = url.toLowerCase().indexOf(financialsRoute) > -1;
                PortfolioDashboardOverviewRouteMonitorService.logger.debug(
                    `watchForRouteChanges( ${isFinancials ? "Yes" : "No"} for route "${url}" )`
                );

                if (isFinancials) {
                    this.store$.dispatch(new PortfolioDashboardOverviewLayoutActions.SelectNavLink(portfolioDashboardFinancialsNavBarLink));
                }
            }
        });
    }
}
