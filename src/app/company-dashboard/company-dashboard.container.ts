import { getShowRevenueDetail, getShowEBITDADetail, getShowCashDetail, getShowKpiDetail } from "@core/state/company/dashboard";
import * as CompanyDashboardLayoutActions from "@core/state/company/dashboard/company-dashboard-layout.actions";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { appRoutePaths } from "../app.routes";
import { Component, OnInit, ElementRef, TemplateRef } from "@angular/core";
import { CoreCompanyContainer } from "@shared/company/core-company.container";
import { Logger } from "@util/logger";
import { select, Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-dashboard-container",
    template: `
        <sbp-company-dashboard
            (expandOrCollapse)="expandOrCollapse($event)"
            [showRevenueDetail]="showRevenueDetail$ | async"
            [showEBITDADetail]="showEBITDADetail$ | async"
            [showCashDetail]="showCashDetail$ | async"
            [showKpiDetail]="showKpiDetail$ | async"
            (closeDetailWidget)="expandOrCollapse()"
        ></sbp-company-dashboard>
    `
})
export class CompanyDashboardContainer extends CoreCompanyContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyDashboardContainer");

    /**
     * Controls visibility of the revenue details panel
     */
    public showRevenueDetail$: Observable<boolean>;
    public showEBITDADetail$: Observable<boolean>;
    public showCashDetail$: Observable<boolean>;
    public showKpiDetail$: Observable<boolean>;

    /**
     * Expand or collapse the summary based on its current state.
     * @param $event
     */
    public expandOrCollapse($event?: any): void {
        CompanyDashboardContainer.logger.debug(`expandOrCollapse()`);
        this.store$.dispatch(new CompanyDashboardLayoutActions.ExpandOrCollapse());
    }

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
     * Initialize the component.
     */
    public ngOnInit() {
        super.ngOnInit();
        this.showRevenueDetail$ = this.store$.pipe(select(getShowRevenueDetail));
        this.showEBITDADetail$ = this.store$.pipe(select(getShowEBITDADetail));
        this.showCashDetail$ = this.store$.pipe(select(getShowCashDetail));
        this.showKpiDetail$ = this.store$.pipe(select(getShowKpiDetail));
        CompanyDashboardContainer.logger.debug(`ngOnInit()`);
    }
}
