import { Action } from "@ngrx/store";
import { NavigationBarLink } from "../../../shared/navigation-bar/navigation-bar-link";

export enum LayoutActionTypes {
    ToggleSlideout = "[Layout] Toggle Slideout",
    SetSelectedPortfolioLink = "[Layout] Set Selected Portfolio Link"
}

export class ToggleSlideout implements Action {
    readonly type = LayoutActionTypes.ToggleSlideout;

    constructor(public payload: boolean) {}
}
export class SetSelectedPortfolioLink implements Action {
    readonly type = LayoutActionTypes.SetSelectedPortfolioLink;

    constructor(public payload: string) {}
}

export type LayoutActions = SetSelectedPortfolioLink | ToggleSlideout;
