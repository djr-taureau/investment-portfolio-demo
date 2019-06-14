import * as CompanyDashboardLayoutActions from "../core/state/company/dashboard/company-dashboard-layout.actions";
import { ActivatedRoute } from "@angular/router";
import { appRoutePaths } from "../app.routes";
import { Component } from "@angular/core";
import { CoreCompanyContainer } from "../shared/company/core-company.container";
import { Logger } from "../util/logger";
import { Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-dashboard-container",
    template: `
        <sbp-company-dashboard (expandOrCollapse)="expandOrCollapse($event)"></sbp-company-dashboard>
    `
})
export class CompanyDashboardContainer extends CoreCompanyContainer {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyDashboardContainer");

    /**
     * Constructor.
     * @param store$
     * @param route$
     */
    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$, appRoutePaths.companyDashboard);

        CompanyDashboardContainer.logger.debug(`constructor()`);
    }

    /**
     * Expand or collapse the summary based on its current state.
     * @param $event
     */
    public expandOrCollapse($event: any): void {
        CompanyDashboardContainer.logger.debug(`expandOrCollapse()`);
        this.store$.dispatch(new CompanyDashboardLayoutActions.ExpandOrCollapse());
    }
}
