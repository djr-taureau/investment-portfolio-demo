import { appRoutePaths } from "@app/app.routes";
import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import {
    portfolioDashboardFinancialsNavBarLink,
    portfolioDashboardInvestmentNavBarLink,
    PortfolioDashboardNavBarLink
} from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType, DatePartTypeEnum } from "@core/domain/enum/date-part-type.enum";
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
    collapsed: boolean;
    selectedCurrency: CurrencyType;
    selectedDatePart: DatePartType;
    selectedPeriod: SelectorPeriod;
    showRevenueDetail: boolean;
    showEbitdaDetail: boolean;
}

const initialState: State = {
    navLinks: [portfolioDashboardInvestmentNavBarLink, portfolioDashboardFinancialsNavBarLink],
    selectedNavLink: portfolioDashboardInvestmentNavBarLink,
    displayCurrencySelector: false,
    displayDateUnitSelector: false,
    displayHistoricalResults: false,
    displayProjectedResults: false,
    collapsed: true,
    selectedCurrency: CurrencyTypeEnum.USD,
    selectedDatePart: DatePartTypeEnum.QTR,
    selectedPeriod: null,
    showRevenueDetail: false,
    showEbitdaDetail: false
};

const displayFinancialControls = (link: PortfolioDashboardNavBarLink) => link.route === appRoutePaths.portfolioDashboardFinancials;

function toggleRevenueDetail(state: State = initialState): State {
    return {
        ...state,
        showRevenueDetail: !state.showRevenueDetail,
        showEbitdaDetail: false
    };
}

function toggleEbitdaDetail(state: State = initialState): State {
    return {
        ...state,
        showRevenueDetail: false,
        showEbitdaDetail: !state.showEbitdaDetail
    };
}

function toggleCashDetail(state: State = initialState): State {
    return {
        ...state,
        showRevenueDetail: false,
        showEbitdaDetail: false
    };
}

function toggleKpiDetail(state: State = initialState): State {
    return {
        ...state,
        showRevenueDetail: false,
        showEbitdaDetail: false
    };
}

function expandOrCollapse(state: State = initialState): State {
    return {
        ...state,
        collapsed: !state.collapsed
    };
}

function selectNavLink(selectedLink: PortfolioDashboardNavBarLink, state: State = initialState): State {
    return {
        ...state,
        selectedNavLink: selectedLink,
        displayDateUnitSelector: displayFinancialControls(selectedLink),
        displayHistoricalResults: displayFinancialControls(selectedLink)
        // displayProjectedResults: displayFinancialControls(selectedLink)
    };
}

export function reducer(state = initialState, action: PortfolioDashboardOverviewLayoutActions): State {
    switch (action.type) {
        case PortfolioDashboardOverviewLayoutActionTypes.SelectNavLink:
            return selectNavLink(action.payload, state);

        case PortfolioDashboardOverviewLayoutActionTypes.ExpandOrCollapse:
            return expandOrCollapse(state);
        case PortfolioDashboardOverviewLayoutActionTypes.SelectAsOfDate:
            return {
                ...state,
                selectedPeriod: action.payload
            };
        case PortfolioDashboardOverviewLayoutActionTypes.SelectCurrency:
            return {
                ...state,
                selectedCurrency: action.payload
            };
        case PortfolioDashboardOverviewLayoutActionTypes.SelectDatePart:
            return {
                ...state,
                selectedDatePart: action.payload
            };

        case PortfolioDashboardOverviewLayoutActionTypes.ToggleEbitdaDetailExpanded:
            return toggleEbitdaDetail(state);

        case PortfolioDashboardOverviewLayoutActionTypes.ToggleRevenueDetailExpanded:
            return toggleRevenueDetail(state);

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
export const getCollapsed = (state: State) => state.collapsed;
export const getSelectedCurrency = (state: State) => state.selectedCurrency;
export const getSelectedDatePart = (state: State) => state.selectedDatePart;
export const getSelectedPeriod = (state: State) => state.selectedPeriod;
export const getShowEBITDADetail = (state: State) => state.showEbitdaDetail;
export const getShowRevenueDetail = (state: State) => state.showRevenueDetail;
