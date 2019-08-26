import { ChartDataPeriod } from "@core/domain/company.model";
import { PortfolioRevenueActions, PortfolioRevenueActionTypes } from "@core/state/portfolio-dashboard/revenue/portfolio-revenue.actions";

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
        metricsGraph: data
    };
}

export function reducer(state: State = initialState, action: PortfolioRevenueActions): State {
    switch (action.type) {
        case PortfolioRevenueActionTypes.GetSuccess:
            return save(action.payload, state);

        default:
            return state;
    }
}

export const getComparisonGraph = (state: State) => state.comparisonGraph;
export const getMetricsGraph = (state: State) => state.metricsGraph;
export const getTableData = (state: State) => state.tableData;
