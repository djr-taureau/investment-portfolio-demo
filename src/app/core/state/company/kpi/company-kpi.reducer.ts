import { ChartPeriodDataSets } from "@core/domain/company.model";
import { CompanyKpiActions, CompanyKpiActionTypes } from "@core/state/company/kpi/company-kpi.actions";

export interface State {
    chartDataPeriodSets: ChartPeriodDataSets[];
}

export const initialState: State = {
    chartDataPeriodSets: null
};

function save(data: any, state: State = initialState): State {
    return {
        ...state,
        chartDataPeriodSets: data
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

export const getChartDataPeriodSets = (state: State) => state.chartDataPeriodSets;
