import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import * as fromCompanies from "../company/company.reducer";
import * as fromPortfolio from "./porfolio.reducer";
import * as fromSearch from "./search/search.reducer";
import * as fromRoot from "../index";
import { Company } from "@core/domain/company.model";

function sortByValuation(e1: Company, e2: Company) {
    return e1.currentValuation - e2.currentValuation;
}
export interface CompaniesState {
    search: fromSearch.State;
    companies: fromCompanies.State;
    portfolio: fromPortfolio.State;
}

export interface State extends fromRoot.AppState {
    portfolio: CompaniesState;
}

export const reducers: ActionReducerMap<CompaniesState, any> = {
    search: fromSearch.reducer,
    companies: fromCompanies.reducer,
    portfolio: fromPortfolio.reducer
};

export const getDashboardState = createFeatureSelector<State, CompaniesState>("portfolio");

export const getCompanyEntitiesState = createSelector(
    getDashboardState,
    (state) => state.companies
);

export const getSelectedCompanyId = createSelector(
    getCompanyEntitiesState,
    fromCompanies.getSelectedId
);

export const getCompanySort = createSelector(
    getCompanyEntitiesState,
    fromCompanies.getSortValue
);

export const getCompanySortOrder = createSelector(
    getCompanyEntitiesState,
    fromCompanies.getSortOrder
);

export const {
    selectIds: getCompanyIds,
    selectEntities: getCompanyEntities,
    selectAll: getAllCompanies,
    selectTotal: getTotalCompanies
} = fromCompanies.adapter.getSelectors(getCompanyEntitiesState);

export const getSelectedCompany = createSelector(
    getCompanyEntities,
    getSelectedCompanyId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);

export const getSearchState = createSelector(
    getDashboardState,
    (state: CompaniesState) => state.search
);

export const getSearchCompanyIds = createSelector(
    getSearchState,
    fromSearch.getIds
);

export const getSearchQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);

export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading
);

export const getSearchError = createSelector(
    getSearchState,
    fromSearch.getError
);

export const getSearchResults = createSelector(
    getCompanyEntities,
    getSearchCompanyIds,
    (companies, searchIds) => {
        return searchIds.map((id) => companies[id]);
    }
);

export const getPortfolioState = createSelector(
    getDashboardState,
    (state: CompaniesState) => state.portfolio
);

export const getPortfolioLoaded = createSelector(
    getPortfolioState,
    fromPortfolio.getLoaded
);

export const getPortfolioLoading = createSelector(
    getPortfolioState,
    fromPortfolio.getLoading
);

export const getPortfolioCompanyIds = createSelector(
    getPortfolioState,
    fromPortfolio.getIds
);

export const getMocks = createSelector(
    getPortfolioState,
    fromPortfolio.getMocks
);

export const getPortfolioCompanies = createSelector(
    getCompanyEntities,
    getPortfolioCompanyIds,
    (entities, ids) => {
        return ids.map((id) => entities[id]);
    }
);

export const getFilteredCompanies = createSelector(
    getPortfolioCompanies,
    getSearchQuery,
    (companies, searchQuery) => {
        return companies.filter((co) => co.name.toLowerCase().includes(searchQuery.toString().toLowerCase()));
    }
);

export const sortCompaniesValuation = createSelector(
    getCompanyEntities,
    getCompanySort,
    (companiesState) => {
        const allCompanies = Object.values(companiesState.entities);
        allCompanies.sort(sortByValuation);
        return allCompanies;
    }
);
