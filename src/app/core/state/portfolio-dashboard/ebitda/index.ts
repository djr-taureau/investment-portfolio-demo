import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { ChartDataPeriod } from "@core/domain/company.model";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { PortfolioEbitdaActions } from "@core/state/portfolio-dashboard/ebitda/portfolio-ebitda.actions";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import * as fromPortfolioDashboard from "@core/state/portfolio-dashboard";
import * as fromRoot from "@core/state";
import * as fromPortfolioEbitda from "@core/state/portfolio-dashboard/ebitda/portfolio-ebitda.reducer";
import * as ObjectUtil from "@util/object.util";
import * as _ from "lodash";

export interface PortfolioEbitda {
    data: fromPortfolioEbitda.State;
}

export interface State extends fromRoot.AppState {
    portfolioEbitda: PortfolioEbitda;
}

export const reducers: ActionReducerMap<PortfolioEbitda, PortfolioEbitdaActions> = {
    data: fromPortfolioEbitda.reducer
};

export const selectPortfolioEbitda = createFeatureSelector<any, any>("portfolioEbitda");

export const selectPortfolioEbitdaDataState = createSelector(
    selectPortfolioEbitda,
    (state: PortfolioEbitda) => state.data
);

export const getComparisonGraph = createSelector(
    selectPortfolioEbitdaDataState,
    fromPortfolioEbitda.getComparisonGraph
);

export const getMetricsGraph = createSelector(
    selectPortfolioEbitdaDataState,
    fromPortfolioEbitda.getMetricsGraph
);

export const getTableData = createSelector(
    selectPortfolioEbitdaDataState,
    fromPortfolioEbitda.getTableData
);

export const getSeries1Label = createSelector(
    fromPortfolioDashboard.getSelectedDatePart,
    (datePart) => (datePart.id.toUpperCase() === "Q" ? "vs PY" : "vs PY")
);

export const getSeries2Label = createSelector(
    fromPortfolioDashboard.getSelectedDatePart,
    (datePart) => (datePart.id.toUpperCase() === "Q" ? "vs BUD" : "vs IC")
);

/**
 * This is the value for 1.1 in the Solution Summary - aka the summary ebitda chart:
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Ebitda+Widget+-+SS
 */
export const getEbitdaAsOf = createSelector(
    getMetricsGraph,
    fromPortfolioDashboard.getSelectedPeriod,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
            const scenarioName = "actual";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const matchingDateData: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            const matchingDateIndex: number = matchingDateData.findIndex((item) => item.date === period.date);
            return ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], 0);
        } else {
            return 0;
        }
    }
);

/**
 * This is the value for 1.2 in the Solution Summary - aka the summary ebitda chart:
 * It represents the vsPQ or vsPY percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Ebitda+Widget+-+SS
 */
export const getChangeFromPriorPeriod = createSelector(
    getMetricsGraph,
    fromPortfolioDashboard.getSelectedPeriod,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPY" : "vsPY";
            const currencyKey = "valueInUSD";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const matchingDateData: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            const matchingDateIndex: number = _.findIndex(matchingDateData, (item) => item.date === period.date);
            const result = ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], 0) || [];
            return ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], 0);
        } else {
            return 0;
        }
    }
);

/**
 * This is the value for 1.3 in the Solution Summary - aka the summary ebitda chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Ebitda+Widget+-+SS
 */
export const getChangeFromPriorBudget = createSelector(
    getTableData,
    fromPortfolioDashboard.getSelectedPeriod,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsBud" : "icLatest";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const matchingDateData: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            const matchingDateIndex: number = _.findIndex(matchingDateData, (item) => item.date === period.date);
            const result = ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], 0) || [];
            return ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], 0);
        } else {
            return 0;
        }
    }
);

/**
 * This is the value for 1.3 in the Solution Summary - aka the summary ebitda chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Ebitda+Widget+-+SS
 */
export const getSummaryLineChartData = createSelector(
    getMetricsGraph,
    fromPortfolioDashboard.getSelectedPeriod,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
            const scenarioName = "budget";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const result = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            // HACK BECAUSE API RESPONSE IS NAMED DIFFERENTLY AND MAKES CHARTS NOT WORK
            result.map((item) => _.extend(item, { financialQuarter: item.calendarQuarter, amountInNative: item.amountInUSD }));
            return result;
        } else {
            return [];
        }
    }
);

/**
 * This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsPQ or vsPY percentage values in the mini bar charts.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getChangeFromPriorPeriodBarChartData = createSelector(
    getMetricsGraph,
    fromPortfolioDashboard.getSelectedPeriod,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPY" : "vsPY";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const result = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            // HACK BECAUSE API RESPONSE IS NAMED DIFFERENTLY AND MAKES CHARTS NOT WORK
            result.map((item) => _.extend(item, { financialQuarter: item.calendarQuarter, amountInNative: item.amountInUSD }));
            return result;
        } else {
            return [];
        }
    }
);

/**
 * This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getChangeFromPriorBudgetBarChartData = createSelector(
    getMetricsGraph,
    fromPortfolioDashboard.getSelectedPeriod,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsBud" : "icLatest";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const result = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            // HACK BECAUSE API RESPONSE IS NAMED DIFFERENTLY AND MAKES CHARTS NOT WORK
            result.map((item) => _.extend(item, { financialQuarter: item.calendarQuarter, amountInNative: item.amountInUSD }));
            return result;
        } else {
            return [];
        }
    }
);
