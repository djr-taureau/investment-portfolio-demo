import { Action } from "@ngrx/store";

export enum LayoutActionTypes {
    ToggleSlideout = "[Layout] Toggle Slideout"
}

export class ToggleSlideout implements Action {
    readonly type = LayoutActionTypes.ToggleSlideout;

    constructor(public payload: boolean) {}
}

export type LayoutActions = ToggleSlideout;
