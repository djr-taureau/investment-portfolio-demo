import * as FlowActions from "./flow.actions";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActivatedRoute, Router } from "@angular/router";
import { appRoutePaths } from "../../../app.routes";
import { concatMap, map, tap } from "rxjs/operators";
import { FlowActionTypes } from "./flow.actions";
import { Go } from "../router/router.action";
import { Injectable } from "@angular/core";
import { NavigationBarLink } from "../../../shared/navigation-bar/navigation-bar-link";
import { Observable } from "rxjs";
import { SetSelectedPortfolioLink, ToggleSlideout } from "../layout/layout.actions";

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
        concatMap((companyId) => [
            new ToggleSlideout(true),
            new Go({ path: appRoutePaths.companyInfo, extras: { queryParamsHandling: "preserve", skipLocationChange: true } })
        ])
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
            new Go({ path: appRoutePaths.companyInfo, extras: { queryParamsHandling: "preserve", skipLocationChange: true } }),
            new ToggleSlideout(false)
        ])
    );

    /**
     * Handles clicks to go to the portolio listing
     */
    @Effect()
    portfolioNavigationLinkClicked: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.PortfolioNavigationItemClicked>(FlowActionTypes.PortfolioNavigationItemClicked),
        map((action) => action.payload),
        concatMap((link: NavigationBarLink) => [
            new Go({ path: link.route, extras: { queryParamsHandling: "preserve" } }),
            new SetSelectedPortfolioLink(link.route)
        ])
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private router: Router, private route: ActivatedRoute) {}
}
