import { Component, OnInit } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import * as fromPortfolioEbitda from "@core/state/portfolio-dashboard/ebitda";
import * as fromPortfolioRevenue from "@core/state/portfolio-dashboard/revenue";
import { select, Store } from "@ngrx/store";
import { Logger } from "@util/logger";
import { Observable, BehaviorSubject } from "rxjs";

@Component({
    selector: "sbp-portfolio-dashboard-financial-container",
    templateUrl: "./portfolio-dashboard-financial.container.html"
})
export class PortfolioDashboardFinancialContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardFinancialContainer");

    // public selectedCurrency$: Observable<any>;
    // public selectedPeriod$: Observable<any>;
    // public selectedPeriodValue$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

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
        PortfolioDashboardFinancialContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        PortfolioDashboardFinancialContainer.logger.debug(`ngOnInit()`);

        // this.selectedCurrency$ = this.store$.pipe(select(fromPortfolioDashboard.getSelectedCurrency));
        // this.selectedCurrency$.subscribe((v) => {
        //     this.selectedCurrencyCode = v.currencyCode;
        //     this.selectedCurrencySymbol = v.currencySymbol;
        // });

        // Revenue summary chart data.
        this.revenueAsOf$ = this.store$.pipe(select(fromPortfolioRevenue.getRevenueAsOf));
        this.revenueChangeFromPriorPeriod$ = this.store$.pipe(select(fromPortfolioRevenue.getChangeFromPriorPeriod));
        this.revenueChangeFromPriorBudget$ = this.store$.pipe(select(fromPortfolioRevenue.getChangeFromPriorBudget));
        this.revenueSummaryLineChartData$ = this.store$.pipe(select(fromPortfolioRevenue.getSummaryLineChartData));
        this.revenueChangeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromPortfolioRevenue.getChangeFromPriorPeriodBarChartData));
        this.revenueChangeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromPortfolioRevenue.getChangeFromPriorBudgetBarChartData));

        //  Revenue Detail Chart Data
        this.revenueBudgetLineChartData$ = this.store$.pipe(select(fromPortfolioRevenue.getBudgetLineChartData));
        this.revenueForecastLineChartData$ = this.store$.pipe(select(fromPortfolioRevenue.getForecastLineChartData));

        // EBITDA summary chart data.
        this.ebitdaAsOf$ = this.store$.pipe(select(fromPortfolioEbitda.getEbitdaAsOf));
        this.ebitdaChangeFromPriorPeriod$ = this.store$.pipe(select(fromPortfolioEbitda.getChangeFromPriorPeriod));
        this.ebitdaChangeFromPriorBudget$ = this.store$.pipe(select(fromPortfolioEbitda.getChangeFromPriorBudget));
        this.ebitdaSummaryLineChartData$ = this.store$.pipe(select(fromPortfolioEbitda.getSummaryLineChartData));
        this.ebitdaChangeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromPortfolioEbitda.getChangeFromPriorPeriodBarChartData));
        this.ebitdaChangeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromPortfolioEbitda.getChangeFromPriorBudgetBarChartData));
    }

    /**
     * Handles the click of the Revenue summary chart.
     */
    public onRevenueClick() {
        PortfolioDashboardFinancialContainer.logger.debug(`onRevenueClick()`);
        // this.store$.dispatch(new CompanyFlowActions.ToggleRevenueDetail());
    }

    /**
     * Handles the click of the EBITDA summary chart.
     */
    public onEbitdaClick() {
        PortfolioDashboardFinancialContainer.logger.debug(`onEbitdaClick()`);
        // this.store$.dispatch(new CompanyFlowActions.ToggleEBITDADetail());
    }
}
