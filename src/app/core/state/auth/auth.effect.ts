import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { appRoutePaths } from "../../../app.routes";
import { Auth, ChangePasswordCredentials, LoginCredentials, RegisterCredentials } from "../../domain/auth.model";
import { AuthService } from "../../service/auth.service";
import { AuthActionTypes } from "./auth.action";
import * as RouterActions from "../router/router.action";
import * as AuthActions from "./auth.action";
import * as fromRoot from "../index";

@Injectable()
export class AuthEffect {
    /**
     * Attempt to login.
     */
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.Login>(AuthActionTypes.Login),
        map((action: AuthActions.Login) => action.payload),
        exhaustMap((creds: LoginCredentials) =>
            this.authService.login(creds).pipe(
                mergeMap((data: Auth) => {
                    let actions = [];
                    if (data.newPasswordRequired) {
                        actions = [
                            new AuthActions.ResetPending(),
                            new AuthActions.NewPasswordRequired(data.password),
                            new RouterActions.Go({ path: appRoutePaths.changePassword })
                        ];
                    } else {
                        actions = [new AuthActions.LoginSuccess(data)];
                    }
                    return actions;
                }),
                catchError((err: Error) => of(new AuthActions.LoginFault(err.message)))
            )
        )
    );

    /**
     * Attempt to register a user.
     */
    @Effect()
    register$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.Register>(AuthActionTypes.Register),
        map((action: AuthActions.Register) => action.payload),
        exhaustMap((creds: RegisterCredentials) =>
            this.authService.register(creds).pipe(
                mergeMap((data: RegisterCredentials) => [new AuthActions.RegisterSuccess()]),
                catchError((err: Error) => of(new AuthActions.RegisterFault(err.message)))
            )
        )
    );

    /**
     * Attempt to changePassword a user.
     */
    @Effect()
    changePassword$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.ChangePassword>(AuthActionTypes.ChangePassword),
        withLatestFrom(this.store$.pipe(select(fromRoot.getPassword))),
        map(
            ([action, password]): ChangePasswordCredentials => {
                return {
                    username: action.payload.username,
                    oldPassword: password || action.payload.oldPassword,
                    newPassword: action.payload.newPassword
                };
            }
        ),
        exhaustMap((creds: ChangePasswordCredentials) =>
            this.authService.changePassword(creds).pipe(
                mergeMap((data: Auth) => [new AuthActions.ChangePasswordSuccess(data)]),
                catchError((err: Error) => of(new AuthActions.RegisterFault(err.message)))
            )
        )
    );

    /**
     * Routes the user to the login flow.
     */
    @Effect()
    navigateToLogin$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.NavigateToLogin>(AuthActionTypes.NavigateToLogin),
        mergeMap((action) => {
            return [new AuthActions.ResetAuthError(), new RouterActions.Go({ path: appRoutePaths.login })];
        })
    );

    /**
     * Routes the user to the registration flow.
     */
    @Effect()
    navigateToRegister$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.NavigateToRegister>(AuthActionTypes.NavigateToRegister),
        mergeMap((action) => {
            return [new AuthActions.ResetAuthError(), new RouterActions.Go({ path: appRoutePaths.register })];
        })
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private authService: AuthService) {}
}
