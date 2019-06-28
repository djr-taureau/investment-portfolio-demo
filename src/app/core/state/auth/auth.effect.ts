import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map, mergeMap } from "rxjs/operators";
import { AuthService } from "@core/auth/auth.service";
import { AuthActionTypes } from "./auth.action";
import * as AuthActions from "./auth.action";

@Injectable()
export class AuthEffect {
    /**
     * Attempt to login.
     */
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.Login>(AuthActionTypes.Login),
        exhaustMap(() =>
            this.authService.login().pipe(
                map((data: boolean) => new AuthActions.LoginPending()),
                catchError((err: Error) => of(new AuthActions.LoginFault(err.message)))
            )
        )
    );

    /**
     * Attempt to logout.
     */
    @Effect()
    logout$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.Login>(AuthActionTypes.Logout),
        exhaustMap(() =>
            this.authService.logout().pipe(
                map((data: boolean) => new AuthActions.LogoutPending()),
                catchError((err: Error) => of(new AuthActions.LogoutFault(err.message)))
            )
        )
    );

    /**
     * Handles logout fault flow.
     */
    @Effect()
    loginFault$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.LogoutFault>(AuthActionTypes.LogoutFault),
        map((action) => new AuthActions.RestartApp())
    );

    /**
     * Handles restart app flow.
     */
    @Effect()
    restartApp$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.RestartApp>(AuthActionTypes.RestartApp),
        mergeMap((action) => [new AuthActions.Reset(), new AuthActions.NavigateToLogin()])
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private authService: AuthService) {}
}
