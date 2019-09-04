import { CashMonth, CompanyCash } from "@core/domain/cash.model";
import { CompanyCashActions, CompanyCashActionTypes } from "@core/state/company/cash/company-cash.actions";

export interface State {
    cashRunwayInMonths: number;
    cashData: CashMonth[];
}

export const initialState: State = {
    cashRunwayInMonths: 0,
    cashData: []
};

function save(data: any, state: State = initialState): State {
    return {
        ...state,
        cashRunwayInMonths: data.cashRunwayInMonths,
        cashData: data.cashData
    };
}

export function reducer(state: State = initialState, action: CompanyCashActions): State {
    switch (action.type) {
        case CompanyCashActionTypes.GetCashSuccess:
            return save(action.payload, state);

        default:
            return state;
    }
}

export const getCashRunwayInMonths = (state: State) => state.cashRunwayInMonths;
export const getCashData = (state: State) => state.cashData;
