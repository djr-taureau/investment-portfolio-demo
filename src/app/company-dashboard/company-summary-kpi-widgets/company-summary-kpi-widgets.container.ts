import { WidgetTypeEnum } from "@app/core/state/company/dashboard/company-dashboard-layout.reducer";
import { Component, OnInit } from "@angular/core";
import { KpiChartPeriodDataSets } from "@core/domain/company.model";
import { select, Store } from "@ngrx/store";
import { Logger } from "@util/logger";
import { Observable } from "rxjs";
import * as AngularUtils from "@util/angular.util";
import * as fromWidgets from "@core/state/company/widgets";
import * as fromCompanyDashboardLayout from "@core/state/company/dashboard";
import { expandOutFromTop } from "@app/shared/animations/slide.animations";

@Component({
    selector: "sbp-company-summary-kpi-widgets-container",
    styleUrls: ["./company-summary-kpi-widgets.container.scss"],
    templateUrl: "./company-summary-kpi-widgets.container.html",
    animations: [expandOutFromTop]
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

    public selectedKpiId$: Observable<string>;
    public selectedKpiId: string;

    public showKpiDetail$: Observable<boolean>;
    public showKpiDetail = false;

    public typeEnum = WidgetTypeEnum;

    /**
     * Default number of ghosted KPI widgets.
     */
    public ghosts = [1, 2, 3, 4];

    /**
     * Flag indicating of KPI data is loading.
     */
    public kpiLoading$: Observable<boolean>;

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

        this.kpiLoading$ = this.store$.pipe(select(fromWidgets.getIsLoading("kpi")));

        // KPI summary charts data.
        this.chartDataPeriodSets$ = this.store$.pipe(select(fromWidgets.getChartDataPeriodSets));
        this.selectedKpiId$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedKpiId));
        this.selectedKpiId$.subscribe((id) => {
            this.selectedKpiId = id;
        });
        this.showKpiDetail$ = this.store$.pipe(select(fromCompanyDashboardLayout.getShowKpiDetail));
        this.showKpiDetail$.subscribe((value) => (this.showKpiDetail = value));
    }
}
