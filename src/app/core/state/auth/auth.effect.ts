import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
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
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private authService: AuthService) {}
}
