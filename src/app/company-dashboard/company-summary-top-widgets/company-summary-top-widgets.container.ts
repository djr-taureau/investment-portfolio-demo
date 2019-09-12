import { ToggleDetailExpanded } from "@core/state/company/dashboard/company-dashboard-layout.actions";
import { Component, OnInit } from "@angular/core";
import { RevenueSeriesData, ChartDataPeriod } from "@core/domain/company.model";
import { select, Store } from "@ngrx/store";
import { Logger } from "@util/logger";
import { Observable } from "rxjs";
import { WidgetTypeEnum } from "@core/state/company/dashboard/company-dashboard-layout.reducer";
import * as fromCompanyDashboardLayout from "@core/state/company/dashboard";
import * as fromCompanyCash from "@core/state/company/cash";
import * as CompanyFlowActions from "@core/state/flow/company-flow.actions";
import * as fromWidget from "@core/state/company/widgets";

@Component({
    selector: "sbp-company-summary-top-widgets-container",
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
    public ebitdaSummaryLineChartData: RevenueSeriesData[] = [];

    /**
     * List of ebitda summary percent change from a prior period bar chart data.
     */
    public ebitdaChangeFromPriorPeriodBarChartData$: Observable<RevenueSeriesData[]>;

    /**
     * List of ebitda summary percent change from a prior budget bar chart data.
     */
    public ebitdaChangeFromPriorBudgetBarChartData$: Observable<RevenueSeriesData[]>;

    /**
     * The cash runway in months.
     */
    public cashRunwayInMonths$: Observable<number>;

    /**
     * The total cash for a given period.
     */
    public cashAsOf$: Observable<number>;

    /**
     * Flag indicating if the revenue detail is displayed.
     */
    public displayRevenueDetail: Observable<boolean>;

    /**
     * Flag indicating if the EBITDA detail is displayed.
     */
    public displayEbitdaDetail: Observable<boolean>;

    /**
     * Flag indicating if revenue data is loading.
     */
    public revenueLoading$: Observable<boolean>;

    /**
     * Flag indicating if EBITDA data is loading.
     */
    public ebitdaLoading$: Observable<boolean>;

    /**
     * Flag indicating if cash data is loading.
     */
    public cashLoading$: Observable<boolean>;

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

        // Revenue summary chart data.
        const revenue = "revenue";
        this.revenueLoading$ = this.store$.pipe(select(fromWidget.getIsLoading(revenue)));
        this.revenueAsOf$ = this.store$.pipe(select(fromWidget.getSummaryLineChartTotal(revenue)));
        this.revenueChangeFromPriorPeriod$ = this.store$.pipe(select(fromWidget.getBarChart1Total(revenue)));
        this.revenueChangeFromPriorBudget$ = this.store$.pipe(select(fromWidget.getBarChart2Total(revenue)));
        // TODO: do this one
        this.revenueSummaryLineChartData$ = this.store$.pipe(select(fromWidget.getSummaryLineChartData(revenue)));
        this.revenueChangeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromWidget.getBarChart1GraphData(revenue)));
        this.revenueChangeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromWidget.getBarChart2GraphData(revenue)));
        this.displayRevenueDetail = this.store$.pipe(select(fromCompanyDashboardLayout.getShowRevenueDetail));

        // EBITDA summary chart data.
        const ebdita = "ebitda";
        this.ebitdaLoading$ = this.store$.pipe(select(fromWidget.getIsLoading(ebdita)));
        this.ebitdaAsOf$ = this.store$.pipe(select(fromWidget.getSummaryLineChartTotal(ebdita)));
        this.ebitdaChangeFromPriorPeriod$ = this.store$.pipe(select(fromWidget.getBarChart1Total(ebdita)));
        this.ebitdaChangeFromPriorBudget$ = this.store$.pipe(select(fromWidget.getBarChart2Total(ebdita)));
        // TODO: do this one
        this.ebitdaSummaryLineChartData$ = this.store$.pipe(select(fromWidget.getSummaryLineChartData(ebdita)));
        this.ebitdaChangeFromPriorPeriodBarChartData$ = this.store$.pipe(select(fromWidget.getBarChart1GraphData(ebdita)));
        this.ebitdaChangeFromPriorBudgetBarChartData$ = this.store$.pipe(select(fromWidget.getBarChart2GraphData(ebdita)));
        this.displayEbitdaDetail = this.store$.pipe(select(fromCompanyDashboardLayout.getShowEBITDADetail));

        // Cash
        this.cashLoading$ = this.store$.pipe(select(fromCompanyCash.getIsLoading));
        this.cashAsOf$ = this.store$.pipe(select(fromCompanyCash.getCashAsOf));
        this.cashRunwayInMonths$ = this.store$.pipe(select(fromCompanyCash.getCashRunwayInMonths));
    }

    /**
     * Handles the click of the Revenue summary chart.
     */
    public onRevenueClick() {
        CompanySummaryTopWidgetsContainer.logger.debug(`onRevenueClick()`);
        this.store$.dispatch(new ToggleDetailExpanded({ type: WidgetTypeEnum.REVENUE }));
    }

    /**
     * Handles the click of the EBITDA summary chart.
     */
    public onEbitdaClick() {
        CompanySummaryTopWidgetsContainer.logger.debug(`onEbitdaClick()`);
        this.store$.dispatch(new ToggleDetailExpanded({ type: WidgetTypeEnum.EBITDA }));
    }

    /**
     * Handles the click of the KPI summary chart.
     */
    public onCashClick() {
        CompanySummaryTopWidgetsContainer.logger.debug(`onCashClick()`);
        this.store$.dispatch(new CompanyFlowActions.ToggleCashDetail());
    }
}
