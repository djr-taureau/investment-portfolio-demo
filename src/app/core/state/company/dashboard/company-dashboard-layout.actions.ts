import { Action } from "@ngrx/store";

export enum CompanyDashboardLayoutActionTypes {
    ExpandOrCollapse = "[DashboardLayout] ExpandOrCollapse"
}

export class ExpandOrCollapse implements Action {
    readonly type = CompanyDashboardLayoutActionTypes.ExpandOrCollapse;

    constructor() {}
}

export type CompanyDashboardLayoutActions = ExpandOrCollapse;
