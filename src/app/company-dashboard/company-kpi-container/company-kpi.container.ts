import { Component, OnInit } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { getSelectedCurrency, getSelectedPeriod } from "@core/state/company/dashboard";
import * as fromCompanyEbitda from "@core/state/company/ebitda";
import * as fromCompanyKpi from "@core/state/company/kpi";
import * as fromCompanyRevenue from "@core/state/company/revenue";
import * as CompanyFlowActions from "@core/state/flow/company-flow.actions";
import { select, Store } from "@ngrx/store";
import { Logger } from "@util/logger";
import { Observable, BehaviorSubject } from "rxjs";

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

    public selectedCurrency$: Observable<any>;
    public selectedCurrencySymbol: string;
    public selectedCurrencyCode: string;
    public selectedPeriod$: Observable<any>;
    public selectedPeriodValue$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public pyValue: number;
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
    public revenueSummaryLineChartData$: Observable<RevenueSeriesData[]>;

    /**
     * List of revenue budget line chart data.
     */
    public revenueBudgetLineChartData$: Observable<RevenueSeriesData[]>;
    /**
     * List of revenue forecast line chart data.
     */
    public revenueForecastLineChartData$: Observable<RevenueSeriesData[]>;
    /**
     * List of revenue summary percent change from a prior period bar chart data.
     */
    public revenueChangeFromPriorPeriodBarChartData$: Observable<RevenueSeriesData[]>;

    /**
     * List of revenue summary percent change from a prior budget bar chart data.
     */
    public revenueChangeFromPriorBudgetBarChartData$: Observable<RevenueSeriesData[]>;

    /**
     * The total ebitda for a given period.
     */
    public ebitdaAsOf$: Observable<number>;

    /**
     * The percent change from a prior period.
     */
    public ebitdaChangeFromPriorPeriod$: Observable<number>;

    /**
     * The percent change from a prior budget.
     */
    public ebitdaChangeFromPriorBudget$: Observable<number>;

    /**
     * List of ebitda summary line chart data.
     */
    public ebitdaSummaryLineChartData$: Observable<RevenueSeriesData[]>;

    /**
     * List of ebitda summary percent change from a prior period bar chart data.
     */
    public ebitdaChangeFromPriorPeriodBarChartData$: Observable<RevenueSeriesData[]>;

    /**
     * List of ebitda summary percent change from a prior budget bar chart data.
     */
    public ebitdaChangeFromPriorBudgetBarChartData$: Observable<RevenueSeriesData[]>;

    /**
     * The total kpi for a given period.
     */
    public kpiAsOf$: Observable<number>;

    /**
     * The percent change from a prior period.
     */
    public kpiChangeFromPriorPeriod$: Observable<number>;

    /**
     * The percent change from a prior budget.
     */
    public kpiChangeFromPriorBudget$: Observable<number>;

    /**
     * List of kpi summary line chart data.
     */
    public kpiSummaryLineChartData$: Observable<RevenueSeriesData[]>;

    /**
     * List of kpi summary percent change from a prior period bar chart data.
     */
    public kpiChangeFromPriorPeriodBarChartData$: Observable<RevenueSeriesData[]>;

    /**
     * List of kpi summary percent change from a prior budget bar chart data.
     */
    public kpiChangeFromPriorBudgetBarChartData$: Observable<RevenueSeriesData[]>;

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
        // TODO:: I don't think this selector is working
        // this.selectedPeriod$ = this.store$.pipe(select(getSelectedPeriod));
        this.selectedCurrency$ = this.store$.pipe(select(getSelectedCurrency));
        this.selectedCurrency$.subscribe((v) => {
            this.selectedCurrencyCode = v.currencyCode;
            this.selectedCurrencySymbol = v.currencySymbol;
        });

        // Revenue summary chart data.
        this.revenueAsOf$ = this.store$.pipe(select(fromCompanyRevenue.getRevenueAsOf));
        this.revenueChangeFromPriorPeriod$ = this.store$.pipe(select(fromCompanyRevenue.getChangeFromPriorPeriod));
        this.revenueChangeFromPriorBudget$ = this.store$.pipe(select(fromCompanyRevenue.getChangeFromPriorBudget));
        this.revenueSummaryLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getSummaryLineChartData));
        this.revenueChangeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromCompanyRevenue.getChangeFromPriorPeriodBarChartData));
        this.revenueChangeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromCompanyRevenue.getChangeFromPriorBudgetBarChartData));

        //  Revenue Detail Chart Data
        this.revenueBudgetLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getBudgetLineChartData));
        this.revenueForecastLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getForecastLineChartData));

        // EBITDA summary chart data.
        this.ebitdaAsOf$ = this.store$.pipe(select(fromCompanyEbitda.getEbitdaAsOf));
        this.ebitdaChangeFromPriorPeriod$ = this.store$.pipe(select(fromCompanyEbitda.getChangeFromPriorPeriod));
        this.ebitdaChangeFromPriorBudget$ = this.store$.pipe(select(fromCompanyEbitda.getChangeFromPriorBudget));
        this.ebitdaSummaryLineChartData$ = this.store$.pipe(select(fromCompanyEbitda.getSummaryLineChartData));
        this.ebitdaChangeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromCompanyEbitda.getChangeFromPriorPeriodBarChartData));
        this.ebitdaChangeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromCompanyEbitda.getChangeFromPriorBudgetBarChartData));

        // KPI summary chart data.
        this.kpiAsOf$ = this.store$.pipe(select(fromCompanyKpi.getKpiAsOf));
        this.kpiChangeFromPriorPeriod$ = this.store$.pipe(select(fromCompanyKpi.getChangeFromPriorPeriod));
        this.kpiChangeFromPriorBudget$ = this.store$.pipe(select(fromCompanyKpi.getChangeFromPriorBudget));
        this.kpiSummaryLineChartData$ = this.store$.pipe(select(fromCompanyKpi.getSummaryLineChartData));
        this.kpiChangeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromCompanyKpi.getChangeFromPriorPeriodBarChartData));
        this.kpiChangeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromCompanyKpi.getChangeFromPriorBudgetBarChartData));
    }

    /**
     * Handles the click of the Revenue summary chart.
     */
    public onRevenueClick() {
        CompanyKpiContainer.logger.debug(`onRevenueClick()`);
        this.store$.dispatch(new CompanyFlowActions.ToggleRevenueDetail());
    }

    /**
     * Handles the click of the EBITDA summary chart.
     */
    public onEbitdaClick() {
        CompanyKpiContainer.logger.debug(`onEbitdaClick()`);
        this.store$.dispatch(new CompanyFlowActions.ToggleEBITDADetail());
    }

    /**
     * Handles the click of the KPI summary chart.
     */
    public onCashClick() {
        CompanyKpiContainer.logger.debug(`onCashClick()`);
        this.store$.dispatch(new CompanyFlowActions.ToggleCashDetail());
    }
}
