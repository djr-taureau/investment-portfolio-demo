import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "./auth/auth.reducer";
import { State } from "./portfolio-list/portfolio-list.reducer";
import { CustomRouterStateSerializer, RouterStateUrl } from "./router/custom-router-state.serializer";
import * as fromRouter from "@ngrx/router-store";
import * as fromLayout from "./layout/layout.reducer";
import * as fromPortfolioListing from "./portfolio-list/portfolio-list.reducer";
export interface AppState {
    auth: fromAuth.AuthState;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    layout: fromLayout.LayoutState;
    portfolioListing: fromPortfolioListing.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    router: fromRouter.routerReducer,
    layout: fromLayout.layoutReducer,
    portfolioListing: fromPortfolioListing.reducer
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
// PORTFOLIO LISTING SELECTORS
// -------------------------------------------------------------------
export const selectPortfolioListingState = createFeatureSelector<fromPortfolioListing.State>("portfolioListing");

export const getCompanyCount = createSelector(
    selectPortfolioListingState,
    fromPortfolioListing.getCompanyCount
);
export const getInvested = createSelector(
    selectPortfolioListingState,
    fromPortfolioListing.getInvested
);
export const getTotalFund = createSelector(
    selectPortfolioListingState,
    fromPortfolioListing.getTotalFund
);
export const getValuation = createSelector(
    selectPortfolioListingState,
    fromPortfolioListing.getValuation
);
export const getMOIC = createSelector(
    selectPortfolioListingState,
    fromPortfolioListing.getMOIC
);
export const getIRR = createSelector(
    selectPortfolioListingState,
    fromPortfolioListing.getIRR
);
