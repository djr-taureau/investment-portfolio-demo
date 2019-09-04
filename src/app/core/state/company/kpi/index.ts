import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { ChartDataPeriod, ChartPeriodDataSets } from "@core/domain/company.model";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { getMetricsGraph, getTableData } from "@core/state/company/revenue";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import { CompanyKpiActions } from "@core/state/company/kpi/company-kpi.actions";
import * as fromCompanyDashboard from "@core/state/company/dashboard";
import * as fromRoot from "@core/state";
import * as fromCompanyKpi from "@core/state/company/kpi/company-kpi.reducer";
import * as ObjectUtil from "@util/object.util";

export interface CompanyKpi {
    data: fromCompanyKpi.State;
}

export interface State extends fromRoot.AppState {
    companyKpi: CompanyKpi;
}

export const reducers: ActionReducerMap<CompanyKpi, CompanyKpiActions> = {
    data: fromCompanyKpi.reducer
};

export const selectCompanyKpi = createFeatureSelector<any, any>("companyKpi");

export const selectCompanyKpiDataState = createSelector(
    selectCompanyKpi,
    (state: CompanyKpi) => state.data
);

export const getChartDataPeriodSets = createSelector(
    selectCompanyKpiDataState,
    fromCompanyKpi.getChartDataPeriodSets
);

/**
 * This is the value for 1.1 in the Solution Summary - aka the summary kpi chart:
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Kpi+Widget+-+SS
 */
export const getAsOf = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (sets && period && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const metricsGraph = set.metricsGraph;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const currencyKey: string =
                        currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
                    const scenarioName = "actual";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    const matchingDateData: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                    const matchingDateIndex: number = matchingDateData.findIndex((item) => item.date === period.date);
                    const result = ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], 0);
                    return result ? result : 0;
                }
                return 0;
            }
            return 0;
        }
    );

/**
 * This is the value for 1.2 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsPQ or vsPY percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getChangeFromPriorPeriod = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (sets && period && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const tableData = set.tableData;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPQ" : "vsPY";
                    const currencyKey: string =
                        currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    const matchingDateData: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                    const matchingDateIndex: number = matchingDateData.findIndex((item) => item.date === period.date);
                    const result = ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], 0);
                    return result ? result : 0;
                }
                return 0;
            }
            return 0;
        }
    );

/**
 * This is the value for 1.3 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getChangeFromPriorBudget = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (sets && period && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const tableData = set.tableData;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsBud" : "icLatest";
                    const currencyKey: string =
                        currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    const matchingDateData: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                    const matchingDateIndex: number = matchingDateData.findIndex((item) => item.date === period.date);
                    const result = ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], 0);
                    return result ? result : 0;
                }
                return 0;
            }
            return 0;
        }
    );

/**
 * This is the value for 1.3 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getSummaryLineChartData = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (sets && period && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const metricsGraph = set.metricsGraph;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const scenarioName = "actual";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                }
                return [];
            }
            return [];
        }
    );

export const getBudgetLineChartData = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (sets && period && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const metricsGraph = set.metricsGraph;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const currencyKey: string =
                        currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
                    const scenarioName = "budget";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                }
                return [];
            }
            return [];
        }
    );

export const getForecastLineChartData = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (sets && period && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const metricsGraph = set.metricsGraph;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const currencyKey: string =
                        currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
                    const scenarioName = "forecast";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                }
                return [];
            }
            return [];
        }
    );

/**
 * This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsPQ or vsPY percentage values in the mini bar charts.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getChangeFromPriorPeriodBarChartData = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (sets && period && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const tableData = set.tableData;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPQ" : "vsPY";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                }
                return [];
            }
            return [];
        }
    );

/**
 * This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getChangeFromPriorBudgetBarChartData = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (sets && period && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const tableData = set.tableData;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsBud" : "icLatest";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                }
                return [];
            }
            return [];
        }
    );

/**
 * TODO: This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getTableDataHeaders = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], datePart: DatePartType, currency: CurrencyType) => {
            if (sets && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const tableData = set.tableData;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const scenarioName = "actual";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                    return data.map((item) => {
                        const year = item.date.substr(2, 2);
                        return `${item.financialQuarter}${datePart.id}${year} ${item.sourceType}`;
                    });
                }
                return [];
            }
            return [];
        }
    );

/**
 * TODO: This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getTableDataAsOf = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], datePart: DatePartType, currency: CurrencyType) => {
            if (sets && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const tableData = set.tableData;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const scenarioName = "actual";
                    const currencyKey: string =
                        currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                    return data.map((item) => item[currencyKey]);
                }
                return [];
            }
            return [];
        }
    );

/**
 * TODO: This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getTableDataVsBud = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], datePart: DatePartType, currency: CurrencyType) => {
            if (sets && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const tableData = set.tableData;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const scenarioName = "vsBud";
                    const currencyKey: string =
                        currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                    return data.map((item) => item[currencyKey]);
                }
                return [];
            }
            return [];
        }
    );

/**
 * TODO: This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsBud or icLatest percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getTableDataVsPq = (id: string) =>
    createSelector(
        getChartDataPeriodSets,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (sets: ChartPeriodDataSets[], datePart: DatePartType, currency: CurrencyType) => {
            if (sets && datePart && currency) {
                const set = sets.find((item: ChartPeriodDataSets) => item.id === id);
                if (set) {
                    const tableData = set.tableData;
                    const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                    const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPQ" : "vsPY";
                    const currencyKey: string =
                        currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
                    const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                    const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                    const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                    return data.map((item) => item[currencyKey]);
                }
                return [];
            }
            return [];
        }
    );
