import { Component, OnInit } from "@angular/core";
import { KpiChartPeriodDataSets } from "@core/domain/company.model";
import { select, Store } from "@ngrx/store";
import { Logger } from "@util/logger";
import { Observable } from "rxjs";
import * as AngularUtils from "@util/angular.util";
import * as fromCompanyKpi from "@core/state/company/kpi";

@Component({
    selector: "sbp-company-summary-kpi-widgets-container",
    styleUrls: ["./company-summary-kpi-widgets.container.scss"],
    templateUrl: "./company-summary-kpi-widgets.container.html"
})
export class CompanySummaryKpiWidgetsContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanySummaryKpiWidgetsContainer");

    /**
     * The chart data for the KPI summary widgets.
     */
    public chartDataPeriodSets$: Observable<KpiChartPeriodDataSets[]>;

    /**
     * Expose so the HTML template can use it.
     */
    public trackByFn = AngularUtils.trackByFn;

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>) {
        CompanySummaryKpiWidgetsContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanySummaryKpiWidgetsContainer.logger.debug(`ngOnInit()`);

        // KPI summary charts data.
        this.chartDataPeriodSets$ = this.store$.pipe(select(fromCompanyKpi.getChartDataPeriodSets));
    }
}
