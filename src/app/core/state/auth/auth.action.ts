import { Action } from "@ngrx/store";
import { Auth } from "@core/domain/auth.model";

export enum AuthActionTypes {
    Login = "[Auth] Login",
    LoginPending = "[Auth] LoginPending",
    LoginSuccess = "[Auth] LoginSuccess",
    LoginFault = "[Auth] LoginFault",

    Logout = "[Auth] Logout",
    LogoutPending = "[Auth] LogoutPending",
    LogoutSuccess = "[Auth] LogoutSuccess",
    LogoutFault = "[Auth] LogoutFault",

    NavigateToLogin = "[Auth] NavigateToLogin",

    Reset = "[Auth] Reset",
    ResetAuthError = "[Auth] ResetAuthError",
    ResetPending = "[Auth] ResetPending",
    RestartApp = "[Auth] RestartApp"
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;

    constructor() {}
}

export class LoginPending implements Action {
    readonly type = AuthActionTypes.LoginPending;

    constructor() {}
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: Auth) {}
}

export class LoginFault implements Action {
    readonly type = AuthActionTypes.LoginFault;

    constructor(public payload: string) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;

    constructor() {}
}

export class LogoutPending implements Action {
    readonly type = AuthActionTypes.LogoutPending;

    constructor() {}
}

export class LogoutSuccess implements Action {
    readonly type = AuthActionTypes.LogoutSuccess;

    constructor() {}
}

export class LogoutFault implements Action {
    readonly type = AuthActionTypes.LogoutFault;

    constructor(public payload: string) {}
}

export class NavigateToLogin implements Action {
    readonly type = AuthActionTypes.NavigateToLogin;

    constructor() {}
}

export class Reset implements Action {
    readonly type = AuthActionTypes.Reset;

    constructor() {}
}

export class ResetAuthError implements Action {
    readonly type = AuthActionTypes.ResetAuthError;

    constructor() {}
}

export class ResetPending implements Action {
    readonly type = AuthActionTypes.ResetPending;

    constructor() {}
}

export class RestartApp implements Action {
    readonly type = AuthActionTypes.RestartApp;

    constructor() {}
}

export type AuthActions =
    | Login
    | LoginPending
    | LoginSuccess
    | LoginFault
    | Logout
    | LogoutPending
    | LogoutSuccess
    | LogoutFault
    | NavigateToLogin
    | Reset
    | ResetAuthError
    | ResetPending
    | RestartApp;
