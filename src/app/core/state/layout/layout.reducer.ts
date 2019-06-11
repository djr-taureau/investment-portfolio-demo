import { appRoutePaths } from "../../../app.routes";
import { NavigationBarLink } from "../../../shared/navigation-bar/navigation-bar-link";
import { LayoutActions, LayoutActionTypes } from "./layout.actions";

export interface LayoutState {
    showSlideout: boolean;
    selectedPortfolioNavLink: string;
    portfolioNavLinks: NavigationBarLink[];
}

export const initialState: LayoutState = {
    showSlideout: false,
    selectedPortfolioNavLink: appRoutePaths.portfolioListing,
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
        // {
        //     icon: "assets/image/finance.svg",
        //     label: "Financials",
        //     route: appRoutePaths.portfolioFinancials,
        //     enabled: true,
        //     showItemCount: false
        // },
        // {
        //     icon: "assets/image/documents.svg",
        //     label: "Documents",
        //     route: appRoutePaths.portfolioDocuments,
        //     enabled: true,
        //     showItemCount: true
        // }
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
    ]
};

function toggleSlideout(show: boolean, state: LayoutState = initialState): LayoutState {
    return {
        ...state,
        showSlideout: show
    };
}

function updateSelectedLinks(selectedLink: string, state: LayoutState = initialState): LayoutState {
    return {
        ...state,
        selectedPortfolioNavLink: selectedLink
    };
}

export function layoutReducer(state: LayoutState = initialState, action: LayoutActions): LayoutState {
    switch (action.type) {
        case LayoutActionTypes.ToggleSlideout:
            return toggleSlideout(action.payload, state);
        case LayoutActionTypes.SetSelectedPortfolioLink: {
            return updateSelectedLinks(action.payload, state);
        }
        default:
            return state;
    }
}

export const getShowSlideout = (state: LayoutState) => state.showSlideout;

export const getPortfolioNavLinks = (state: LayoutState) => state.portfolioNavLinks;

export const getSelectedPortfolioNavLink = (state: LayoutState) => state.selectedPortfolioNavLink;
