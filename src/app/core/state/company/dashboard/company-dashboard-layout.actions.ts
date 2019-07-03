import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { Action } from "@ngrx/store";

export enum CompanyDashboardLayoutActionTypes {
    ExpandOrCollapse = "[DashboardLayout] ExpandOrCollapse",
    SelectCurrency = "[DashboardLayout] Select Currency",
    SelectDatePart = "[DashboardLayout] Select Date Part",
    SelectAsOfDate = "[DashboardLayout] Select As Of Date"
}

export class ExpandOrCollapse implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.ExpandOrCollapse;

    constructor() {}
}

export class SelectCurrency implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.SelectCurrency;

    constructor(public payload: CurrencyType) {}
}

export class SelectDatePart implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.SelectDatePart;

    constructor(public payload: DatePartType) {}
}

export class SelectAsOfDate implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.SelectAsOfDate;

    constructor(public payload: SelectorPeriod) {}
}

export type CompanyDashboardLayoutActions = ExpandOrCollapse | SelectCurrency | SelectDatePart | SelectAsOfDate;
