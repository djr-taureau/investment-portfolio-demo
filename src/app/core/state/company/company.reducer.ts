import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Company } from "@core/domain/company.model";
import { CompanyActions, CompanyActionTypes } from "./company.actions";

function sortByValuation(e1: Company, e2: Company) {
    return e1.currentValuation - e2.currentValuation;
}
export interface State extends EntityState<Company> {
    selectedCompanyId: string | null;
    sortValue: string;
    sortOrder: string;
}

export const adapter: EntityAdapter<Company> = createEntityAdapter<Company>({
    selectId: (company: Company) => company.id,
    sortComparer: sortByValuation
});

export const initialState: State = adapter.getInitialState({
    selectedCompanyId: null,
    sortValue: "valuation",
    sortOrder: "asc"
});

export function reducer(state = initialState, action: CompanyActions): State {
    switch (action.type) {
        case CompanyActionTypes.GetAllSuccess:
            return adapter.addMany(action.payload, state);

        case CompanyActionTypes.GetSuccess:
            return adapter.upsertOne(action.payload, state);

        case CompanyActionTypes.SetSelectedCompany:
            return { ...state, selectedCompanyId: action.payload };

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedCompanyId;
export const getSortValue = (state: State) => state.sortValue;
export const getSortOrder = (state: State) => state.sortOrder;
