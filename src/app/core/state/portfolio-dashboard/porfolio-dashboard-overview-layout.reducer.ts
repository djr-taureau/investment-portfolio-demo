import { appRoutePaths } from "@app/app.routes";
import {
    portfolioDashboardFinancialsNavBarLink,
    portfolioDashboardInvestmentNavBarLink,
    PortfolioDashboardNavBarLink
} from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import {
    PortfolioDashboardOverviewLayoutActions,
    PortfolioDashboardOverviewLayoutActionTypes
} from "@core/state/portfolio-dashboard/portfolio-dashboard-overview-layout.actions";

export interface State {
    navLinks: PortfolioDashboardNavBarLink[];
    selectedNavLink: PortfolioDashboardNavBarLink;
    displayCurrencySelector: boolean;
    displayDateUnitSelector: boolean;
    displayHistoricalResults: boolean;
    displayProjectedResults: boolean;
}

const initialState: State = {
    navLinks: [portfolioDashboardInvestmentNavBarLink, portfolioDashboardFinancialsNavBarLink],
    selectedNavLink: portfolioDashboardInvestmentNavBarLink,
    displayCurrencySelector: false,
    displayDateUnitSelector: false,
    displayHistoricalResults: false,
    displayProjectedResults: false
};

const displayFinancialControls = (link: PortfolioDashboardNavBarLink) => link.route === appRoutePaths.portfolioDashboardFinancials;

function selectNavLink(selectedLink: PortfolioDashboardNavBarLink, state: State = initialState): State {
    return {
        ...state,
        selectedNavLink: selectedLink,
        displayDateUnitSelector: displayFinancialControls(selectedLink),
        displayHistoricalResults: displayFinancialControls(selectedLink),
        displayProjectedResults: displayFinancialControls(selectedLink)
    };
}

export function reducer(state = initialState, action: PortfolioDashboardOverviewLayoutActions): State {
    switch (action.type) {
        case PortfolioDashboardOverviewLayoutActionTypes.SelectNavLink:
            return selectNavLink(action.payload, state);

        default: {
            return state;
        }
    }
}

export const getNavLinks = (state: State) => state.navLinks;
export const getSelectedNavLink = (state: State) => state.selectedNavLink;
export const getDisplayCurrencySelector = (state: State) => state.displayCurrencySelector;
export const getDisplayDateUnitSelector = (state: State) => state.displayDateUnitSelector;
export const getDisplayHistoricalResults = (state: State) => state.displayHistoricalResults;
export const getDisplayProjectedResults = (state: State) => state.displayProjectedResults;
