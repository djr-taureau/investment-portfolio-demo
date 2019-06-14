import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "./auth/auth.reducer";
import { State } from "./portfolio-list/portfolio-list.reducer";
import { CustomRouterStateSerializer, RouterStateUrl } from "./router/custom-router-state.serializer";
import * as fromCompany from "./company/company.reducer";
import * as fromRouter from "@ngrx/router-store";
import * as fromLayout from "./layout/layout.reducer";
import * as fromPortfolioListing from "./portfolio-list/portfolio-list.reducer";
export interface AppState {
    auth: fromAuth.AuthState;
    company: fromCompany.State;
    companyListing: fromPortfolioListing.State;
    layout: fromLayout.LayoutState;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    company: fromCompany.reducer,
    companyListing: fromPortfolioListing.reducer,
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

export const getPortfolioNavLinks = createSelector(
    selectLayoutState,
    fromLayout.getPortfolioNavLinks
);

export const getSelectedPortfolioNavLink = createSelector(
    selectLayoutState,
    fromLayout.getSelectedPortfolioNavLink
);

// -------------------------------------------------------------------
// COMPANY SELECTORS
// -------------------------------------------------------------------
export const selectCompanyState = createFeatureSelector<fromCompany.State>("company");

export const getSelectedCompanyId = createSelector(
    selectCompanyState,
    fromCompany.getSelectedId
);

export const getAllCompanies = createSelector(
    selectCompanyState,
    fromCompany.adapter.getSelectors(selectCompanyState).selectAll
);

export const getCompanyTypes = createSelector(
    getAllCompanies,
    (allCompanies) => _.groupBy(allCompanies, "type")
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
// PORTFOLIO LISTING SELECTORS
// -------------------------------------------------------------------
export const selectCompanyListingState = createFeatureSelector<fromPortfolioListing.State>("companyListing");

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
