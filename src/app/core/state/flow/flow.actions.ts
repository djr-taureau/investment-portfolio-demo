import { Action } from "@ngrx/store";
import { NavigationBarLink } from "../../../shared/navigation-bar/navigation-bar-link";

export enum FlowActionTypes {
    PortfolioNavigationItemClicked = "[Flow] Portfolio Navigation Item Clicked",
    // GoToPortfolioListing = "[Flow] Go To Porfolio Listing",
    OpenCompanyInfoPanel = "[Flow] Open Company Info Panel",
    CloseCompanyInfoPanel = "[Flow] Close Company Info Panel"
}

export class CloseCompanyInfoPanel implements Action {
    readonly type = FlowActionTypes.CloseCompanyInfoPanel;

    constructor(public payload?: number) {}
}

// export class GoToPortfolioListing implements Action {
//     readonly type = FlowActionTypes.GoToPortfolioListing;
//
//     constructor(public payload?: number) {}
// }

export class OpenCompanyInfoPanel implements Action {
    readonly type = FlowActionTypes.OpenCompanyInfoPanel;

    constructor(public payload?: number) {}
}

export class PortfolioNavigationItemClicked implements Action {
    readonly type = FlowActionTypes.PortfolioNavigationItemClicked;

    constructor(public payload: NavigationBarLink) {}
}

export type FlowActions = CloseCompanyInfoPanel | OpenCompanyInfoPanel | PortfolioNavigationItemClicked;
