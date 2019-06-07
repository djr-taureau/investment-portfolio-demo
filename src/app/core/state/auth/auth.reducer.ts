import { Auth } from "../../domain/auth.model";
import { AuthActions, AuthActionTypes } from "./auth.action";

export interface AuthState {
    username: string;
    password: string;
    accessToken: string | null;
    idToken: string | null;
    pending: boolean;
    isRegistered: boolean;
    newPasswordRequired: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    username: "",
    password: "",
    accessToken: "",
    idToken: "",
    pending: false,
    isRegistered: false,
    newPasswordRequired: false,
    error: ""
};

function initAuth(state: AuthState = initialState): AuthState {
    return {
        ...state,
        pending: true,
        error: ""
    };
}

function authSuccess(data: Auth, state: AuthState = initialState): AuthState {
    return {
        ...state,
        username: data.username,
        password: data.password,
        accessToken: data.accessToken,
        idToken: data.idToken,
        newPasswordRequired: false,
        pending: false,
        error: ""
    };
}

function authFailed(data: string, state: AuthState = initialState): AuthState {
    return {
        ...state,
        accessToken: "",
        idToken: "",
        pending: false,
        error: data
    };
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login:
            return initAuth(state);

        case AuthActionTypes.LoginSuccess:
            return authSuccess(action.payload, state);

        case AuthActionTypes.LoginFault:
            return authFailed(action.payload, state);

        default:
            return state;
    }
}

export const getUsername = (state: AuthState) => state.username;
export const getPassword = (state: AuthState) => state.password;
export const getAccessToken = (state: AuthState) => state.accessToken;
export const getIdToken = (state: AuthState) => state.idToken;
export const getIsLoggedIn = (state: AuthState) => !!state.accessToken;
export const getPending = (state: AuthState) => state.pending;
export const getSuccess = (state: AuthState) => state.isRegistered;
export const getError = (state: AuthState) => state.error;
