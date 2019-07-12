import { ValuationActions, ValuationActionTypes, SetSelectedValuation } from "./valuation.actions";
import { EntityState } from "@ngrx/entity";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Valuation } from "@app/core/domain/company.model";

export interface State extends EntityState<Valuation> {
    selectedValuation: Valuation | null;
}

export const adapter: EntityAdapter<Valuation> = createEntityAdapter<Valuation>({
    selectId: (valuation: Valuation) => valuation.companyId
});

export const initialState: State = adapter.getInitialState({
    selectedValuation: null
});

export function reducer(state = initialState, action: ValuationActions): State {
    switch (action.type) {
        case ValuationActionTypes.GetAllSuccess:
            return adapter.addOne(action.payload, { ...state, selectedValuation: action.payload });
        case ValuationActionTypes.SetSelectedValuation:
            const valuation = state.entities[action.payload];
            return { ...state, selectedValuation: valuation };
        default:
            return state;
    }
}

export const getSelected = (state: State) => state.selectedValuation;
