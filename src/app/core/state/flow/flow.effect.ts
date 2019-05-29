import * as FlowActions from "./flow.actions";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActivatedRoute, Router } from "@angular/router";
import { appRoutePaths } from "../../../app.routes";
import { concatMap, map } from "rxjs/operators";
import { FlowActionTypes } from "./flow.actions";
import { Go } from "../router/router.action";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ToggleSlideout } from "../layout/layout.actions";

@Injectable()
export class FlowEffect {
    /**
     * Handles the opening of the company info panel flow
     * TODO: GMAN - Once we understand how to load the company, set the state, etc - add those actions in here
     */
    @Effect()
    openCompanyInfoPanel$: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.OpenCompanyInfoPanel>(FlowActionTypes.OpenCompanyInfoPanel),
        map((action) => action.payload),
        concatMap((companyId) => [new ToggleSlideout(true), new Go({ path: appRoutePaths.companyInfo, extras: { queryParamsHandling: "preserve" } })])
    );

    /**
     * Handles closing the company info panel flow
     * TODO: GMAN - Once we understand how to clear the company, set the state, etc - add those actions in here
     */
    @Effect()
    closeCompanyInfoPanel$: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.CloseCompanyInfoPanel>(FlowActionTypes.CloseCompanyInfoPanel),
        map((action) => action.payload),
        concatMap((companyId) => [
            new Go({ path: [appRoutePaths.companyInfo], extras: { queryParamsHandling: "preserve" } }),
            new ToggleSlideout(false)
        ])
    );
    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private router: Router, private route: ActivatedRoute) {}
}
