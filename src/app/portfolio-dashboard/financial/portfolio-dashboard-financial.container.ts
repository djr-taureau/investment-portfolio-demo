import { Component, OnInit } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { ToggleEbitdaDetail, ToggleRevenueDetail } from "@core/state/flow/portfolio-flow.actions";
import * as fromPortfolioEbitda from "@core/state/portfolio-dashboard/ebitda";
import * as fromPortfolioRevenue from "@core/state/portfolio-dashboard/revenue";
import { select, Store } from "@ngrx/store";
import { expandOutFromTop } from "@shared/animations/slide.animations";
import { Logger } from "@util/logger";
import { Observable, BehaviorSubject } from "rxjs";

@Component({
    selector: "sbp-portfolio-dashboard-financial-container",
    templateUrl: "./portfolio-dashboard-financial.container.html",
    animations: [expandOutFromTop]
})
export class PortfolioDashboardFinancialContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardFinancialContainer");

    public selectedPeriod$: Observable<any>;

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
     * The label for the first microbar chart
     */
    public revenueSeries1Label$: Observable<string>;

    /**
     * The label for the second microbar chart
     */
    public revenueSeries2Label$: Observable<string>;

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
     * The label for the first microbar chart
     */
    public ebitdaSeries1Label$: Observable<string>;

    /**
     * The label for the second microbar chart
     */
    public ebitdaSeries2Label$: Observable<string>;

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

        this.selectedPeriod$ = this.store$.pipe(select(fromPortfolioRevenue.getSelectedPeriodDate));

        // Revenue summary chart data.
        this.revenueAsOf$ = this.store$.pipe(select(fromPortfolioRevenue.getRevenueAsOf));
        this.revenueChangeFromPriorPeriod$ = this.store$.pipe(select(fromPortfolioRevenue.getChangeFromPriorPeriod));
        this.revenueChangeFromPriorBudget$ = this.store$.pipe(select(fromPortfolioRevenue.getChangeFromPriorBudget));
        this.revenueSummaryLineChartData$ = this.store$.pipe(select(fromPortfolioRevenue.getSummaryLineChartData));
        this.revenueChangeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromPortfolioRevenue.getChangeFromPriorPeriodBarChartData));
        this.revenueChangeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromPortfolioRevenue.getChangeFromPriorBudgetBarChartData));
        this.revenueSeries1Label$ = this.store$.pipe(select(fromPortfolioRevenue.getSeries1Label));
        this.revenueSeries2Label$ = this.store$.pipe(select(fromPortfolioRevenue.getSeries2Label));

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

        //  EBITDA Detail Chart Data
        this.ebitdaSeries1Label$ = this.store$.pipe(select(fromPortfolioEbitda.getSeries1Label));
        this.ebitdaSeries2Label$ = this.store$.pipe(select(fromPortfolioEbitda.getSeries2Label));
    }

    /**
     * Handles the click of the Revenue summary chart.
     */
    public onRevenueClick() {
        PortfolioDashboardFinancialContainer.logger.debug(`onRevenueClick()`);
        this.store$.dispatch(new ToggleRevenueDetail());
    }

    /**
     * Handles the click of the EBITDA summary chart.
     */
    public onEbitdaClick() {
        PortfolioDashboardFinancialContainer.logger.debug(`onEbitdaClick()`);
        this.store$.dispatch(new ToggleEbitdaDetail());
    }
}
