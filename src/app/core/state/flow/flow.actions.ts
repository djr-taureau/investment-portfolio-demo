import { Action } from "@ngrx/store";

export enum FlowActionTypes {
    OpenCompanyInfoPanel = "[Flow] Open Company Info Panel",
    CloseCompanyInfoPanel = "[Flow] Close Company Info Panel"
}

export class OpenCompanyInfoPanel implements Action {
    readonly type = FlowActionTypes.OpenCompanyInfoPanel;

    constructor(public payload?: number) {}
}

export class CloseCompanyInfoPanel implements Action {
    readonly type = FlowActionTypes.CloseCompanyInfoPanel;

    constructor(public payload?: number) {}
}

export type FlowActions = CloseCompanyInfoPanel | OpenCompanyInfoPanel;
