import { Component, OnInit } from "@angular/core";
import { ToggleCashDetail, ToggleEBITDADetail, ToggleRevenueDetail } from "@core/state/flow/company-flow.actions";
import { select, Store } from "@ngrx/store";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";
import { Logger } from "@util/logger";
import "zone.js";
import { Observable } from "rxjs";
import { ebitda, revenueMock2 } from "../financials-data";
import * as fromCompanyRevenue from "@core/state/company/revenue";

@Component({
    selector: "sbp-company-kpi-container",
    styleUrls: ["./company-kpi.container.scss"],
    templateUrl: "./company-kpi.container.html"
})
export class CompanyKpiContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyKpiContainer");

    timelineData: any[];
    timelineData2: TimelineDataPointFin[];
    timelineData3: TimelineDataPointFin[];

    /**
     * The total revenue for a given period.
     */
    public revenueAsOf$: Observable<number>;

    /**
     * The percent change from a prior period.
     */
    public revenueChangeFromPriorPeriod$: Observable<number>;

    /**
     * The percent change from a prior budget.
     */
    public revenueChangeFromPriorBudget$: Observable<number>;

    /**
     * List of revenue summary line chart data.
     */
    public revenueSummaryLineChartData$: Observable<any[]>;

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>) {
        CompanyKpiContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyKpiContainer.logger.debug(`ngOnInit()`);
        this.timelineData = revenueMock2.series;
        this.timelineData2 = ebitda;
        this.timelineData3 = ebitda;

        this.revenueAsOf$ = this.store$.pipe(select(fromCompanyRevenue.getRevenueAsOf));
        this.revenueChangeFromPriorPeriod$ = this.store$.pipe(select(fromCompanyRevenue.getChangeFromPriorPeriod));
        this.revenueChangeFromPriorBudget$ = this.store$.pipe(select(fromCompanyRevenue.getChangeFromPriorBudget));
        this.revenueSummaryLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getSummaryLineChartData));
    }

    public onRevenueClick() {
        this.store$.dispatch(new ToggleRevenueDetail());
    }

    public onEBITDAClick() {
        this.store$.dispatch(new ToggleEBITDADetail());
    }

    public onCashClick() {
        this.store$.dispatch(new ToggleCashDetail());
    }
}
