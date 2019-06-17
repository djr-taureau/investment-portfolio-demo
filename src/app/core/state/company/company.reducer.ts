import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Company } from "@core/domain/company.model";
import { CompanyApiActions, CompanyActions } from "./index";
import { PortfolioApiActions } from "../portfolio/actions-index";

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

export function reducer(
    state = initialState,
    action: CompanyApiActions.CompaniesApiActionsUnion | CompanyActions.CompanyActionsUnion | PortfolioApiActions.PortfolioApiActionsUnion
): State {
    switch (action.type) {
        case CompanyApiActions.searchSuccess.type:
        case PortfolioApiActions.loadCompaniesSuccess.type: {
            // TODO: remove this once the company selector is valid
            // state.selectedCompanyId = action.companies[0].id;
            return adapter.addMany(action.companies, state);
        }

        case CompanyActions.loadCompany.type: {
            return adapter.addOne(action.company, state);
        }

        case CompanyActions.setSelectedCompany.type: {
            return { ...state, selectedCompanyId: action.id };
        }
        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedCompanyId;
export const getSortValue = (state: State) => state.sortValue;
export const getSortOrder = (state: State) => state.sortOrder;
