import { state } from "@angular/animations";
import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { ChartDataPeriod, KpiChartPeriodDataSets } from "@core/domain/company.model";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import { CompanyRevenueActions } from "@core/state/company/revenue/company-revenue.actions";
import { CompanyEbitdaActions } from "@core/state/company/ebitda/company-ebitda.actions";
import * as fromCompanyDashboard from "@core/state/company/dashboard";
import * as fromRoot from "@core/state";
import * as fromCompanyRevenue from "@core/state/company/revenue/company-revenue.reducer";
import * as fromEbitda from "@core/state/company/ebitda/company-ebitda.reducer";
import * as fromCompanyKpi from "@core/state/company/kpi/company-kpi.reducer";
import * as ObjectUtil from "@util/object.util";

export interface WidgetState {
    revenue: fromCompanyRevenue.State;
    ebitda: fromEbitda.State;
    kpi: fromCompanyKpi.State;
}

export interface State extends fromRoot.AppState {
    widgetState: WidgetState;
}

export const reducers: ActionReducerMap<any, any> = {
    revenue: fromCompanyRevenue.reducer,
    ebitda: fromEbitda.reducer,
    kpi: fromCompanyKpi.reducer
};

export const selectWidgetState = createFeatureSelector<any, any>("widgetState");

export const selectChildState = (name: string) =>
    createSelector(
        selectWidgetState,
        (selectedState: WidgetState) => selectedState[name]
    );

export const getChartDataPeriodSets = createSelector(
    selectChildState("kpi"),
    fromCompanyKpi.getChartDataPeriodSets
);

export const getIsLoading = (child: string, id?: string) =>
    createSelector(
        selectChildState(child),
        (childState) => {
            return !!childState.isLoading;
        }
    );

export const getMetricsGraph = (child: string, id?: string) =>
    createSelector(
        selectChildState(child),
        (childState) => {
            if (id) {
                const set = childState.chartDataPeriodSets.find((item: KpiChartPeriodDataSets) => item.id === id);
                if (set) {
                    return set.data.metricsGraph;
                } else {
                    return null;
                }
            } else {
                return childState.metricsGraph;
            }
        }
    );

export const getTableData = (child: string, id?: string) =>
    createSelector(
        selectChildState(child),
        (childState) => {
            if (id) {
                const set = childState.chartDataPeriodSets.find((item: KpiChartPeriodDataSets) => item.id === id);
                if (set) {
                    return set.data.tableData;
                } else {
                    return null;
                }
            } else {
                return childState.tableData;
            }
        }
    );

/**
 * This gets the total above the line chart in the summary widgets for Revenue and Ebidta
 */
export const getSummaryLineChartTotal = (widget: string, id?: string) =>
    createSelector(
        getMetricsGraph(widget, id),
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (metricsGraph && period && datePart && currency) {
                const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                const currencyKey: string =
                    currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
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
 * This gets the value above the left bar chart in the summary widgets for Revenue and Ebidta
 */
export const getBarChart1Total = (widget: string, id?: string) =>
    createSelector(
        getTableData(widget, id),
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
                const currencyKey: string =
                    currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
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
 * This gets the total above the right hand bar chart in the summary widgets for Revenue and Ebidta
 */
export const getBarChart2Total = (widget: string, id?: string) =>
    createSelector(
        getTableData(widget, id),
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (tableData: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (tableData && period && datePart && currency) {
                const isQuarter = datePart.id.toUpperCase() === "Q";
                const datePartKey: string = isQuarter ? "series_quarters" : "series_years";
                const scenarioName: string = isQuarter ? "managementBudget" : "icLatest";
                const currencyKey: string =
                    currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
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
                const result = ObjectUtil.getNestedPropIfExists(matchingDateData, [String(matchingDateIndex), currencyKey], Math.PI);
                return result ? result : Math.PI;
            } else {
                return Math.PI;
            }
        }
    );

/**
 * This gets the data for the left hand bar chart in the summary widgets for Revenue and Ebidta
 */
export const getBarChart1GraphData = (widget: string, id?: string) =>
    createSelector(
        getTableData(widget, id),
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
 * This gets the data for the right hand bar chart in the summary widgets for Revenue and Ebidta
 */
export const getBarChart2GraphData = (widget: string, id?: string) =>
    createSelector(
        getTableData(widget, id),
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
 * Returns the actual, managementBudget, and managementForecast data from metricsGraph in the summary widgets for Revenue and Ebidta
 * for the specific period and currency for the line charts in summary and detail.
 * It also creates properties specific to the charts
 */
export const getAllLineChartGraphData = (widget: string, id?: string) =>
    createSelector(
        getMetricsGraph(widget, id),
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (metricsGraph && period && datePart && currency) {
                const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                const currencyKey: string =
                    currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
                const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(metricsGraph, [datePartKey], []);
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

/**
 * Returns the actual data from metricsGraph in the summary widgets for Revenue and Ebidta
 * for the specific period and currency for the line charts in summary and detail.
 * It also creates properties specific to the charts
 */
export const getSummaryLineChartData = (widget: string, id?: string) =>
    createSelector(
        getMetricsGraph(widget, id),
        fromCompanyDashboard.getSelectedPeriod,
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (metricsGraph: ChartDataPeriod, period: SelectorPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (metricsGraph && period && datePart && currency) {
                const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                const scenarioName = "actual";
                const currencyKey: string =
                    currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "amountInUSD" : "amountInNative";
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
/**
 * This gets the headers for the data table in the detail view for the revenue and ebidta widgets.
 * It is a requirement to specifically look at the actual scenario for these.
 */
export const getTableDataHeaders = (widget: string, id?: string) =>
    createSelector(
        getTableData(widget, id),
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (tableData && datePart && currency) {
                const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                const scenarioName = "actual";
                const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
                const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
                return data.map((item) => {
                    const year = item.date.substr(2, 2);
                    return `${item.financialQuarter.toString()}${datePart.id}${year} ${item.sourceType}`;
                });
            } else {
                return [];
            }
        }
    );

/**
 * This gets all of the table data for the detail view for the revenue and ebidta widgets
 */
export const getAllTableData = (widget: string, id?: string) =>
    createSelector(
        getTableData(widget, id),
        fromCompanyDashboard.getSelectedDatePart,
        fromCompanyDashboard.getSelectedCurrency,
        (tableData: ChartDataPeriod, datePart: DatePartType, currency: CurrencyType) => {
            if (tableData && datePart && currency) {
                const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
                const currencyKey: string =
                    currency.currencyCode.toUpperCase() === CurrencyTypeEnum.USD.currencyCode ? "valueInUSD" : "valueInNative";
                const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
                return dateDataList.map((item) => {
                    const currencySpecific = item.data.map((datum) => datum[currencyKey]);
                    return {
                        scenario: item.scenarioName,
                        data: currencySpecific
                    };
                });
            } else {
                return [];
            }
        }
    );

/**
 * This really belongs in the dashboard index file, but, the current strategy is to use the
 * 'actuals' scenario for determining the data to display in the Historical Results -- Projected Results
 * widget in the selector component
 */
export const getHistoricalProjectedResults = createSelector(
    getTableData("revenue"),
    fromCompanyDashboard.getSelectedDatePart,
    (tableData: ChartDataPeriod, datePart: DatePartType) => {
        if (tableData && datePart) {
            const datePartKey: string = datePart.id.toUpperCase() === "Q" ? "series_quarters" : "series_years";
            const scenarioName = "actual";
            const dateDataList: any[] = ObjectUtil.getNestedPropIfExists(tableData, [datePartKey], []);
            const actualIndex: number = dateDataList.findIndex((item) => item.scenarioName === scenarioName);
            const data: any[] = ObjectUtil.getNestedPropIfExists(dateDataList, [String(actualIndex), "data"], []);
            const historicalData = data.filter((item) => !item.projection);
            const projectedData = data.filter((item) => item.projection);
            const historicalCount = historicalData.length;
            const historicalStart = historicalCount > 0 ? historicalData[0].date : "";
            const historicalEnd = historicalCount > 1 ? historicalData[historicalCount - 1].date : "";
            const projectedCount = projectedData.length;
            const projectedStart = projectedCount > 0 ? projectedData[0].date : "";
            const projectedEnd = projectedCount > 1 ? projectedData[projectedCount - 1].date : "";
            return {
                historicalCount,
                historicalStart,
                historicalEnd,
                projectedCount,
                projectedStart,
                projectedEnd
            };
        } else {
            return null;
        }
    }
);
