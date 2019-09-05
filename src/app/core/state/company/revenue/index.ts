import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { ChartDataPeriod } from "@core/domain/company.model";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import { CompanyRevenueActions } from "@core/state/company/revenue/company-revenue.actions";
import * as fromCompanyDashboard from "@core/state/company/dashboard";
import * as fromRoot from "@core/state";
import * as fromCompanyRevenue from "@core/state/company/revenue/company-revenue.reducer";
import * as ObjectUtil from "@util/object.util";

export interface CompanyRevenue {
    data: fromCompanyRevenue.State;
}

export interface State extends fromRoot.AppState {
    companyRevenue: CompanyRevenue;
}

export const reducers: ActionReducerMap<CompanyRevenue, CompanyRevenueActions> = {
    data: fromCompanyRevenue.reducer
};

export const selectCompanyRevenue = createFeatureSelector<any, any>("companyRevenue");

export const selectCompanyRevenueDataState = createSelector(
    selectCompanyRevenue,
    (state: CompanyRevenue) => state.data
);

export const getComparisonGraph = createSelector(
    selectCompanyRevenueDataState,
    fromCompanyRevenue.getComparisonGraph
);

export const getMetricsGraph = createSelector(
    selectCompanyRevenueDataState,
    fromCompanyRevenue.getMetricsGraph
);

export const getTableData = createSelector(
    selectCompanyRevenueDataState,
    fromCompanyRevenue.getTableData
);

/**
 * This is the value for 1.1 in the Solution Summary - aka the summary revenue chart:
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getRevenueAsOf = createSelector(
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
            let matchingDateIndex = 0;
            if (datePart.id.toUpperCase() === "Q") {
                matchingDateIndex = matchingDateData.findIndex((item) => item.date === period.fiscalDate);
            } else {
                const periodFiscalDateString = new Date(period.fiscalDate).getFullYear().toString();
                matchingDateIndex = matchingDateData.findIndex((item) => {
                    const itemDateString = new Date(item.date).getFullYear().toString();
                    return itemDateString === periodFiscalDateString;
                });
            }
            const result = ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], Math.PI);
            return result ? result : Math.PI;
        } else {
            return Math.PI;
        }
    }
);

/**
 * This is the value for 1.2 in the Solution Summary - aka the summary revenue chart:
 * It represents the vsPQ or vsPY percentage values.
 * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
 */
export const getChangeFromPriorPeriod = createSelector(
    getTableData,
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            // CM 8/27 5:25PM
            // So with that in mind - yes use series_quarters/vsPY if QTR selected, and series_years/vsPY if YEAR selected.
            // const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPQ" : "vsPY";
            const scenarioName = "vsPY";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            const matchingDateData: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            let matchingDateIndex = 0;
            if (datePart.id.toUpperCase() === "Q") {
                matchingDateIndex = matchingDateData.findIndex((item) => item.date === period.fiscalDate);
            } else {
                const periodFiscalDateString = new Date(period.fiscalDate).getFullYear().toString();
                matchingDateIndex = matchingDateData.findIndex((item) => {
                    const itemDateString = new Date(item.date).getFullYear().toString();
                    return itemDateString === periodFiscalDateString;
                });
            }
            // const matchingDateIndex: number = matchingDateData.findIndex((item) => item.date === period.fiscalDate);
            const result = ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], Math.PI);
            return result ? result : Math.PI;
        } else {
            return Math.PI;
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
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && period && datePart && currency) {
            const isQuarter = datePart.id.toUpperCase() === "Q";
            const datePartKey: string = isQuarter ? "series_quarters" : "series_years";
            const scenarioName: string = isQuarter ? "managementBudget" : "icLatest";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
            let actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            // If icLatest is not in the series we look for icInitial
            if (actualIndex === -1 && !isQuarter) {
                actualIndex = dateDataList.findIndex((item) => item.scenarioName === "icInitial");
            }
            const matchingDateData: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            let matchingDateIndex = 0;
            if (isQuarter) {
                matchingDateIndex = matchingDateData.findIndex((item) => item.date === period.fiscalDate);
            } else {
                const periodFiscalDateString = new Date(period.fiscalDate).getFullYear().toString();
                matchingDateIndex = matchingDateData.findIndex((item) => {
                    const itemDateString = new Date(item.date).getFullYear().toString();
                    return itemDateString === periodFiscalDateString;
                });
            }
            // const matchingDateIndex: number = matchingDateData.findIndex((item) => item.date === period.fiscalDate);
            const result = ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], Math.PI);
            return result ? result : Math.PI;
        } else {
            return Math.PI;
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
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName = "actual";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
            // TODO: REMOVE THIS WHEN THE API IS RETURNING PROJECTION PROPERTY
            dateDataList.map((arrEl) => {
                arrEl.data.map((el) => (el.projection = false));
            });
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            const result = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            return result.map((item) => {
                const valueOrAmount = item[currencyKey] || 0;
                return {
                    ...item,
                    value: valueOrAmount,
                    amount: valueOrAmount
                };
            });
        } else {
            return [];
        }
    }
);

export const getBudgetLineChartData = createSelector(
    getMetricsGraph,
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
            const scenarioName = "budget";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
        } else {
            return [];
        }
    }
);

export const getForecastLineChartData = createSelector(
    getMetricsGraph,
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
            const scenarioName = "forecast";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
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
    getTableData,
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            // CM 8/27 5:25PM
            // So with that in mind - yes use series_quarters/vsPY if QTR selected, and series_years/vsPY if YEAR selected.
            // const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPQ" : "vsPY";
            const scenarioName = "vsPY";
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
            const isQuarter = datePart.id.toUpperCase() === "Q";
            const datePartKey: string = isQuarter ? "series_quarters" : "series_years";
            const scenarioName: string = isQuarter ? "managementBudget" : "icLatest";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
            let actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            // If icLatest is not in the series we look for icInitial
            if (actualIndex === -1 && !isQuarter) {
                actualIndex = dateDataList.findIndex((item) => item.scenarioName === "icInitial");
            }
            return ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
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
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName = "actual";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            let i = 0;
            return data.map((item) => {
                const year = item.date.substr(2, 2);
                // return `${item.financialQuarter}${datePart.id}${year} ${item.sourceType}`;
                return `${(i++).toString()}${datePart.id}${year} ${item.sourceType}`;
            });
        } else {
            return [];
        }
    }
);

export const getRevenueTableData = (scenario: string) =>
    createSelector(
        getTableData,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (tableData && datePart && currency) {
                const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                const scenarioName = scenario;
                const currencyKey: string =
                    currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
                const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
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
// export const getTableDataRevenueAsOf = createSelector(
//     getTableData,
//     fromCompanyDashboard.getSelectedDatePart,
//     fromCompanyDashboard.getSelectedCurrency,
//     (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
//         if (tableData && datePart && currency) {
//             const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
//             const scenarioName = "actual";
//             const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
//             const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
//             const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
//             const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
//             return data.map((item) => item[currencyKey]);
//         } else {
//             return [];
//         }
//     }
// );

// /**
//  * TODO: This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
//  * It represents the vsBud or icLatest percentage values.
//  * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
//  */
// export const getTableDataRevenueVsBud = createSelector(
//     getTableData,
//     fromCompanyDashboard.getSelectedDatePart,
//     fromCompanyDashboard.getSelectedCurrency,
//     (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
//         if (tableData && datePart && currency) {
//             const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
//             const scenarioName = "vsBud";
//             const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
//             const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
//             const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
//             const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
//             return data.map((item) => item[currencyKey]);
//         } else {
//             return [];
//         }
//     }
// );

// /**
//  * TODO: This is the value for 1.5 in the Solution Summary - aka the summary revenue chart:
//  * It represents the vsBud or icLatest percentage values.
//  * https://casertaconcepts.atlassian.net/wiki/spaces/SOF/pages/522945521/PortCo+Dashboard+Revenue+Widget+-+SS
//  */
// export const getTableDataRevenueVsPq = createSelector(
//     getTableData,
//     fromCompanyDashboard.getSelectedDatePart,
//     fromCompanyDashboard.getSelectedCurrency,
//     (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
//         if (tableData && datePart && currency) {
//             const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
//             const scenarioName = "vsPQ";
//             const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
//             const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
//             const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
//             const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
//             return data.map((item) => item[currencyKey]);
//         } else {
//             return [];
//         }
//     }
// );

// // public revenueTableDataVsPy$: Observable<number[]>;
// // export const getRevenueTableDataVsPy = (scenario: string) => createSelector(
// //     getTableData,
// //     fromCompanyDashboard.getSelectedDatePart,
// //     fromCompanyDashboard.getSelectedCurrency,
// //     (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
// //         if (tableData && datePart && currency) {
// //             const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
// //             const scenarioName = scenario;
// //             const currencyKey: string = currency.currencyCode.toUpperCase()
// === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
// //             const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
// //             const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
// //             const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
// //             return data.map((item) => item[currencyKey]);
// //         } else {
// //             return [];
// //         }
// //     }
// // );
// // public revenueTableDataVsForecast$: Observable<number[]>;
// export const getRevenueTableDataVsForecast = createSelector(
//     getTableData,
//     fromCompanyDashboard.getSelectedDatePart,
//     fromCompanyDashboard.getSelectedCurrency,
//     (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
//         if (tableData && datePart && currency) {
//             const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
//             const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPQ" : "vsPY";
//             const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
//             const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
//             const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
//             const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
//             return data.map((item) => item[currencyKey]);
//         } else {
//             return [];
//         }
//     }
// );
// // public revenueTableDataVsIcInitial$: Observable<number[]>;
// export const getRevenueTableDataVsIcInitial = createSelector(
//     getTableData,
//     fromCompanyDashboard.getSelectedDatePart,
//     fromCompanyDashboard.getSelectedCurrency,
//     (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
//         if (tableData && datePart && currency) {
//             const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
//             const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPQ" : "vsPY";
//             const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
//             const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
//             const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
//             const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
//             return data.map((item) => item[currencyKey]);
//         } else {
//             return [];
//         }
//     }
// );
// // public revenueTableDataVsIcLatest$: Observable<number[]>;
// export const getRevenueTableDataVsIcLatest = createSelector(
//     getTableData,
//     fromCompanyDashboard.getSelectedDatePart,
//     fromCompanyDashboard.getSelectedCurrency,
//     (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
//         if (tableData && datePart && currency) {
//             const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
//             const scenarioName: string = datePart.id.toUpperCase() === "Q" ? "vsPQ" : "vsPY";
//             const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
//             const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
//             const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
//             const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
//             return data.map((item) => item[currencyKey]);
//         } else {
//             return [];
//         }
//     }
// );

export const getAllLineChartData = createSelector(
    getMetricsGraph,
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (metricsGraph && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
            // TODO: REMOVE THIS WHEN THE API IS RETURNING PROJECTION PROPERTY
            dateDataList.map((arrEl) => {
                arrEl.data.map((el) => (el.projection = false));
            });
            // const result = dateDataList.map((item) => item.data || []);
            return dateDataList.map((arrEl) => {
                return {
                    ...arrEl,
                    data: arrEl.data.map((item) => {
                        const valueOrAmount = item[currencyKey] || 0;
                        return {
                            ...item,
                            value: valueOrAmount,
                            amount: valueOrAmount
                        };
                    })
                };
            });
        } else {
            return [];
        }
    }
);

export const getAllTableData = createSelector(
    getTableData,
    fromCompanyDashboard.getSelectedPeriod,
    fromCompanyDashboard.getSelectedDatePart,
    fromCompanyDashboard.getSelectedCurrency,
    (tableData: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
        if (tableData && period && datePart && currency) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const currencyKey: string = currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
            // TODO: REMOVE THIS WHEN THE API IS RETURNING PROJECTION PROPERTY
            dateDataList.map((arrEl) => {
                arrEl.data.map((el) => (el.projection = false));
            });
            // const result = dateDataList.map((item) => item.data || []);
            return dateDataList.map((arrEl) => {
                return {
                    ...arrEl,
                    data: arrEl.data.map((item) => {
                        const valueOrAmount = item[currencyKey] || 0;
                        return {
                            ...item,
                            value: valueOrAmount,
                            amount: valueOrAmount
                        };
                    })
                };
            });
        } else {
            return [];
        }
    }
);

const getLabelName = (label) => {
    switch (label) {
        case "actual":
            return `Revenue`;
        case "managementBudget":
            return `vs Bud`;
        case "forecast":
            return `vs Mgmt Fcst`;
        case "icInitial":
            return `vs IC Initial`;
        case "icLatest":
            return `vs IC Latest`;
        case "vsPQ":
            return `vs PQ`;
        case "vsPY":
            return `vs PY`;
    }
};
