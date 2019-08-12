import { Initiative, InitiativeStatusEnum } from "@core/domain/initiative.model";
import { CompanyInitiativeActions, CompanyInitiativeActionTypes } from "@core/state/company/dashboard/company-initiative.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Person, TeamMember } from "@core/domain/company.model";

export interface State extends EntityState<Initiative> {
    selectedId: string;
    selectedOwnerFilter: Person;
    selectedStatusFilter: InitiativeStatusEnum;
}

export const adapter: EntityAdapter<Initiative> = createEntityAdapter<Initiative>({
    selectId: (initiative: Initiative) => initiative.id
});

export const initialState: State = adapter.getInitialState({
    selectedId: "",
    selectedOwnerFilter: null,
    selectedStatusFilter: null
});

export function reducer(state = initialState, action: CompanyInitiativeActions): State {
    switch (action.type) {
        case CompanyInitiativeActionTypes.GetAllInitiativesSuccess:
            return adapter.addMany(action.payload.data, state);
        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getSelectedOwnerFilter = (state: State) => state.selectedOwnerFilter;
export const getSelectedStatusFilter = (state: State) => state.selectedStatusFilter;
