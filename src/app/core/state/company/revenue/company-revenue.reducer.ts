import { RevenuePeriod } from "@core/domain/company.model";
import { CompanyRevenueActions, CompanyRevenueActionTypes } from "@core/state/company/revenue/company-revenue.actions";

export interface State {
    comparisonGraph: RevenuePeriod;
    revenueGraph: RevenuePeriod;
    tableData: RevenuePeriod;
}

export const initialState: State = {
    comparisonGraph: null,
    revenueGraph: null,
    tableData: null
};

function save(data: any, state: State = initialState): State {
    return {
        ...state,
        comparisonGraph: data.comparisonGraph,
        revenueGraph: data.revenueGraph,
        tableData: data.tableData
    };
}

export function reducer(state: State = initialState, action: CompanyRevenueActions): State {
    switch (action.type) {
        case CompanyRevenueActionTypes.GetSuccess:
            return save(action.payload, state);

        default:
            return state;
    }
}

export const getComparisonGraph = (state: State) => state.comparisonGraph;
export const getRevenueGraph = (state: State) => state.revenueGraph;
export const getTableData = (state: State) => state.tableData;
