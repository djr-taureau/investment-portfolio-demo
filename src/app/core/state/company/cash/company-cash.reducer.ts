import { CashMonth, CompanyCash } from "@core/domain/cash.model";
import { CompanyCashActions, CompanyCashActionTypes } from "@core/state/company/cash/company-cash.actions";

export interface State {
    cashRunwayInMonths: number;
    cashData: CashMonth[];
    isLoading: boolean;
}

export const initialState: State = {
    cashRunwayInMonths: 0,
    cashData: [],
    isLoading: true
};

function save(data: any, state: State = initialState): State {
    return {
        ...state,
        cashRunwayInMonths: data.cashRunwayInMonths,
        cashData: data.cashData,
        isLoading: false
    };
}

function loading(isLoading: boolean, state: State = initialState): State {
    return {
        ...state,
        isLoading
    };
}

export function reducer(state: State = initialState, action: CompanyCashActions): State {
    switch (action.type) {
        case CompanyCashActionTypes.GetCash:
            return loading(true);

        case CompanyCashActionTypes.GetCashSuccess:
            return save(action.payload, state);

        case CompanyCashActionTypes.GetCashFailure:
            return loading(false);

        default:
            return state;
    }
}

export const getCashRunwayInMonths = (state: State) => state.cashRunwayInMonths;
export const getCashData = (state: State) => state.cashData;
export const getIsLoading = (state: State) => state.isLoading;
