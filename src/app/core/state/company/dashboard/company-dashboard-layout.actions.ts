import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { ToggleEbitdaDetail } from "@core/state/flow/company-flow.actions";
import { Action } from "@ngrx/store";

export enum CompanyDashboardLayoutActionTypes {
    ExpandOrCollapse = "[DashboardLayout] ExpandOrCollapse",
    SelectCurrency = "[DashboardLayout] Select Currency",
    SelectDatePart = "[DashboardLayout] Select Date Part",
    SelectAsOfDate = "[DashboardLayout] Select As Of Date",
    ToggleEbitdaDetailExpanded = "[DashboardLayout] Toggle EBITDA Detail Expanded",
    ToggleCashDetailExpanded = "[DashboardLayout] Toggle Cash Detail Expanded",
    ToggleRevenueDetailExpanded = "[DashboardLayout] Toggle Revenue Detail Expanded",
    ToggleKpiExpanded = "[DashboardLayout] Toggle KPI Detail Expanded"
}

export class ExpandOrCollapse implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.ExpandOrCollapse;

    constructor() {}
}
export class SelectAsOfDate implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.SelectAsOfDate;

    constructor(public payload: SelectorPeriod) {}
}
export class SelectCurrency implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.SelectCurrency;

    constructor(public payload: CurrencyType) {}
}

export class SelectDatePart implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.SelectDatePart;

    constructor(public payload: DatePartType) {}
}

export class ToggleCashDetailExpanded implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.ToggleCashDetailExpanded;

    constructor() {}
}
export class ToggleEbitdaDetailExpanded implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.ToggleEbitdaDetailExpanded;

    constructor() {}
}
export class ToggleRevenueDetailExpanded implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.ToggleRevenueDetailExpanded;

    constructor() {}
}

export class ToggleKpiExpanded implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.ToggleKpiExpanded;

    constructor(public payload: string) {}
}

export type CompanyDashboardLayoutActions =
    | ExpandOrCollapse
    | SelectCurrency
    | SelectDatePart
    | SelectAsOfDate
    | ToggleCashDetailExpanded
    | ToggleEbitdaDetailExpanded
    | ToggleRevenueDetailExpanded
    | ToggleKpiExpanded;
