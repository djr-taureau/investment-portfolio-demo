import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import * as fromCompanies from "./portfolio-company/portfolio-company.reducer";
import * as fromPortfolio from "./porfolio.reducer";
import * as fromSearch from "./search/search.reducer";
import * as fromRoot from "../index";

export interface CompaniesState {
    search: fromSearch.State;
    companies: fromCompanies.State;
    portfolio: fromPortfolio.State;
}

export interface State extends fromRoot.AppState {
    companies: CompaniesState;
}

export const reducers: ActionReducerMap<CompaniesState, any> = {
    search: fromSearch.reducer,
    companies: fromCompanies.reducer,
    portfolio: fromPortfolio.reducer
};

export const getDashboardState = createFeatureSelector<State, CompaniesState>("companies");

export const getCompanyEntitiesState = createSelector(
    getDashboardState,
    (state) => state.companies
);

export const getSelectedCompanyId = createSelector(
    getCompanyEntitiesState,
    fromCompanies.getSelectedId
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
export const getPorfolioLoading = createSelector(
    getPortfolioState,
    fromPortfolio.getLoading
);
export const getPortfolioCompanyIds = createSelector(
    getPortfolioState,
    fromPortfolio.getIds
);

export const getPortfolioCompanies = createSelector(
    getCompanyEntities,
    getPortfolioCompanyIds,
    (entities, ids) => {
        return ids.map((id) => entities[id]);
    }
);
