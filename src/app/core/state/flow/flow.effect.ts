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
    @Effect()
    openCompanyInfoPanel$: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.OpenCompanyInfoPanel>(FlowActionTypes.OpenCompanyInfoPanel),
        map((action) => action.payload),
        concatMap((companyId) => [
            new ToggleSlideout(false),
            new Go({ path: appRoutePaths.companyInfo, extras: { queryParamsHandling: "preserve" } })
        ])
    );

    @Effect()
    closeCompanyInfoPanel$: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.CloseCompanyInfoPanel>(FlowActionTypes.CloseCompanyInfoPanel),
        map((action) => action.payload),
        concatMap((companyId) => [
            new Go({ path: [appRoutePaths.companyInfo], extras: { queryParamsHandling: "preserve" } }),
            new ToggleSlideout(true)
        ])
    );
    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private router: Router, private route: ActivatedRoute) {}
}
