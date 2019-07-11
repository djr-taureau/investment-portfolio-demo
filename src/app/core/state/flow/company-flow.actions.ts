import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { TeamMember } from "@core/domain/company.model";
import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { Action } from "@ngrx/store";
import { NavigationBarLink } from "@shared/navigation-bar/navigation-bar-link";

export enum CompanyFlowActionTypes {
    OpenCompanyInfoPanel = "[Company Flow] Open Company Info Panel",
    CloseCompanyInfoPanel = "[Company Flow] Close Company Info Panel",

    OpenTakeawaysPanel = "[Company Flow] Open Takeaways Panel",
    CloseTakeawaysPanel = "[Company Flow] Close Takeaways Panel",

    OpenTeamMemberListPanel = "[Flow] Open Team Member List Panel",
    CloseTeamMemberListPanel = "[Flow] Close Team Member List Panel",

    OpenTeamMemberDetailPanel = "[Flow] Open Team Member Detail Panel",
    CloseTeamMemberDetailPanel = "[Flow] Close Team Member Detail Panel",

    ExpandCompanyInfoSummaryPanel = "[Company Flow] Expand Company Info Summary Panel",
    CollapseCompanyInfoSummaryPanel = "[Company Flow] Collapse Company Info Summary Panel",

    CompanyNavigationItemClicked = "[Company Flow] Company Navigation Item Clicked",

    DashboardCurrencyChanged = "[Company Flow] Dashboard - Currency Changed",
    DashboardDatePartChanged = "[Company Flow] Dashboard - Date Part Changed",
    DashboardAsOfDateChanged = "[Company Flow] Dashboard - As of Date Changed",

    ToggleRevenueDetail = "[Company Flow] Dashboard - Toggle Revenue Detail",
    ToggleEBITDADetail = "[Company Flow] Dashboard - Toggle EBITDA Detail",
    ToggleCashBurnDetail = "[Company Flow] Dashboard - Toggle CashBurn Detail",
    ToggleKPIDetail = "[Company Flow] Dashboard - Toggle KPI Detail",

    SelectCompany = "[Flow] Select Company",
    FindCompanies = "[Flow] Find Companies"
}

export class CloseCompanyInfoPanel implements Action {
    readonly type = CompanyFlowActionTypes.CloseCompanyInfoPanel;

    constructor(public payload?: string) {}
}

export class CloseTakeawaysPanel implements Action {
    readonly type = CompanyFlowActionTypes.CloseTakeawaysPanel;

    constructor(public payload?: string) {}
}

export class CloseTeamMemberDetailPanel implements Action {
    readonly type = CompanyFlowActionTypes.CloseTeamMemberDetailPanel;

    constructor(public payload?: string) {}
}

export class CloseTeamMemberListPanel implements Action {
    readonly type = CompanyFlowActionTypes.CloseTeamMemberListPanel;

    constructor(public payload?: string) {}
}

export class CollapseCompanyInfoSummaryPanel implements Action {
    readonly type = CompanyFlowActionTypes.CollapseCompanyInfoSummaryPanel;

    constructor(public payload?: string) {}
}

export class CompanyNavigationItemClicked implements Action {
    readonly type = CompanyFlowActionTypes.CompanyNavigationItemClicked;

    constructor(public payload: NavigationBarLink) {}
}

export class DashboardAsOfDateChanged implements Action {
    readonly type = CompanyFlowActionTypes.DashboardAsOfDateChanged;
    constructor(public payload: SelectorPeriod) {}
}

export class DashboardCurrencyChanged implements Action {
    readonly type = CompanyFlowActionTypes.DashboardCurrencyChanged;
    constructor(public payload: CurrencyType) {}
}

export class DashboardDatePartChanged implements Action {
    readonly type = CompanyFlowActionTypes.DashboardDatePartChanged;
    constructor(public payload: DatePartType) {}
}

export class ExpandCompanyInfoSummaryPanel implements Action {
    readonly type = CompanyFlowActionTypes.ExpandCompanyInfoSummaryPanel;

    constructor(public payload?: string) {}
}

export class FindCompanies implements Action {
    readonly type = CompanyFlowActionTypes.FindCompanies;

    constructor(public query: string) {}
}

export class OpenCompanyInfoPanel implements Action {
    readonly type = CompanyFlowActionTypes.OpenCompanyInfoPanel;

    constructor(public payload?: string) {}
}

export class OpenTakeawaysPanel implements Action {
    readonly type = CompanyFlowActionTypes.OpenTakeawaysPanel;

    constructor(public payload?: string) {}
}

export class OpenTeamMemberDetailPanel implements Action {
    readonly type = CompanyFlowActionTypes.OpenTeamMemberDetailPanel;

    constructor(public payload?: TeamMember) {}
}

export class OpenTeamMemberListPanel implements Action {
    readonly type = CompanyFlowActionTypes.OpenTeamMemberListPanel;

    constructor(public payload?: string) {}
}

export class SelectCompany implements Action {
    readonly type = CompanyFlowActionTypes.SelectCompany;

    constructor(public payload: string) {}
}

export type CompanyFlowActions =
    | CloseCompanyInfoPanel
    | CloseTakeawaysPanel
    | CloseTeamMemberDetailPanel
    | CloseTeamMemberListPanel
    | CollapseCompanyInfoSummaryPanel
    | DashboardCurrencyChanged
    | DashboardDatePartChanged
    | DashboardAsOfDateChanged
    | CompanyNavigationItemClicked
    | ExpandCompanyInfoSummaryPanel
    | FindCompanies
    | OpenCompanyInfoPanel
    | OpenTakeawaysPanel
    | OpenTeamMemberDetailPanel
    | OpenTeamMemberListPanel
    | SelectCompany;
