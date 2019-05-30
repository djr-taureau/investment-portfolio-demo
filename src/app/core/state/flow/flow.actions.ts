import { Action } from "@ngrx/store";

export enum FlowActionTypes {
    GoToPortfolioListing = "[Flow] Go To Porfolio Listing",
    OpenCompanyInfoPanel = "[Flow] Open Company Info Panel",
    CloseCompanyInfoPanel = "[Flow] Close Company Info Panel"
}

export class CloseCompanyInfoPanel implements Action {
    readonly type = FlowActionTypes.CloseCompanyInfoPanel;

    constructor(public payload?: number) {}
}

export class GoToPortfolioListing implements Action {
    readonly type = FlowActionTypes.GoToPortfolioListing;

    constructor(public payload?: number) {}
}

export class OpenCompanyInfoPanel implements Action {
    readonly type = FlowActionTypes.OpenCompanyInfoPanel;

    constructor(public payload?: number) {}
}

export type FlowActions = CloseCompanyInfoPanel | GoToPortfolioListing | OpenCompanyInfoPanel;
