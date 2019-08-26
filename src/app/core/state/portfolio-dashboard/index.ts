import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { CompanyTypeEnum } from "@core/domain/company.model";
import { Portfolio } from "@core/domain/portfolio.model";
import { getAllCompanies } from "@core/state";
import * as ObjectUtil from "@util/object.util";
import * as _ from "lodash";
import * as fromRoot from "@core/state";
import * as fromPortfolio from "@core/state/portfolio/porfolio.reducer";
import * as fromPortfolioCompanyList from "@core/state/portfolio-dashboard/company-list/porfolio-company-list.reducer";
import * as fromPortfolioDashboardOverviewLayout from "@core/state/portfolio-dashboard/porfolio-dashboard-overview-layout.reducer";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import moment from "moment";

///////////////////////////////////////////////////////////////////////////////////////////
// State Definition
///////////////////////////////////////////////////////////////////////////////////////////

// Define the combined state.
export interface PortfolioDashboardState {
    companyList: fromPortfolioCompanyList.State;
    overviewLayout: fromPortfolioDashboardOverviewLayout.State;
    portfolio: fromPortfolio.State;
}

// Extend the root app state with the context specific state defined here.
export interface State extends fromRoot.AppState {
    portfolioDashboard: PortfolioDashboardState;
}

// Define the combined reducers.
export const reducers: ActionReducerMap<PortfolioDashboardState> = {
    companyList: fromPortfolioCompanyList.reducer,
    overviewLayout: fromPortfolioDashboardOverviewLayout.reducer,
    portfolio: fromPortfolio.reducer
};

export const selectPortfolioDashboard = createFeatureSelector<PortfolioDashboardState>("portfolioDashboard");

///////////////////////////////////////////////////////////////////////////////////////////
// Company List Selectors
///////////////////////////////////////////////////////////////////////////////////////////

export const selectPortfolioDashboardCompanyListState = createSelector(
    selectPortfolioDashboard,
    (state: PortfolioDashboardState) => state.companyList
);

export const getSearchCompanyIds = createSelector(
    selectPortfolioDashboardCompanyListState,
    fromPortfolioCompanyList.getSearchResultIds
);

export const getSearchQuery = createSelector(
    selectPortfolioDashboardCompanyListState,
    fromPortfolioCompanyList.getSearchQuery
);

export const getSearchLoading = createSelector(
    selectPortfolioDashboardCompanyListState,
    fromPortfolioCompanyList.getSearching
);

export const getSearchError = createSelector(
    selectPortfolioDashboardCompanyListState,
    fromPortfolioCompanyList.getSearchError
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

export const getSelectedPeriod = createSelector(
    selectPortfolioDashboardOverviewLayoutState,
    fromPortfolioDashboardOverviewLayout.getSelectedPeriod
);

export const getSelectedDatePart = createSelector(
    selectPortfolioDashboardOverviewLayoutState,
    fromPortfolioDashboardOverviewLayout.getSelectedDatePart
);

export const getSelectedCurrency = createSelector(
    selectPortfolioDashboardOverviewLayoutState,
    fromPortfolioDashboardOverviewLayout.getSelectedCurrency
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

export const getPortfolioAvailablePeriods = createSelector(
    getPortfolio,
    (portfolio: Portfolio) => {
        let periods: any[] = ObjectUtil.getNestedPropIfExists(portfolio, ["funds", "0", "availablePeriods"], []);
        periods = periods.map((p: string) => {
            const asDate = new Date(p);
            const qtr = moment(asDate).quarter();
            return {
                date: p,
                id: asDate.getFullYear(),
                quarterLabel: "CQ" + String(qtr) + " " + asDate.getFullYear(),
                yearLabel: "CY " + asDate.getFullYear()
            } as SelectorPeriod;
        });
        return periods;
    }
);
