import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { ChartDataPeriod, RevenueSeriesData } from "@core/domain/company.model";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { PortfolioRevenueActions } from "@core/state/portfolio-dashboard/revenue/portfolio-revenue.actions";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import * as fromPortfolioDashboard from "@core/state/portfolio-dashboard";
import * as fromRoot from "@core/state";
import * as fromPortfolioRevenue from "@core/state/portfolio-dashboard/revenue/portfolio-revenue.reducer";
import * as ObjectUtil from "@util/object.util";
import * as _ from "lodash";

export interface PortfolioRevenue {
    data: fromPortfolioRevenue.State;
}

export interface State extends fromRoot.AppState {
    portfolioRevenue: PortfolioRevenue;
}

export const reducers: ActionReducerMap<PortfolioRevenue, PortfolioRevenueActions> = {
    data: fromPortfolioRevenue.reducer
};

export const selectPortfolioRevenue = createFeatureSelector<any, any>("portfolioRevenue");

export const selectPortfolioRevenueDataState = createSelector(
    selectPortfolioRevenue,
    (state: PortfolioRevenue) => state.data
);

export const getComparisonGraph = createSelector(
    selectPortfolioRevenueDataState,
    fromPortfolioRevenue.getComparisonGraph
);

export const getMetricsGraph = createSelector(
    selectPortfolioRevenueDataState,
    fromPortfolioRevenue.getMetricsGraph
);

export const getTableData = createSelector(
    selectPortfolioRevenueDataState,
    fromPortfolioRevenue.getTableData
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
 * This is the value for 1.1 in the Solution Summary - aka the summary revenue chart:
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getRevenueAsOf = createSelector(
    getMetricsGraph,
    fromPortfolioDashboard.getSelectedPeriod,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const currencyKey = "amountInUSD";
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
 * This is the value for 1.2 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsPQ or vsPY percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
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
 * This is the value for 1.3 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
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
 * This is the value for 1.3 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getSummaryLineChartData = createSelector(
    getMetricsGraph,
    fromPortfolioDashboard.getSelectedPeriod,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName = "actual";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const result = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            // HACK BECAUSE API RESPONSE IS NAMED DIFFERENTLY AND MAKES CHARTS NOT WORK
            result.map((item) => _.extend(item, { financialQuarter: item.calendarQuarter, amountInNative: item.amountInUSD }));
            return result.filter((item) => item.amountInUSD !== null);
        } else {
            return [];
        }
    }
);

export const getBudgetLineChartData = createSelector(
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
            return result.filter((item) => item.amountInUSD !== null);
        } else {
            return [];
        }
    }
);

export const getForecastLineChartData = createSelector(
    getMetricsGraph,
    fromPortfolioDashboard.getSelectedPeriod,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
            const scenarioName = "forecast";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const result = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            // HACK BECAUSE API RESPONSE IS NAMED DIFFERENTLY AND MAKES CHARTS NOT WORK
            result.map((item) => _.extend(item, { financialQuarter: item.calendarQuarter, amountInNative: item.amountInUSD }));
            return result.filter((item) => item.amountInUSD !== null);
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
            return result.filter((item) => item.amountInUSD !== null);
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
            return result.filter((item) => item.amountInUSD !== null);
        } else {
            return [];
        }
    }
);

/**
 * TODO: This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getTableDataHeaders = createSelector(
    getTableData,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName = "actual";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            return data.map((item) => {
                const year = item.date.substr(2, 2);
                return `${item.financialQuarter}${datePart.id}${year} ${item.sourceType}`;
            });
        } else {
            return [];
        }
    }
);

/**
 * TODO: This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getTableDataRevenueAsOf = createSelector(
    getTableData,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName = "actual";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            return data.map((item) => item[currencyKey]);
        } else {
            return [];
        }
    }
);

/**
 * TODO: This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getTableDataRevenueVsBud = createSelector(
    getTableData,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName = "vsBud";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            return data.map((item) => item[currencyKey]);
        } else {
            return [];
        }
    }
);

/**
 * TODO: This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getTableDataRevenueVsPq = createSelector(
    getTableData,
    fromPortfolioDashboard.getSelectedDatePart,
    fromPortfolioDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPY" : "vsPY";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []) || [];
            const actualIndex: number = _.findIndex(dateDataList, (item) => item.scenarioName === scenarioName);
            const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            return data.map((item) => item[currencyKey]);
        } else {
            return [];
        }
    }
);
