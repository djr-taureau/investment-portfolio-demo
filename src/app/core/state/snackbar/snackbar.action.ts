import { Action } from "@ngrx/store";

export enum SnackBarActionTypes {
    Open = "[SnackBar] Open",
    Close = "[SnackBar] Close"
}

export class Open implements Action {
    readonly type = SnackBarActionTypes.Open;
    constructor(public payload: string) {}
}

export class Close implements Action {
    readonly type = SnackBarActionTypes.Close;
    constructor() {}
}

export type SnackBarActions = Open | Close;
