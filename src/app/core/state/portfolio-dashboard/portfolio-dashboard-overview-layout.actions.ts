import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { PortfolioDashboardNavBarLink } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { Action } from "@ngrx/store";

export enum PortfolioDashboardOverviewLayoutActionTypes {
    SelectNavLink = "[Portfolio Dashboard Overview Layout Action] SelectNavLink",
    ExpandOrCollapse = "[Portfolio Dashboard Overview Layout Action] ExpandOrCollapse",
    SelectCurrency = "[Portfolio Dashboard Overview Layout Action] Select Currency",
    SelectDatePart = "[Portfolio Dashboard Overview Layout Action] Select Date Part",
    SelectAsOfDate = "[Portfolio Dashboard Overview Layout Action] Select As Of Date",
    ToggleEbitdaDetailExpanded = "[Portfolio Dashboard Overview Layout Action] Toggle EBITDA Detail Expanded",
    ToggleCashDetailExpanded = "[Portfolio Dashboard Overview Layout Action] Toggle Cash Detail Expanded",
    ToggleRevenueDetailExpanded = "[Portfolio Dashboard Overview Layout Action] Toggle Revenue Detail Expanded",
    ToggleKpiExpanded = "[Portfolio Dashboard Overview Layout Action] Toggle KPI Detail Expanded"
}

export class SelectNavLink implements Action {
    readonly type = PortfolioDashboardOverviewLayoutActionTypes.SelectNavLink;
    constructor(public payload: PortfolioDashboardNavBarLink) {}
}

export class ExpandOrCollapse implements Action {
    readonly type = PortfolioDashboardOverviewLayoutActionTypes.ExpandOrCollapse;

    constructor() {}
}
export class SelectAsOfDate implements Action {
    readonly type = PortfolioDashboardOverviewLayoutActionTypes.SelectAsOfDate;

    constructor(public payload: SelectorPeriod) {}
}
export class SelectCurrency implements Action {
    readonly type = PortfolioDashboardOverviewLayoutActionTypes.SelectCurrency;

    constructor(public payload: CurrencyType) {}
}

export class SelectDatePart implements Action {
    readonly type = PortfolioDashboardOverviewLayoutActionTypes.SelectDatePart;

    constructor(public payload: DatePartType) {}
}

export class ToggleCashDetailExpanded implements Action {
    readonly type = PortfolioDashboardOverviewLayoutActionTypes.ToggleCashDetailExpanded;

    constructor() {}
}
export class ToggleEbitdaDetailExpanded implements Action {
    readonly type = PortfolioDashboardOverviewLayoutActionTypes.ToggleEbitdaDetailExpanded;

    constructor() {}
}
export class ToggleRevenueDetailExpanded implements Action {
    readonly type = PortfolioDashboardOverviewLayoutActionTypes.ToggleRevenueDetailExpanded;

    constructor() {}
}

export type PortfolioDashboardOverviewLayoutActions =
    | SelectNavLink
    | ExpandOrCollapse
    | SelectCurrency
    | SelectDatePart
    | SelectAsOfDate
    | ToggleEbitdaDetailExpanded
    | ToggleRevenueDetailExpanded;
