import * as ObjectUtil from "@util/object.util";
import * as _ from "lodash";
import * as fromAuth from "./auth/auth.reducer";
import * as fromCompany from "./company/company.reducer";
import * as fromLayout from "./layout/layout.reducer";
import * as fromPortfolioDashboard from "./portfolio-dashboard/porfolio-dashboard.reducer";
import * as fromPortfolioListing from "./portfolio-list/portfolio-list.reducer";
import * as fromRouter from "@ngrx/router-store";
import * as TestUtil from "@util/test.util";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { Company } from "../domain/company.model";
import { RouterStateUrl } from "./router/custom-router-state.serializer";

export interface AppState {
    auth: fromAuth.AuthState;
    company: fromCompany.State;
    portfolioListing: fromPortfolioListing.State;
    layout: fromLayout.LayoutState;
    portfolioDashboard: fromPortfolioDashboard.State;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    company: fromCompany.reducer,
    portfolioListing: fromPortfolioListing.reducer,
    portfolioDashboard: fromPortfolioDashboard.reducer,
    layout: fromLayout.layoutReducer,
    router: fromRouter.routerReducer
};

// -------------------------------------------------------------------
// AUTH SELECTORS
// -------------------------------------------------------------------
export const selectAuthState = createFeatureSelector<fromAuth.AuthState>("auth");

export const getUsername = createSelector(
    selectAuthState,
    fromAuth.getUsername
);

export const getPassword = createSelector(
    selectAuthState,
    fromAuth.getPassword
);

export const getAccessToken = createSelector(
    selectAuthState,
    fromAuth.getAccessToken
);

export const getIdToken = createSelector(
    selectAuthState,
    fromAuth.getIdToken
);

export const getIsLoggedIn = createSelector(
    selectAuthState,
    fromAuth.getIsLoggedIn
);

export const getError = createSelector(
    selectAuthState,
    fromAuth.getError
);

export const getPending = createSelector(
    selectAuthState,
    fromAuth.getPending
);

export const getSuccess = createSelector(
    selectAuthState,
    fromAuth.getSuccess
);

// -------------------------------------------------------------------
// LAYOUT SELECTORS
// -------------------------------------------------------------------
export const selectLayoutState = createFeatureSelector<fromLayout.LayoutState>("layout");

export const getShowSlideout = createSelector(
    selectLayoutState,
    fromLayout.getShowSlideout
);

export const getSlideoutComponent = createSelector(
    selectLayoutState,
    fromLayout.getSlideoutComponent
);

export const getPortfolioNavLinks = createSelector(
    selectLayoutState,
    fromLayout.getPortfolioNavLinks
);

export const getSelectedPortfolioNavLink = createSelector(
    selectLayoutState,
    fromLayout.getSelectedPortfolioNavLink
);

export const getCompanyNavLinks = createSelector(
    selectLayoutState,
    fromLayout.getCompanyNavLinks
);

export const getSelectedCompanyNavLink = createSelector(
    selectLayoutState,
    fromLayout.getSelectedCompanyyNavLink
);

export const getShowCompanyCombo = createSelector(
    selectLayoutState,
    fromLayout.getShowCompanyCombo
);

// -------------------------------------------------------------------
// COMPANY SELECTORS
// -------------------------------------------------------------------
export const selectCompanyState = createFeatureSelector<fromCompany.State>("company");

export const {
    selectIds: getCompanyIds,
    selectEntities: getCompanyEntities,
    selectAll: getAllCompanies,
    selectTotal: getTotalCompanies
} = fromCompany.adapter.getSelectors(selectCompanyState);

function sortByValuation(e1: Company, e2: Company) {
    return e1.currentValuation - e2.currentValuation;
}

export const getSelectedCompanyId = createSelector(
    selectCompanyState,
    fromCompany.getSelectedId
);

export const getSelectedCompany = createSelector(
    getCompanyEntities,
    getSelectedCompanyId,
    (entities, selectedId) => {
        return (selectedId && entities[selectedId]) || TestUtil.getMock(TestUtil.getCompanyDefault);
    }
);

export const getCompanyTypes = createSelector(
    getAllCompanies,
    (allCompanies) => _.groupBy(allCompanies, "type")
);

export const getCompanySort = createSelector(
    selectCompanyState,
    fromCompany.getSortValue
);

export const getCompanySortOrder = createSelector(
    selectCompanyState,
    fromCompany.getSortOrder
);

export const getSelectedCompanyTakeaways = createSelector(
    getSelectedCompany,
    (company: Company) => (company ? company.takeaways : []) || []
);

export const getSelectedCompanyTakeawayDate = createSelector(
    getSelectedCompany,
    (company: Company) => (company ? company.takeawayDate : "") || ""
);

export const getSelectedCompanyCurrentValuation = createSelector(
    getSelectedCompany,
    (company: Company) => ObjectUtil.getNestedPropIfExists(company, ["valuation", "topLineValuations", "0", "current"], {})
);

export const getSelectedCompanyYearPlusOneValuation = createSelector(
    getSelectedCompany,
    (company: Company) => ObjectUtil.getNestedPropIfExists(company, ["valuation", "topLineValuations", "1", "year_plus_one"], {})
);

export const getSelectedCompanyYearExitValuation = createSelector(
    getSelectedCompany,
    (company: Company) => ObjectUtil.getNestedPropIfExists(company, ["valuation", "topLineValuations", "2", "exit"], {})
);

// -------------------------------------------------------------------
// PORTFOLIO LISTING SELECTORS
// -------------------------------------------------------------------
export const selectCompanyListingState = createFeatureSelector<fromPortfolioListing.State>("portfolioListing");

export const getCompanyCount = createSelector(
    selectCompanyListingState,
    fromPortfolioListing.getCompanyCount
);
export const getInvested = createSelector(
    selectCompanyListingState,
    fromPortfolioListing.getInvested
);
export const getTotalFund = createSelector(
    selectCompanyListingState,
    fromPortfolioListing.getTotalFund
);
export const getValuation = createSelector(
    selectCompanyListingState,
    fromPortfolioListing.getValuation
);
export const getMOIC = createSelector(
    selectCompanyListingState,
    fromPortfolioListing.getMOIC
);
export const getIRR = createSelector(
    selectCompanyListingState,
    fromPortfolioListing.getIRR
);

// --------------------------------------------------
// PORTFOLIO DASHBOARD: SEARCH SELECTORS
// --------------------------------------------------
export const getPortfolioDashboardState = createFeatureSelector<fromPortfolioDashboard.State>("portfolioDashboard");

export const getSearchCompanyIds = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getSearchResultIds
);

export const getSearchQuery = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getSearchQuery
);

export const getSearchLoading = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getSearching
);

export const getSearchError = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getSearchError
);

export const getSearchResults = createSelector(
    getAllCompanies,
    getSearchCompanyIds,
    (companies, searchIds) => {
        return searchIds.map((id) => companies[id]);
    }
);
// --------------------------------------------------
// PORTFOLIO DASHBOARD: VIEW SELECTORS
// --------------------------------------------------

export const getPortfolioLoaded = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getLoaded
);

export const getPortfolioLoading = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getLoading
);

export const getFilteredCompanies = createSelector(
    getAllCompanies,
    getSearchQuery,
    (allCompanies, searchQuery) => {
        // const allCompanies = Object.values(companiesState.entities);
        return allCompanies.filter((co) => co.name.toLowerCase().includes(searchQuery.toString().toLowerCase()));
    }
);

export const sortCompaniesValuation = createSelector(
    getAllCompanies,
    getCompanySort,
    (allCompanies) => {
        // const allCompanies = Object.values(companiesState.entities);
        allCompanies.sort(sortByValuation);
        return allCompanies;
    }
);
