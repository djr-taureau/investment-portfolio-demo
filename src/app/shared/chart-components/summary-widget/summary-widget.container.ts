import { RevenueSeriesData } from "@core/domain/company.model";
import { getSelectedCurrency } from "@core/state/company/dashboard";
import { Observable } from "rxjs";
import { Component, OnInit, Input } from "@angular/core";
import { Logger } from "@util/logger";
import { select, Store } from "@ngrx/store";
import * as fromCompanyKpi from "@core/state/company/kpi";
import * as CompanyFlowActions from "@core/state/flow/company-flow.actions";

@Component({
    selector: "sbp-summary-widget-container",
    template: `
        <sbp-summary-widget
            [data]="summaryLineChartData$ | async"
            [barChartData1]="changeFromPriorPeriodBarChartData$ | async"
            [barChartData2]="changeFromPriorBudgetBarChartData$ | async"
            [title]="'KPI'"
            [denomination]="selectedCurrencyCode"
            [currencySymbol]="selectedCurrencySymbol"
            [value]="asOf$ | async | millions: '1.0-1'"
            [pyLabel]="'vs PY'"
            [pyValue]="changeFromPriorPeriod$ | async"
            [icLabel]="'vs Bud'"
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

    @Input()
    public availablePeriods: any[];

    /**
     * The selected currency symbol.
     */
    public selectedCurrencySymbol: string;

    public selectedDatePart$: Observable<any>;
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

        // Get the selected currency code and symbol.
        this.store$.pipe(select(getSelectedCurrency)).subscribe((v) => {
            this.selectedCurrencyCode = v.currencyCode;
            this.selectedCurrencySymbol = v.currencySymbol;
        });

        // Set up the summary widget's data providers.
        this.asOf$ = this.store$.pipe(select(fromCompanyKpi.getAsOf(this.id)));
        // this.changeFromPriorPeriod$ = this.store$.pipe(select(fromCompanyKpi.getChangeFromPriorPeriod(this.id)));
        // this.changeFromPriorBudget$ = this.store$.pipe(select(fromCompanyKpi.getChangeFromPriorBudget(this.id)));
        // this.summaryLineChartData$ = this.store$.pipe(select(fromCompanyKpi.getSummaryLineChartData(this.id)));
        // this.changeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromCompanyKpi.getChangeFromPriorPeriodBarChartData(this.id)));
        // this.changeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromCompanyKpi.getChangeFromPriorBudgetBarChartData(this.id)));
    }

    /**
     * Handles the click of the summary widget.
     */
    public onSummaryWidgetClick(event: any) {
        SummaryWidgetContainer.logger.debug(`onSummaryWidgetClick( KPI ID: ${this.id} )`);
        this.store$.dispatch(new CompanyFlowActions.ToggleKpiDetail());
    }
}
