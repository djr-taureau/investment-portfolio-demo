import { Action } from "@ngrx/store";
import { Auth, ChangePasswordCredentials, LoginCredentials, RegisterCredentials } from "../../domain/auth.model";

export enum AuthActionTypes {
    Login = "[Auth] Login",
    LoginSuccess = "[Auth] LoginSuccess",
    LoginFault = "[Auth] LoginFault",

    Register = "[Auth] Register",
    RegisterSuccess = "[Auth] RegisterSuccess",
    RegisterFault = "[Auth] RegisterFault",

    ChangePassword = "[Auth] ChangePassword",
    ChangePasswordSuccess = "[Auth] ChangePasswordSuccess",
    ChangePasswordFault = "[Auth] ChangePasswordFault",

    NavigateToLogin = "[Auth] NavigateToLogin",
    NavigateToRegister = "[Auth] NavigateToRegister",

    SaveTempPassword = "[Auth] SaveTempPassword",
    ResetAuthError = "[Auth] ResetAuthError",
    ResetPending = "[Auth] ResetPending"
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;

    constructor(public payload: LoginCredentials) {}
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: Auth) {}
}

export class LoginFault implements Action {
    readonly type = AuthActionTypes.LoginFault;

    constructor(public payload: string) {}
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;

    constructor(public payload: RegisterCredentials) {}
}

export class RegisterSuccess implements Action {
    readonly type = AuthActionTypes.RegisterSuccess;

    constructor() {}
}

export class RegisterFault implements Action {
    readonly type = AuthActionTypes.RegisterFault;

    constructor(public payload: string) {}
}

export class NavigateToLogin implements Action {
    readonly type = AuthActionTypes.NavigateToLogin;

    constructor() {}
}

export class ChangePassword implements Action {
    readonly type = AuthActionTypes.ChangePassword;

    constructor(public payload: ChangePasswordCredentials) {}
}

export class ChangePasswordSuccess implements Action {
    readonly type = AuthActionTypes.ChangePasswordSuccess;

    constructor(public payload: Auth) {}
}

export class ChangePasswordFault implements Action {
    readonly type = AuthActionTypes.ChangePasswordFault;

    constructor(public payload: string) {}
}

export class NavigateToRegister implements Action {
    readonly type = AuthActionTypes.NavigateToRegister;

    constructor() {}
}

export class NewPasswordRequired implements Action {
    readonly type = AuthActionTypes.SaveTempPassword;

    constructor(public payload: string) {}
}

export class ResetAuthError implements Action {
    readonly type = AuthActionTypes.ResetAuthError;

    constructor() {}
}

export class ResetPending implements Action {
    readonly type = AuthActionTypes.ResetPending;

    constructor() {}
}

export type AuthActions =
    | Login
    | LoginSuccess
    | LoginFault
    | Register
    | RegisterSuccess
    | RegisterFault
    | ChangePassword
    | ChangePasswordSuccess
    | ChangePasswordFault
    | NavigateToLogin
    | NavigateToRegister
    | NewPasswordRequired
    | ResetAuthError
    | ResetPending;
