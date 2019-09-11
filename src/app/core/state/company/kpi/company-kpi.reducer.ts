import { KpiChartPeriodDataSets } from "@core/domain/company.model";
import { CompanyKpiActions, CompanyKpiActionTypes } from "@core/state/company/kpi/company-kpi.actions";

export interface State {
    chartDataPeriodSets: KpiChartPeriodDataSets[];
    isLoading: boolean;
}

export const initialState: State = {
    chartDataPeriodSets: null,
    isLoading: true
};

function save(data: any, state: State = initialState): State {
    return {
        chartDataPeriodSets: data || initialState,
        isLoading: false
    };
}

function loading(isLoading: boolean, state: State = initialState): State {
    return {
        ...state,
        isLoading
    };
}

export function reducer(state: State = initialState, action: CompanyKpiActions): State {
    switch (action.type) {
        case CompanyKpiActionTypes.Get:
            return loading(true);

        case CompanyKpiActionTypes.GetSuccess:
            return save(action.payload, state);

        case CompanyKpiActionTypes.GetFailure:
            return loading(false);

        default:
            return state;
    }
}

export const getChartDataPeriodSets = (state: State) => state.chartDataPeriodSets;
export const getIsLoading = (state: State) => state.isLoading;
