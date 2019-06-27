import { Type } from "@angular/core";
import { appRoutePaths } from "../../../app.routes";
import { NavigationBarLink } from "@shared/navigation-bar/navigation-bar-link";
import { LayoutActions, LayoutActionTypes } from "./layout.actions";

export interface LayoutState {
    showSlideout: boolean;
    slideoutComponent: Type<any>;
    selectedPortfolioNavLink: string;
    selectedCompanyNavLink: string;
    portfolioNavLinks: NavigationBarLink[];
    companyNavLinks: NavigationBarLink[];
    currentUrl: string;
    showCompanyCombo: boolean;
}

export const initialState: LayoutState = {
    showSlideout: false,
    slideoutComponent: null,
    selectedPortfolioNavLink: appRoutePaths.portfolioListing,
    selectedCompanyNavLink: appRoutePaths.companyDashboard,
    portfolioNavLinks: [
        {
            icon: "assets/image/overview.svg",
            label: "Overview",
            route: appRoutePaths.portfolioDashboard,
            enabled: true,
            showItemCount: false
        },
        {
            icon: "assets/image/company.svg",
            label: "List of Companies",
            route: appRoutePaths.portfolioListing,
            enabled: true,
            showItemCount: false
        },
        {
            icon: "assets/image/map.svg",
            label: "Map View",
            route: appRoutePaths.portfolioMapView,
            enabled: false,
            showItemCount: false
        },
        {
            icon: "assets/image/calendar.svg",
            label: "Calendar View",
            route: appRoutePaths.portfolioCalendarView,
            enabled: false,
            showItemCount: false
        },
        {
            icon: "assets/image/initiatives.svg",
            label: "Initiatives",
            route: appRoutePaths.portfolioInitiatives,
            enabled: false,
            showItemCount: false
        }
    ],
    companyNavLinks: [
        {
            icon: "assets/image/overview.svg",
            label: "Overview",
            route: appRoutePaths.companyDashboard,
            enabled: true,
            showItemCount: false
        },
        {
            icon: "assets/image/finance.svg",
            label: "Financials",
            route: appRoutePaths.companyFinancials,
            enabled: true,
            showItemCount: false
        },
        {
            icon: "assets/image/valuation.svg",
            label: "Valuation",
            route: appRoutePaths.companyValuation,
            enabled: false,
            showItemCount: false
        },
        {
            icon: "assets/image/initiatives.svg",
            label: "Initiatives",
            route: appRoutePaths.companyInitiatives,
            enabled: false,
            showItemCount: true
        },
        {
            icon: "assets/image/notes.svg",
            label: "Notes",
            route: appRoutePaths.companyNotes,
            enabled: false,
            showItemCount: true
        },
        {
            icon: "assets/image/documents.svg",
            label: "Documents",
            route: appRoutePaths.companyDocuments,
            enabled: true,
            showItemCount: true
        }
    ],
    currentUrl: "",
    showCompanyCombo: false
};

function observeUrlChange(url: string, state: LayoutState = initialState): LayoutState {
    return {
        ...state,
        currentUrl: url,
        showCompanyCombo: url.indexOf("/portfolio-") === -1
    };
}

function toggleSlideout(show: boolean, component: Type<any>, state: LayoutState = initialState): LayoutState {
    return {
        ...state,
        showSlideout: show,
        slideoutComponent: component
    };
}

function updateSelectedPortfolioLinks(selectedLink: string, state: LayoutState = initialState): LayoutState {
    return {
        ...state,
        selectedPortfolioNavLink: selectedLink
    };
}
function updateSelectedCompanyLinks(selectedLink: string, state: LayoutState = initialState): LayoutState {
    return {
        ...state,
        selectedCompanyNavLink: selectedLink
    };
}

export function layoutReducer(state: LayoutState = initialState, action: LayoutActions): LayoutState {
    switch (action.type) {
        case LayoutActionTypes.ObserveUrlChange:
            return observeUrlChange(action.payload);

        case LayoutActionTypes.ToggleSlideout:
            return toggleSlideout(action.payload, action.component, state);

        case LayoutActionTypes.SetSelectedCompanyLink:
            return updateSelectedCompanyLinks(action.payload, state);

        case LayoutActionTypes.SetSelectedPortfolioLink:
            return updateSelectedPortfolioLinks(action.payload, state);

        default:
            return state;
    }
}

export const getShowSlideout = (state: LayoutState) => state.showSlideout;
export const getSlideoutComponent = (state: LayoutState) => state.slideoutComponent;

export const getPortfolioNavLinks = (state: LayoutState) => state.portfolioNavLinks;
export const getCompanyNavLinks = (state: LayoutState) => state.companyNavLinks;

export const getSelectedPortfolioNavLink = (state: LayoutState) => state.selectedPortfolioNavLink;
export const getSelectedCompanyyNavLink = (state: LayoutState) => state.selectedCompanyNavLink;
export const getShowCompanyCombo = (state: LayoutState) => state.showCompanyCombo;
