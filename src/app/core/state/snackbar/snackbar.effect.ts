import { MatSnackBar } from "@angular/material";
import { Store } from "@ngrx/store";
import { SnackBarActionTypes, Open } from "./snackbar.action";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, tap } from "rxjs/operators";
import * as SnackBarActions from "./snackbar.action";
import * as AuthActions from "@core/state/auth/auth.action";

@Injectable()
export class SnackbarEffect {
    /**
     * Hash of messages.
     *
     * TODO: BMR: 06/26/2019: Considering localizing everything with ngx-translate or add all snackbar messages here.
     */
    public static MESSAGES = {
        SUCCESSFULLY_REGISTERED:
            `You are all set! You have successfully signed up with ACT Academy ` + `and an email with login instructions is on its way.`
    };

    /**
     * Open a snackbar notification.
     */
    @Effect({ dispatch: false })
    open$ = this.actions.pipe(
        ofType<Open>(SnackBarActionTypes.Open),
        map((action: SnackBarActions.Open) => action.payload),
        map((message: string) => {
            const snackBarRef = this.snackBar.open(message, "Close");

            snackBarRef.afterDismissed().subscribe(null, null, () => {
                if (message === SnackbarEffect.MESSAGES.SUCCESSFULLY_REGISTERED) {
                    this.store$.dispatch(new AuthActions.RestartApp());
                }
            });
        })
    );

    /**
     * Closes a snackbar notification.
     */
    @Effect({ dispatch: false })
    close$ = this.actions.pipe(
        ofType<Open>(SnackBarActionTypes.Close),
        tap(() => {
            // if (this.dialog) {
            //     this.dialog.closeAll();
            // }
        })
    );

    /**
     * Constructor.
     * @param actions
     * @param snackBar
     * @param store$
     */
    constructor(private actions: Actions, private snackBar: MatSnackBar, private store$: Store<any>) {}
}
