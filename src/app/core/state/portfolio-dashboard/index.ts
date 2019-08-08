import { getAllCompanies } from "@core/state";
import * as fromRoot from "@core/state";
import * as fromPortfolioDashboard from "@core/state/portfolio-dashboard/porfolio-dashboard.reducer";
import * as fromPortfolioDashboardOverviewLayout from "@core/state/portfolio-dashboard/porfolio-dashboard-overview-layout.reducer";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

///////////////////////////////////////////////////////////////////////////////////////////
// State Definition
///////////////////////////////////////////////////////////////////////////////////////////

// Define the combined state.
export interface PortfolioDashboardState {
    main: fromPortfolioDashboard.State;
    overviewLayout: fromPortfolioDashboardOverviewLayout.State;
}

// Extend the root app state with the context specific state defined here.
export interface State extends fromRoot.AppState {
    portfolioDashboard: PortfolioDashboardState;
}

// Define the combined reducers.
export const reducers: ActionReducerMap<PortfolioDashboardState> = {
    main: fromPortfolioDashboard.reducer,
    overviewLayout: fromPortfolioDashboardOverviewLayout.reducer
};

export const selectPortfolioDashboard = createFeatureSelector<PortfolioDashboardState>("portfolioDashboard");

///////////////////////////////////////////////////////////////////////////////////////////
// Main Selectors
///////////////////////////////////////////////////////////////////////////////////////////

export const selectPortfolioDashboardMainState = createSelector(
    selectPortfolioDashboard,
    (state: PortfolioDashboardState) => state.main
);

export const getSearchCompanyIds = createSelector(
    selectPortfolioDashboardMainState,
    fromPortfolioDashboard.getSearchResultIds
);

export const getSearchQuery = createSelector(
    selectPortfolioDashboardMainState,
    fromPortfolioDashboard.getSearchQuery
);

export const getSearchLoading = createSelector(
    selectPortfolioDashboardMainState,
    fromPortfolioDashboard.getSearching
);

export const getSearchError = createSelector(
    selectPortfolioDashboardMainState,
    fromPortfolioDashboard.getSearchError
);

export const getSearchResults = createSelector(
    getAllCompanies,
    getSearchCompanyIds,
    (companies, searchIds) => {
        return searchIds.map((id) => companies[id]);
    }
);

///////////////////////////////////////////////////////////////////////////////////////////
// Overview Layout Selectors
///////////////////////////////////////////////////////////////////////////////////////////

export const selectPortfolioDashboardOverviewLayoutState = createSelector(
    selectPortfolioDashboard,
    (state: PortfolioDashboardState) => state.overviewLayout
);

export const getOverviewNavLinks = createSelector(
    selectPortfolioDashboardOverviewLayoutState,
    fromPortfolioDashboardOverviewLayout.getNavLinks
);

export const getOverviewSelectedNavLink = createSelector(
    selectPortfolioDashboardOverviewLayoutState,
    fromPortfolioDashboardOverviewLayout.getSelectedNavLink
);

export const getDisplayCurrencySelector = createSelector(
    selectPortfolioDashboardOverviewLayoutState,
    fromPortfolioDashboardOverviewLayout.getDisplayCurrencySelector
);

export const getDisplayDateUnitSelector = createSelector(
    selectPortfolioDashboardOverviewLayoutState,
    fromPortfolioDashboardOverviewLayout.getDisplayDateUnitSelector
);

export const getDisplayHistoricalResults = createSelector(
    selectPortfolioDashboardOverviewLayoutState,
    fromPortfolioDashboardOverviewLayout.getDisplayHistoricalResults
);

export const getDisplayProjectedResults = createSelector(
    selectPortfolioDashboardOverviewLayoutState,
    fromPortfolioDashboardOverviewLayout.getDisplayProjectedResults
);
