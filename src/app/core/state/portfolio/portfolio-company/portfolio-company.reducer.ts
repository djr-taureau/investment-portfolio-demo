import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Company } from "../../../domain/company.model";
import { CompanyApiActions, CompanyActions } from "../portfolio-company";
import { PortfolioApiActions } from "../actions-index";

export interface State extends EntityState<Company> {
    selectedCompanyId: number | null;
}

export const adapter: EntityAdapter<Company> = createEntityAdapter<Company>({
    selectId: (company: Company) => company.id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    selectedCompanyId: null
});

export function reducer(
    state = initialState,
    action: CompanyApiActions.CompaniesApiActionsUnion | CompanyActions.CompanyActionsUnion | PortfolioApiActions.PortfolioApiActionsUnion
): State {
    switch (action.type) {
        case CompanyApiActions.searchSuccess.type:
        case PortfolioApiActions.loadCompaniesSuccess.type: {
            // TODO: remove this once the company selector is valid
            state.selectedCompanyId = action.companies[0].id;
            return adapter.addMany(action.companies, state);
        }

        case CompanyActions.loadCompany.type: {
            return adapter.addOne(action.company, state);
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedCompanyId;
