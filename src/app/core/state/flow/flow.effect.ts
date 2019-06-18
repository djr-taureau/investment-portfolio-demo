import { getSelectedCompanyId } from "../index";
import { LoadPortfolioFailure, LoadPortfolioSuccess, PortfolioActionTypes, SearchCompany } from "../portfolio-dashboard/portfolio-dashboard.actions";
import * as FlowActions from "./flow.actions";
import { Action, select, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActivatedRoute, Router } from "@angular/router";
import { appRoutePaths } from "../../../app.routes";
import { catchError, concatMap, map } from "rxjs/operators";
import { FlowActionTypes, LoadPortfolio } from "./flow.actions";
import {
    GoToCompanyDashboard,
    GoToCompanyDocuments,
    GoToCompanyFinancials,
    GoToCompanyInfo,
    GoToPortfolioDashboard,
    GoToPortfolioListing,
    UpdateUrlParams
} from "../router/router.action";
import { Injectable } from "@angular/core";
import { NavigationBarLink } from "../../../shared/navigation-bar/navigation-bar-link";
import { Observable, of } from "rxjs";
import { GetAll, SetSelectedCompany } from "../company/company.actions";
import { SetSelectedCompanyLink, SetSelectedPortfolioLink, ToggleSlideout } from "../layout/layout.actions";
import { withLatestFrom } from "rxjs/operators";

@Injectable()
export class FlowEffect {
    // ------------------- PORTFOLIO ---------------------------//
    /**
     * Handles loading a portfolio
     */
    @Effect()
    loadPortfolio$: Observable<Action> = this.actions$.pipe(
        ofType(FlowActionTypes.LoadPortfolio),
        concatMap(() => [new GetAll(), new LoadPortfolioSuccess()]),
        catchError((err) => of(new LoadPortfolioFailure(err)))
    );

    /**
     * Handles going to the portfolio
     */
    @Effect()
    goToPortfolio$: Observable<Action> = this.actions$.pipe(
        ofType(FlowActionTypes.GoToPortfolio),
        concatMap(() => [new GoToPortfolioDashboard(), new LoadPortfolio()]),
        catchError((err) => of(new LoadPortfolioFailure(err)))
    );

    /**
     * Handles failures when loading a portfolio
     */
    @Effect()
    loadPortfolioFailure$: Observable<Action> = this.actions$.pipe(
        ofType(PortfolioActionTypes.LoadPortfolioFailure),
        concatMap(() => [
            // TODO: Determine what to do here
        ])
    );

    /**
     * Handles success when loading a portfolio
     */
    @Effect()
    loadPortfolioSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(PortfolioActionTypes.LoadPortfolioSuccess),
        concatMap(() => [
            // TODO: Determine what to do here
        ])
    );

    /**
     * Handles clicks to go to the portolio navigation bar
     */
    @Effect()
    portfolioNavigationLinkClicked: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.PortfolioNavigationItemClicked>(FlowActionTypes.PortfolioNavigationItemClicked),
        map((action) => action.payload),
        concatMap((link: NavigationBarLink) => {
            const actions = [];
            actions.push(new SetSelectedPortfolioLink(link.route));

            switch (link.route) {
                case appRoutePaths.portfolioListing:
                    actions.push(new GoToPortfolioListing());
                    break;
                case appRoutePaths.portfolioDashboard:
                    actions.push(new GoToPortfolioDashboard());
                    break;
                default:
                    break;
            }
            return actions;
        })
    );

    // ------------------- COMPANY: INFO PANEL ---------------------------//
    /**
     * Handles the opening of the company info panel flow
     * TODO: GMAN - Once we understand how to load the company, set the state, etc - add those actions in here
     */
    @Effect()
    openCompanyInfoPanel$: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.OpenCompanyInfoPanel>(FlowActionTypes.OpenCompanyInfoPanel),
        map((action) => action.payload),
        concatMap((companyId) => [new ToggleSlideout(true), new GoToCompanyInfo()])
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
            // TODO: GMAN: Come up with action to clear the current route out of the sidebar-outlet
            new ToggleSlideout(false)
        ])
    );

    // ------------------- COMPANY: NAVIGATION ---------------------------//
    /**
     * Handles clicks to go to company navigation bar
     */
    @Effect()
    companyNavigationLinkClicked: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.CompanyNavigationItemClicked>(FlowActionTypes.CompanyNavigationItemClicked),
        withLatestFrom(this.store$.pipe(select(getSelectedCompanyId))),
        concatMap(([action, companyId]) => {
            const actions = [];
            // select the correct tab
            actions.push(new SetSelectedCompanyLink(action.payload.route));

            // navigate to the correct route
            switch (action.payload.route) {
                case appRoutePaths.companyDashboard:
                    actions.push(new GoToCompanyDashboard(companyId));
                    break;
                case appRoutePaths.companyFinancials:
                    actions.push(new GoToCompanyFinancials(companyId));
                    break;
                case appRoutePaths.companyDocuments:
                    actions.push(new GoToCompanyDocuments(companyId));
                    break;
                default:
                    break;
            }
            return actions;
        })
    );

    @Effect()
    selectCompany$: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.SelectCompany>(FlowActionTypes.SelectCompany),
        map((action) => action.payload),
        concatMap((companyId) => {
            const actions = [];
            // set the selected company
            actions.push(new SetSelectedCompany(companyId));
            actions.push(new UpdateUrlParams({ id: companyId }));
            // go to the current url but with the new id
            // actions.push(new CompanyNavigationItemClicked())
            return actions;
        })
    );

    @Effect()
    findCompanies: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.FindCompanies>(FlowActionTypes.FindCompanies),
        map((action) => action.query),
        concatMap((query) => {
            const actions = [];
            // set the selected company
            actions.push(new SearchCompany(query));
            return actions;
        })
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private router: Router, private route: ActivatedRoute) {}
}
