import { Component, OnInit } from "@angular/core";
import { ChartPeriodDataSets } from "@core/domain/company.model";
import { select, Store } from "@ngrx/store";
import { Logger } from "@util/logger";
import { Observable } from "rxjs";
import * as AngularUtils from "@util/angular.util";
import * as fromCompanyKpi from "@core/state/company/kpi";

@Component({
    selector: "sbp-company-summary-widgets-container",
    styleUrls: ["./company-summary-widgets.container.scss"],
    templateUrl: "./company-summary-widgets.container.html"
})
export class CompanySummaryWidgetsContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanySummaryWidgetsContainer");

    /**
     * The chart data for the KPI summary widgets.
     */
    public chartDataPeriodSets$: Observable<ChartPeriodDataSets[]>;

    /**
     * Expose so the HTML template can use it.
     */
    public trackByFn = AngularUtils.trackByFn;

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>) {
        CompanySummaryWidgetsContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanySummaryWidgetsContainer.logger.debug(`ngOnInit()`);

        // KPI summary charts data.
        this.chartDataPeriodSets$ = this.store$.pipe(select(fromCompanyKpi.getChartDataPeriodSets));
    }
}
