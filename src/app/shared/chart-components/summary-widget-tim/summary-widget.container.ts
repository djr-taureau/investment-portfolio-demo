import { getSelectedDatePart } from "./../../../core/state/company/dashboard/index";
import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { CurrencyType } from "./../../../core/domain/enum/currency-type.enum";
import {
    getRevenueIcFollowOn1Series,
    getRevenueIcFollowOn2Series,
    getRevenueIcInitialSeries,
    getRevenueYearPlus1Series
} from "./../../../core/state/index";
import { Store, select } from "@ngrx/store";
import { Logger } from "@util/logger";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { RevenueSeries } from "@app/core/domain/company.model";
import { getRevenueActualSeries } from "@app/core/state";
import { DatePartType } from "@app/core/domain/enum/date-part-type.enum";
import { getSelectedCurrency } from "@app/core/state/company/dashboard";
import { getSelectedPeriod } from "@app/core/state/company/dashboard/company-dashboard-layout.reducer";

@Component({
    selector: "sb-summary-widget-container-tim",
    template: `
        <sb-summary-widget> </sb-summary-widget>
    `
})
export class SummaryWidgetContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("SummaryWidgetContainer");

    /**
     * These are specific properties to push into the summary widget
     */
    public widgetLabel = ""; // Upper left corner EG: REVENUE ($M)
    public widgetLabelCurrency = "";
    public lineChartData: any[] = []; // TODO: type this
    public lineChartValue = 0;
    public barChart1Data: any[] = []; // TODO: type this
    public barChart1Label = ""; // 'vsPY' or 'vsPQ'
    public barChart1Value = "";
    public barChart2Data: any[] = []; // TODO: type this
    public barChart2Label = ""; // 'vsBud' or 'vs IC Case'
    public barChart2Value = "";

    /**
     * TODO: Not sure that the summary needs all of these
     * Summary will definitely need the actual as it represents the line chart data
     * Based on business rules, looks like we need
     * budget, projectedYear, projectedQuarter?PQ, and maybe
     * we already have IC Case in icInitial?
     *
     * Based on selectedDatePart of QTR or YEAR
     * 1.2 If Quarter, we show PQ for barChart1
     * 1.2 If Year, we show PY for barChart1
     * 1.3 If Quarter, we show "vs Bud" for barChart2
     * 1.3 If Year, we show "IC Case" for barChart2
     */
    public revenueActualSeries$: Observable<RevenueSeries>;
    public revenueIcFollowOn1Series$: Observable<RevenueSeries>;
    public revenueIcFollowOn2Series$: Observable<RevenueSeries>;
    public revenueIcInitialSeries$: Observable<RevenueSeries>;
    public revenueYearPlus1Series$: Observable<RevenueSeries>;

    /**
     * Changes to the currency, date range, and date range period
     */
    public selectedCurrency$: Observable<CurrencyType>;
    public selectedCurrency: CurrencyType;
    public selectedDatePart$: Observable<DatePartType>;
    public selectedDatePart: DatePartType;
    public selectedPeriod$: Observable<SelectorPeriod>;
    public selectedPeriod: SelectorPeriod;

    constructor(private store$: Store<any>) {}

    ngOnInit() {
        this.revenueActualSeries$ = this.store$.pipe(select(getRevenueActualSeries));
        this.revenueIcFollowOn1Series$ = this.store$.pipe(select(getRevenueIcFollowOn1Series));
        this.revenueIcFollowOn2Series$ = this.store$.pipe(select(getRevenueIcFollowOn2Series));
        this.revenueIcInitialSeries$ = this.store$.pipe(select(getRevenueIcInitialSeries));
        this.revenueYearPlus1Series$ = this.store$.pipe(select(getRevenueYearPlus1Series));

        /**
         * DATE PART RULES
         * Based on selectedDatePart of QTR or YEAR
         * 1.2 If Quarter, we show PQ for barChart1
         * 1.2 If Year, we show PY for barChart1
         * 1.3 If Quarter, we show "vs Bud" for barChart2
         * 1.3 If Year, we show "IC Case" for barChart2
         */
        this.selectedCurrency$ = this.store$.pipe(select(getSelectedCurrency));
        this.selectedCurrency$.subscribe((currency) => {
            if (currency) {
                this.selectedCurrency = currency;
                // based on the value of selectedCurrency (USD or Native) and datePart (yearly or quarterly)
                // where X = 1 | 2
                // change the barChartXValue based on DATE PART RULES   ??Would we??
                // change the barChartXData based on DATE PART RULES    ??Would we??
                // change the lineChartValue
                //      revenueSeries.totalRevenueUSD | .totalRevenueNative
                //      limited by the selectedPeriod
                // change the lineChartData                             ??Would we??
                //      limited by the selectedPeriod if we change data
            }
        });
        this.selectedDatePart$ = this.store$.pipe(select(getSelectedDatePart));
        this.selectedDatePart$.subscribe((datePart) => {
            if (datePart) {
                this.selectedDatePart = datePart;
                // where X = 1 | 2
                // change the barChartXLabel based on DATE PART RULES
                // change the barChartXValue based on DATE PART RULES
                // based on the value of selectedCurrency (USD or Native) and datePart (yearly or quarterly) AND selectedPeriod
                //      change the barChart1Data to <PQ | PY>Series.seriesGraphSet.<selectedCurrency>.yearly | <selectedCurrency>.quarterly
                //          limited by the selectedPeriod
                //      change the barChart2Data to <budget? | icCase?>Series.seriesGraphSet.<selectedCurrency>.yearly | <selectedCurrency>.quarterly
                //          limited by the selectedPeriod
                //      change the lineChartValue
                //          revenueSeries.totalRevenueUSD | .totalRevenueNative
                //          limited by the selectedPeriod
            }
        });
        this.selectedPeriod$ = this.store$.pipe(select(getSelectedPeriod));
        this.selectedPeriod$.subscribe((period) => {
            if (period) {
                this.selectedPeriod = period;
                // where X = 1 | 2
                // change the barChartXLabel based on DATE PART RULES
                // change the barChartXValue based on DATE PART RULES
                // based on the value of selectedCurrency (USD or Native) and datePart (yearly or quarterly) AND selectedPeriod
                //      change the barChart1Data to <PQ | PY>Series.seriesGraphSet.<selectedCurrency>.yearly | <selectedCurrency>.quarterly
                //          limited by the selectedPeriod
                //      change the barChart2Data to <budget? | icCase?>Series.seriesGraphSet.<selectedCurrency>.yearly | <selectedCurrency>.quarterly
                //          limited by the selectedPeriod
                //      change the lineChartValue
                //          revenueSeries.totalRevenueUSD | .totalRevenueNative
                //          limited by the selectedPeriod
            }
        });
    }
}
