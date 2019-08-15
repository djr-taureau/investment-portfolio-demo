import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { ChartDataPeriod } from "@core/domain/company.model";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import { CompanyEbitdaActions } from "@core/state/company/ebitda/company-ebitda.actions";
import * as fromCompanyDashboard from "@core/state/company/dashboard";
import * as fromRoot from "@core/state";
import * as fromCompanyEbitda from "@core/state/company/ebitda/company-ebitda.reducer";
import * as ObjectUtil from "@util/object.util";

export interface CompanyEbitda {
    data: fromCompanyEbitda.State;
}

export interface State extends fromRoot.AppState {
    companyEbitda: CompanyEbitda;
}

export const reducers: ActionReducerMap<CompanyEbitda, CompanyEbitdaActions> = {
    data: fromCompanyEbitda.reducer
};

export const selectCompanyEbitda = createFeatureSelector<any, any>("companyEbitda");

export const selectCompanyEbitdaDataState = createSelector(
    selectCompanyEbitda,
    (state: CompanyEbitda) => state.data
);

export const getComparisonGraph = createSelector(
    selectCompanyEbitdaDataState,
    fromCompanyEbitda.getComparisonGraph
);

export const getMetricsGraph = createSelector(
    selectCompanyEbitdaDataState,
    fromCompanyEbitda.getMetricsGraph
);

export const getTableData = createSelector(
    selectCompanyEbitdaDataState,
    fromCompanyEbitda.getTableData
);

/**
 * This is the value for 1.1 in the Solution Summary - aka the summary ebitda chart:
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Ebitda+Widget+-+SS
 */
export const getEbitdaAsOf = createSelector(
    getMetricsGraph,
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
            const scenarioName = "actual";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
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
    getTableData,
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPQ" : "vsPY";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            const matchingDateData: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            const matchingDateIndex: number = matchingDateData.findIndex((item) => item.date === period.date);
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
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsBud" : "icLatest";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            const matchingDateData: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            const matchingDateIndex: number = matchingDateData.findIndex((item) => item.date === period.date);
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
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
            const scenarioName = "actual";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
        } else {
            return 0;
        }
    }
);

/**
 * This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsPQ or vsPY percentage values in the mini bar charts.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getChangeFromPriorPeriodBarChartData = createSelector(
    getTableData,
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPQ" : "vsPY";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
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
    getTableData,
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsBud" : "icLatest";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
        } else {
            return [];
        }
    }
);
