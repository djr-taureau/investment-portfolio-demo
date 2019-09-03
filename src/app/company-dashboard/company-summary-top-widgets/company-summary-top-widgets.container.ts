import { Component, OnInit } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { getSelectedCurrency, getSelectedPeriod, getSelectedDatePart } from "@core/state/company/dashboard";
import * as fromCompanyDashboardLayout from "@core/state/company/dashboard";
import { select, Store } from "@ngrx/store";
import { Logger } from "@util/logger";
import { Observable } from "rxjs";
import * as fromCompanyEbitda from "@core/state/company/ebitda";
import * as fromCompanyRevenue from "@core/state/company/revenue";
import * as CompanyFlowActions from "@core/state/flow/company-flow.actions";

@Component({
    selector: "sbp-company-kpi-container",
    styleUrls: ["./company-summary-top-widgets.container.scss"],
    templateUrl: "./company-summary-top-widgets.container.html"
})
export class CompanySummaryTopWidgetsContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanySummaryTopWidgetsContainer");

    public selectedPeriod$: Observable<any>;
    public selectedDatePart$: Observable<any>;
    public selectedCurrency$: Observable<any>;
    public selectedCurrencySymbol: string;
    public selectedCurrencyCode: string;
    public icLabel: string;

    public availablePeriods$: Observable<any>;
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
     * Constructor.
     */
    constructor(private store$: Store<any>) {
        CompanySummaryTopWidgetsContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanySummaryTopWidgetsContainer.logger.debug(`ngOnInit()`);
        this.selectedDatePart$ = this.store$.pipe(select(getSelectedDatePart));
        this.selectedPeriod$ = this.store$.pipe(select(getSelectedPeriod));
        this.selectedCurrency$ = this.store$.pipe(select(getSelectedCurrency));
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
        // Revenue summary chart data.
        this.revenueAsOf$ = this.store$.pipe(select(fromCompanyRevenue.getRevenueAsOf));
        this.revenueChangeFromPriorPeriod$ = this.store$.pipe(select(fromCompanyRevenue.getChangeFromPriorPeriod));
        this.revenueChangeFromPriorBudget$ = this.store$.pipe(select(fromCompanyRevenue.getChangeFromPriorBudget));
        this.revenueSummaryLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getSummaryLineChartData));
        this.revenueChangeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromCompanyRevenue.getChangeFromPriorPeriodBarChartData));
        this.revenueChangeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromCompanyRevenue.getChangeFromPriorBudgetBarChartData));

        // EBITDA summary chart data.
        this.ebitdaAsOf$ = this.store$.pipe(select(fromCompanyEbitda.getEbitdaAsOf));
        this.ebitdaChangeFromPriorPeriod$ = this.store$.pipe(select(fromCompanyEbitda.getChangeFromPriorPeriod));
        this.ebitdaChangeFromPriorBudget$ = this.store$.pipe(select(fromCompanyEbitda.getChangeFromPriorBudget));
        this.ebitdaSummaryLineChartData$ = this.store$.pipe(select(fromCompanyEbitda.getSummaryLineChartData));
        this.ebitdaChangeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromCompanyEbitda.getChangeFromPriorPeriodBarChartData));
        this.ebitdaChangeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromCompanyEbitda.getChangeFromPriorBudgetBarChartData));
    }

    /**
     * Handles the click of the Revenue summary chart.
     */
    public onRevenueClick() {
        CompanySummaryTopWidgetsContainer.logger.debug(`onRevenueClick()`);
        this.store$.dispatch(new CompanyFlowActions.ToggleRevenueDetail());
    }

    /**
     * Handles the click of the EBITDA summary chart.
     */
    public onEbitdaClick() {
        CompanySummaryTopWidgetsContainer.logger.debug(`onEbitdaClick()`);
        this.store$.dispatch(new CompanyFlowActions.ToggleEbitdaDetail());
    }

    /**
     * Handles the click of the KPI summary chart.
     */
    public onCashClick() {
        CompanySummaryTopWidgetsContainer.logger.debug(`onCashClick()`);
        this.store$.dispatch(new CompanyFlowActions.ToggleCashDetail());
    }
}
