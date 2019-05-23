import { Action } from "@ngrx/store";
import { appRoutePaths } from "../../../app.routes";

export enum RouterActionTypes {
    Go = "[Router] Go",
    Back = "[Router] Back",
    Forward = "[Router] Forward",

    // Specific routing to keep knowledge out of other components.
    GotoLogin = "[Router] GotoLogin",
    GotoRegister = "[Router] GotoRegister"
}

export class Go implements Action {
    readonly type = RouterActionTypes.Go;

    constructor(public payload: any) {}
}

export class Back implements Action {
    readonly type = RouterActionTypes.Back;

    constructor() {}
}

export class Forward implements Action {
    readonly type = RouterActionTypes.Forward;

    constructor() {}
}

export class GotoLogin implements Action {
    readonly type = RouterActionTypes.GotoLogin;
    readonly payload = { path: appRoutePaths.login };

    constructor() {}
}

export class GotoRegister implements Action {
    readonly type = RouterActionTypes.GotoRegister;
    readonly payload = { path: appRoutePaths.register };

    constructor() {}
}

// TODO: BMR: 05/07/2019: Make this actually work as right now these aren't being used.
export type RouterActions = Go | Back | Forward | GotoLogin | GotoRegister;
