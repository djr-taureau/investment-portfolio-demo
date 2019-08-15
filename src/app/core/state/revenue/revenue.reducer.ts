import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { EntityState } from "@ngrx/entity";
import { RevenueSeries } from "app/core/domain/company.model";
import { RevenueActionTypes, RevenueActions } from "./revenue.actions";

export interface State extends EntityState<RevenueSeries> {
    pending: boolean | null;
    error: string | null;
}

export const adapter: EntityAdapter<RevenueSeries> = createEntityAdapter<RevenueSeries>({
    selectId: (revenueSeries: RevenueSeries) => revenueSeries.scenarioName
});

export const initialState: State = adapter.getInitialState({
    pending: false,
    error: ""
});

export function reducer(state = initialState, action: RevenueActions): State {
    switch (action.type) {
        case RevenueActionTypes.GetAll: {
            return {
                ...state,
                pending: true,
                error: ""
            };
        }
        case RevenueActionTypes.GetAllSuccess: {
            state.pending = false;
            state.error = "";
            return adapter.addAll(action.payload, state);
        }
        case RevenueActionTypes.GetAllFailure: {
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
}
