import { Action } from "@ngrx/store";

export enum LayoutActionTypes {
    ToggleSlideout = "[Layout] Toggle Slideout",
    SetSelectedPortfolioLink = "[Layout] Set Selected Portfolio Link",
    SetSelectedCompanyLink = "[Layout] Set Selected Company Link",
    ObserveUrlChange = "[Layout] Observe Url Change"
}

export class ObserveUrlChange implements Action {
    readonly type = LayoutActionTypes.ObserveUrlChange;

    constructor(public payload: string) {}
}

export class ToggleSlideout implements Action {
    readonly type = LayoutActionTypes.ToggleSlideout;

    constructor(public payload: boolean) {}
}

export class SetSelectedCompanyLink implements Action {
    readonly type = LayoutActionTypes.SetSelectedCompanyLink;

    constructor(public payload: string) {}
}
export class SetSelectedPortfolioLink implements Action {
    readonly type = LayoutActionTypes.SetSelectedPortfolioLink;

    constructor(public payload: string) {}
}

export type LayoutActions = ObserveUrlChange | SetSelectedCompanyLink | SetSelectedPortfolioLink | ToggleSlideout;
