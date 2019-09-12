import { ToggleDetailExpanded } from "@core/state/company/dashboard/company-dashboard-layout.actions";
import { RevenueSeriesData } from "@core/domain/company.model";
import { Observable } from "rxjs";
import { Component, OnInit, Input } from "@angular/core";
import { Logger } from "@util/logger";
import { select, Store } from "@ngrx/store";
import * as fromWidgets from "@core/state/company/widgets";
import * as fromCompanyDashboardLayout from "@core/state/company/dashboard";

@Component({
    selector: "sbp-summary-widget-container",
    template: `
        <sbp-summary-widget
            class="hand-cursor"
            [selected]="displayKpiDetail | async"
            [lineChartData]="summaryLineChartData$ | async"
            [selectedPeriod]="selectedPeriod$ | async"
            [availablePeriods]="availablePeriods$ | async"
            [barChartData1]="changeFromPriorPeriodBarChartData$ | async"
            [barChartData2]="changeFromPriorBudgetBarChartData$ | async"
            [title]="name + ' KPI'"
            [denomination]="selectedCurrencyCode"
            [currencySymbol]="selectedCurrencySymbol"
            [value]="asOf$ | async"
            [pyLabel]="'vs PY'"
            [pyValue]="changeFromPriorPeriod$ | async"
            [icLabel]="icLabel"
            [icValue]="changeFromPriorBudget$ | async"
            (click)="onSummaryWidgetClick($event)"
        >
        </sbp-summary-widget>
    `
})
export class SummaryWidgetContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("SummaryWidgetContainer");

    /**
     * ID for the widget.
     */
    @Input()
    public id: string;

    /**
     * Name for the widget.
     */
    @Input()
    public name: string;

    @Input()
    public type: string;

    /**
     * List of available periods.
     */
    public availablePeriods$: Observable<any>;

    /**
     * The selected currency symbol.
     */
    public selectedCurrencySymbol: string;

    /**
     * The selected date part.
     */
    public selectedDatePart$: Observable<any>;

    /**
     * The selected currency.
     */
    public selectedCurrency$: Observable<any>;

    /**
     * The selected currency code.
     */
    public selectedCurrencyCode: string;

    /**
     * The total amount for a given period.
     */
    public asOf$: Observable<number>;

    /**
     * The percent change from a prior period.
     */
    public changeFromPriorPeriod$: Observable<number>;

    /**
     * The percent change from a prior budget.
     */
    public changeFromPriorBudget$: Observable<number>;

    /**
     * List of revenue summary line chart data.
     */
    public summaryLineChartData$: Observable<RevenueSeriesData[]>;

    /**
     * The selected period.
     */
    public selectedPeriod$: Observable<any>;

    /**
     * List of revenue budget line chart data.
     */
    public budgetLineChartData$: Observable<RevenueSeriesData[]>;

    /**
     * List of revenue forecast line chart data.
     */
    public forecastLineChartData$: Observable<RevenueSeriesData[]>;

    /**
     * List of revenue summary percent change from a prior period bar chart data.
     */
    public changeFromPriorPeriodBarChartData$: Observable<RevenueSeriesData[]>;

    /**
     * List of revenue summary percent change from a prior budget bar chart data.
     */
    public changeFromPriorBudgetBarChartData$: Observable<RevenueSeriesData[]>;

    /**
     * Flag indicating if the KPI detail is displayed.
     */
    public displayKpiDetail: Observable<boolean>;

    /**
     * The IC label is defined once we know if it's year or quarter.
     */
    public icLabel: string;

    /**
     * Flag indicating of KPI data is loading.
     */
    public kpiLoading$: Observable<boolean>;

    /**
     * Constructor.
     */
    constructor(public store$: Store<any>) {
        SummaryWidgetContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        SummaryWidgetContainer.logger.debug(`ngOnInit()`);
        this.kpiLoading$ = this.store$.pipe(select(fromWidgets.getIsLoading("kpi")));
        this.selectedDatePart$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedDatePart));
        this.selectedPeriod$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedPeriod));
        this.selectedCurrency$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedCurrency));
        this.selectedCurrency$.subscribe((v) => {
            this.selectedCurrencyCode = v.currencyCode;
            this.selectedCurrencySymbol = v.currencySymbol;
        });

        this.selectedDatePart$.subscribe((v) => {
            if (v.id === "Y") {
                this.icLabel = "vs IC";
            } else {
                this.icLabel = "vs Bud";
            }
        });

        this.availablePeriods$ = this.store$.pipe(select(fromCompanyDashboardLayout.getSelectedCompanyAvailablePeriods));

        // Set up the summary widget's data providers.
        const kpi = "kpi";
        this.asOf$ = this.store$.pipe(select(fromWidgets.getSummaryLineChartTotal(kpi, this.id)));
        this.changeFromPriorPeriod$ = this.store$.pipe(select(fromWidgets.getBarChart1Total(kpi, this.id)));
        this.changeFromPriorBudget$ = this.store$.pipe(select(fromWidgets.getBarChart2Total(kpi, this.id)));
        this.summaryLineChartData$ = this.store$.pipe(select(fromWidgets.getSummaryLineChartData(kpi, this.id)));
        this.changeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromWidgets.getBarChart1GraphData(kpi, this.id)));
        this.changeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromWidgets.getBarChart2GraphData(kpi, this.id)));
        this.displayKpiDetail = this.store$.pipe(select(fromCompanyDashboardLayout.isKpiIdSelected(this.id)));
    }

    /**
     * Handles the click of the summary widget.
     */
    public onSummaryWidgetClick(event: any) {
        SummaryWidgetContainer.logger.debug(`onSummaryWidgetClick( KPI ID: ${this.id} )`);
        this.store$.dispatch(new ToggleDetailExpanded({ type: this.type, id: this.id }));
    }
}
