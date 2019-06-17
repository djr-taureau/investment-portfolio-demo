import { Action } from "@ngrx/store";
import { NavigationBarLink } from "@shared/navigation-bar/navigation-bar-link";

export enum FlowActionTypes {
    CloseCompanyInfoPanel = "[Flow] Close Company Info Panel",
    CollapseCompanyInfoSummaryPanel = "[Flow] Collapse Company Info Summary Panel",
    CompanyNavigationItemClicked = "[Flow] Company Navigation Item Clicked",
    ExpandCompanyInfoSummaryPanel = "[Flow] Expand Company Info Summary Panel",
    OpenCompanyInfoPanel = "[Flow] Open Company Info Panel",
    PortfolioNavigationItemClicked = "[Flow] Portfolio Navigation Item Clicked",
    SelectCompany = "[Flow] Select Company"
}

export class CloseCompanyInfoPanel implements Action {
    readonly type = FlowActionTypes.CloseCompanyInfoPanel;

    constructor(public payload?: string) {}
}

export class ExpandCompanyInfoSummaryPanel implements Action {
    readonly type = FlowActionTypes.ExpandCompanyInfoSummaryPanel;

    constructor(public payload?: string) {}
}

export class CollapseCompanyInfoSummaryPanel implements Action {
    readonly type = FlowActionTypes.CollapseCompanyInfoSummaryPanel;

    constructor(public payload?: string) {}
}

export class OpenCompanyInfoPanel implements Action {
    readonly type = FlowActionTypes.OpenCompanyInfoPanel;

    constructor(public payload?: string) {}
}

export class CompanyNavigationItemClicked implements Action {
    readonly type = FlowActionTypes.CompanyNavigationItemClicked;

    constructor(public payload: NavigationBarLink) {}
}

export class PortfolioNavigationItemClicked implements Action {
    readonly type = FlowActionTypes.PortfolioNavigationItemClicked;

    constructor(public payload: NavigationBarLink) {}
}
export class SelectCompany implements Action {
    readonly type = FlowActionTypes.SelectCompany;

    constructor(public payload: string) {}
}

export type FlowActions =
    | CloseCompanyInfoPanel
    | CollapseCompanyInfoSummaryPanel
    | CompanyNavigationItemClicked
    | ExpandCompanyInfoSummaryPanel
    | OpenCompanyInfoPanel
    | PortfolioNavigationItemClicked
    | SelectCompany;
