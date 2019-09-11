import { ChartDataPeriod } from "@core/domain/company.model";
import { CompanyEbitdaActions, CompanyEbitdaActionTypes } from "@core/state/company/ebitda/company-ebitda.actions";

export interface State {
    comparisonGraph: ChartDataPeriod;
    metricsGraph: ChartDataPeriod;
    tableData: ChartDataPeriod;
    isLoading: boolean;
}

export const initialState: State = {
    comparisonGraph: null,
    metricsGraph: null,
    tableData: null,
    isLoading: true
};

function save(data: any, state: State = initialState): State {
    return {
        ...state,
        comparisonGraph: data.comparisonGraph,
        metricsGraph: data.metricsGraph,
        tableData: data.tableData,
        isLoading: false
    };
}

function loading(isLoading: boolean, state: State = initialState): State {
    return {
        ...state,
        isLoading
    };
}

export function reducer(state: State = initialState, action: CompanyEbitdaActions): State {
    switch (action.type) {
        case CompanyEbitdaActionTypes.Get:
            return loading(true);

        case CompanyEbitdaActionTypes.GetSuccess:
            return save(action.payload, state);

        case CompanyEbitdaActionTypes.GetFailure:
            return loading(false);

        default:
            return state;
    }
}

export const getComparisonGraph = (state: State) => state.comparisonGraph;
export const getMetricsGraph = (state: State) => state.metricsGraph;
export const getTableData = (state: State) => state.tableData;
export const getIsLoading = (state: State) => state.isLoading;
