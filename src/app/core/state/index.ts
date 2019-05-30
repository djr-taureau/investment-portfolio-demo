import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "./auth/auth.reducer";
import { CustomRouterStateSerializer, RouterStateUrl } from "./router/custom-router-state.serializer";
import * as fromRouter from "@ngrx/router-store";
import * as fromLayout from "./layout/layout.reducer";

export interface AppState {
    auth: fromAuth.AuthState;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    layout: fromLayout.LayoutState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    router: fromRouter.routerReducer,
    layout: fromLayout.layoutReducer
};

// -------------------------------------------------------------------
// AUTH SELECTORS
// -------------------------------------------------------------------
export const selectAuthState = createFeatureSelector<fromAuth.AuthState>("auth");

export const getUsername = createSelector(
    selectAuthState,
    fromAuth.getUsername
);

export const getPassword = createSelector(
    selectAuthState,
    fromAuth.getPassword
);

export const getAccessToken = createSelector(
    selectAuthState,
    fromAuth.getAccessToken
);

export const getIdToken = createSelector(
    selectAuthState,
    fromAuth.getIdToken
);

export const getIsLoggedIn = createSelector(
    selectAuthState,
    fromAuth.getIsLoggedIn
);

export const getError = createSelector(
    selectAuthState,
    fromAuth.getError
);

export const getPending = createSelector(
    selectAuthState,
    fromAuth.getPending
);

export const getSuccess = createSelector(
    selectAuthState,
    fromAuth.getSuccess
);

// -------------------------------------------------------------------
// LAYOUT SELECTORS
// -------------------------------------------------------------------
export const selectLayoutState = createFeatureSelector<fromLayout.LayoutState>("layout");

export const getShowSlideout = createSelector(
    selectLayoutState,
    fromLayout.getShowSlideout
);
