import { CompanyTypeEnum } from "@core/domain/company.model";
import { getAllCompanies } from "@core/state";
import * as _ from "lodash";
import * as fromRoot from "@core/state";
import * as fromPortfolio from "@core/state/portfolio/porfolio.reducer";
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
    portfolio: fromPortfolio.State;
}

// Extend the root app state with the context specific state defined here.
export interface State extends fromRoot.AppState {
    portfolioDashboard: PortfolioDashboardState;
}

// Define the combined reducers.
export const reducers: ActionReducerMap<PortfolioDashboardState> = {
    main: fromPortfolioDashboard.reducer,
    overviewLayout: fromPortfolioDashboardOverviewLayout.reducer,
    portfolio: fromPortfolio.reducer
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

///////////////////////////////////////////////////////////////////////////////////////////
// Portfolio Selectors
///////////////////////////////////////////////////////////////////////////////////////////
// export const selectPortfolio = createFeatureSelector<fromPortfolio.State>("Portfolio");

export const selectPortfolioState = createSelector(
    selectPortfolioDashboard,
    (state: PortfolioDashboardState) => state.portfolio
);

export const getPortfolio = createSelector(
    selectPortfolioState,
    fromPortfolio.getPortfolio
);

export const getInvestmentSummary = createSelector(
    selectPortfolioState,
    fromPortfolio.getInvestmentSummary
);

export const getInvestmentSummaryMOIC = createSelector(
    getInvestmentSummary,
    (investmentSummary) => _.get(investmentSummary, "moic", -1)
);

export const getInvestmentSummaryGrossIRR = createSelector(
    getInvestmentSummary,
    (investmentSummary) => _.get(investmentSummary, "grossIrr", -1)
);

export const getInvestmentSummaryApproved = createSelector(
    getInvestmentSummary,
    (investmentSummary) => _.get(investmentSummary, "approved", -1)
);

export const getInvestmentSummaryJV = createSelector(
    getInvestmentSummary,
    (investmentSummary) => _.get(investmentSummary, "jv", -1)
);

export const getInvestmentSummaryPublic = createSelector(
    getInvestmentSummary,
    (investmentSummary) => _.get(investmentSummary, "public", -1)
);

export const getInvestmentSummaryPrivate = createSelector(
    getInvestmentSummary,
    (investmentSummary) => _.get(investmentSummary, "private", -1)
);

export const getInvestmentSummaryExited = createSelector(
    getInvestmentSummary,
    (investmentSummary) => _.get(investmentSummary, "exited", -1)
);

export const getInvestmentSummaryTotalFund = createSelector(
    getInvestmentSummary,
    (investmentSummary) => _.get(investmentSummary, "totalFund", -1)
);

export const getInvestmentSummaryTotalValue = createSelector(
    getInvestmentSummary,
    (investmentSummary) => _.get(investmentSummary, "totalValue", -1)
);

export const getInvestmentSummaryInvested = createSelector(
    getInvestmentSummary,
    (investmentSummary) => _.get(investmentSummary, "invested", -1)
);

export const getInvestmentSummaryCompanyCount = createSelector(
    getInvestmentSummaryPublic,
    getInvestmentSummaryPrivate,
    getInvestmentSummaryExited,
    getInvestmentSummaryJV,
    (pub, prv, exited, jv) => {
        return pub + prv + jv + exited;
    }
);

export const getInvestmentSummaryCountsByType = createSelector(
    getInvestmentSummaryPublic,
    getInvestmentSummaryPrivate,
    getInvestmentSummaryExited,
    getInvestmentSummaryJV,
    (pub, prv, exited, jv) => {
        const result = [
            { value: pub, name: CompanyTypeEnum.PUBLIC.toLowerCase(), color: "#124f8c" },
            { value: prv, name: CompanyTypeEnum.PRIVATE.toLowerCase(), color: "#47a2d6" },
            { value: jv, name: CompanyTypeEnum.JOINT_VENTURE.toLowerCase(), color: "#1d2759" },
            { value: exited, name: CompanyTypeEnum.EXITED.toLowerCase(), color: "#dbe3f1" }
        ];
        return result;
    }
);
