import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { Action } from "@ngrx/store";
import { NavigationBarLink } from "@shared/navigation-bar/navigation-bar-link";

export enum CompanyFlowActionTypes {
    OpenCompanyInfoPanel = "[Company Flow] Open Company Info Panel",
    CloseCompanyInfoPanel = "[Company Flow] Close Company Info Panel",

    OpenTakeawaysPanel = "[Company Flow] Open Takeaways Panel",
    CloseTakeawaysPanel = "[Company Flow] Close Takeaways Panel",

    ExpandCompanyInfoSummaryPanel = "[Company Flow] Expand Company Info Summary Panel",
    CollapseCompanyInfoSummaryPanel = "[Company Flow] Collapse Company Info Summary Panel",

    CompanyNavigationItemClicked = "[Company Flow] Company Navigation Item Clicked",

    DashboardCurrencyChanged = "[Company Flow] Dashboard - Currency Changed",
    DashboardDatePartChanged = "[Company Flow] Dashboard - Date Part Changed",
    DashboardAsOfDateChanged = "[Company Flow] Dashboard - As of Date Changed",

    ToggleRevenueDetail = "[Company Flow] Dashboard - Toggle Revenue Detail",
    ToggleEBITDADetail = "[Company Flow] Dashboard - Toggle EBITDA Detail",
    ToggleCashBurnDetail = "[Company Flow] Dashboard - Toggle CashBurn Detail",
    ToggleKPIDetail = "[Company Flow] Dashboard - Toggle KPI Detail"
}

export class CloseCompanyInfoPanel implements Action {
    readonly type = CompanyFlowActionTypes.CloseCompanyInfoPanel;

    constructor(public payload?: string) {}
}

export class CloseTakeawaysPanel implements Action {
    readonly type = CompanyFlowActionTypes.CloseTakeawaysPanel;

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

export class DashboardCurrencyChanged implements Action {
    readonly type = CompanyFlowActionTypes.DashboardCurrencyChanged;
    constructor(public payload: CurrencyType) {}
}

export class DashboardDatePartChanged implements Action {
    readonly type = CompanyFlowActionTypes.DashboardDatePartChanged;
    constructor(public payload: DatePartType) {}
}

export class DashboardAsOfDateChanged implements Action {
    readonly type = CompanyFlowActionTypes.DashboardAsOfDateChanged;
    constructor(public payload: SelectorPeriod) {}
}

export class ExpandCompanyInfoSummaryPanel implements Action {
    readonly type = CompanyFlowActionTypes.ExpandCompanyInfoSummaryPanel;

    constructor(public payload?: string) {}
}
export class OpenCompanyInfoPanel implements Action {
    readonly type = CompanyFlowActionTypes.OpenCompanyInfoPanel;

    constructor(public payload?: string) {}
}

export class OpenTakeawaysPanel implements Action {
    readonly type = CompanyFlowActionTypes.OpenTakeawaysPanel;

    constructor(public payload?: string) {}
}

export type CompanyFlowActions =
    | CloseCompanyInfoPanel
    | CloseTakeawaysPanel
    | CollapseCompanyInfoSummaryPanel
    | DashboardCurrencyChanged
    | DashboardDatePartChanged
    | DashboardAsOfDateChanged
    | CompanyNavigationItemClicked
    | ExpandCompanyInfoSummaryPanel
    | OpenCompanyInfoPanel
    | OpenTakeawaysPanel;
