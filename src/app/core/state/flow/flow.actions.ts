import { Action } from "@ngrx/store";
import { NavigationBarLink } from "@shared/navigation-bar/navigation-bar-link";
import { TeamMember } from "@app/core/domain/company.model";

export enum FlowActionTypes {
    OpenCompanyInfoPanel = "[Flow] Open Company Info Panel",
    CloseCompanyInfoPanel = "[Flow] Close Company Info Panel",

    OpenTakeawaysPanel = "[Flow] Open Takeaways Panel",
    CloseTakeawaysPanel = "[Flow] Close Takeaways Panel",

    OpenTeamMemberListPanel = "[Flow] Open Team Member List Panel",
    CloseTeamMemberListPanel = "[Flow] Close Team Member List Panel",

    OpenTeamMemberDetailPanel = "[Flow] Open Team Member Detail Panel",
    CloseTeamMemberDetailPanel = "[Flow] Close Team Member Detail Panel",

    ExpandCompanyInfoSummaryPanel = "[Flow] Expand Company Info Summary Panel",
    CollapseCompanyInfoSummaryPanel = "[Flow] Collapse Company Info Summary Panel",

    CompanyNavigationItemClicked = "[Flow] Company Navigation Item Clicked",

    LoadPortfolio = "[Flow] Load Portfolio",
    GoToPortfolio = "[Flow] Go To Portfolio",

    PortfolioNavigationItemClicked = "[Flow] Portfolio Navigation Item Clicked",
    SelectCompany = "[Flow] Select Company",
    FindCompanies = "[Flow] Find Companies"
}

export class OpenCompanyInfoPanel implements Action {
    readonly type = FlowActionTypes.OpenCompanyInfoPanel;

    constructor(public payload?: string) {}
}

export class CloseCompanyInfoPanel implements Action {
    readonly type = FlowActionTypes.CloseCompanyInfoPanel;

    constructor(public payload?: string) {}
}

export class OpenTakeawaysPanel implements Action {
    readonly type = FlowActionTypes.OpenTakeawaysPanel;

    constructor(public payload?: string) {}
}

export class CloseTakeawaysPanel implements Action {
    readonly type = FlowActionTypes.CloseTakeawaysPanel;

    constructor(public payload?: string) {}
}

export class CloseTeamMemberDetailPanel implements Action {
    readonly type = FlowActionTypes.CloseTeamMemberDetailPanel;

    constructor(public payload?: string) {}
}

export class CloseTeamMemberListPanel implements Action {
    readonly type = FlowActionTypes.CloseTeamMemberListPanel;

    constructor(public payload?: string) {}
}
export class CollapseCompanyInfoSummaryPanel implements Action {
    readonly type = FlowActionTypes.CollapseCompanyInfoSummaryPanel;

    constructor(public payload?: string) {}
}

export class CompanyNavigationItemClicked implements Action {
    readonly type = FlowActionTypes.CompanyNavigationItemClicked;

    constructor(public payload: NavigationBarLink) {}
}

export class ExpandCompanyInfoSummaryPanel implements Action {
    readonly type = FlowActionTypes.ExpandCompanyInfoSummaryPanel;

    constructor(public payload?: string) {}
}

export class FindCompanies implements Action {
    readonly type = FlowActionTypes.FindCompanies;

    constructor(public query: string) {}
}

export class GoToPortfolio implements Action {
    readonly type = FlowActionTypes.GoToPortfolio;

    constructor(public payload?: string) {}
}

export class LoadPortfolio implements Action {
    readonly type = FlowActionTypes.LoadPortfolio;

    constructor(public payload?: string) {}
}

export class OpenTeamMemberDetailPanel implements Action {
    readonly type = FlowActionTypes.OpenTeamMemberDetailPanel;

    constructor(public payload?: TeamMember) {}
}

export class OpenTeamMemberListPanel implements Action {
    readonly type = FlowActionTypes.OpenTeamMemberListPanel;

    constructor(public payload?: string) {}
}
export class PortfolioNavigationItemClicked implements Action {
    readonly type = FlowActionTypes.PortfolioNavigationItemClicked;

    constructor(public payload: NavigationBarLink) {}
}

export class SelectCompany implements Action {
    readonly type = FlowActionTypes.SelectCompany;

    constructor(public payload: number | string) {}
}

export type FlowActions =
    | OpenCompanyInfoPanel
    | CloseCompanyInfoPanel
    | OpenTakeawaysPanel
    | CloseTakeawaysPanel
    | OpenTeamMemberListPanel
    | CloseTeamMemberListPanel
    | OpenTeamMemberDetailPanel
    | CloseTeamMemberDetailPanel
    | CollapseCompanyInfoSummaryPanel
    | CompanyNavigationItemClicked
    | ExpandCompanyInfoSummaryPanel
    | FindCompanies
    | GoToPortfolio
    | LoadPortfolio
    | OpenCompanyInfoPanel
    | PortfolioNavigationItemClicked
    | SelectCompany;
