import { ChartDataPeriod } from "@core/domain/company.model";
import { CompanyKpiActions, CompanyKpiActionTypes } from "@core/state/company/kpi/company-kpi.actions";

export interface State {
    comparisonGraph: ChartDataPeriod;
    metricsGraph: ChartDataPeriod;
    tableData: ChartDataPeriod;
}

export const initialState: State = {
    comparisonGraph: null,
    metricsGraph: null,
    tableData: null
};

function save(data: any, state: State = initialState): State {
    return {
        ...state,
        comparisonGraph: data.comparisonGraph,
        metricsGraph: data.metricsGraph,
        tableData: data.tableData
    };
}

export function reducer(state: State = initialState, action: CompanyKpiActions): State {
    switch (action.type) {
        case CompanyKpiActionTypes.GetSuccess:
            return save(action.payload, state);

        default:
            return state;
    }
}

export const getComparisonGraph = (state: State) => state.comparisonGraph;
export const getMetricsGraph = (state: State) => state.metricsGraph;
export const getTableData = (state: State) => state.tableData;
