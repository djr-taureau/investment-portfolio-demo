import { TakeawaysComponent } from "@app/slideout-routes/takeaways/takeaways.component";
import { TakeawaysContainer } from "@app/slideout-routes/takeaways/takeaways.container";
import { SlideoutPanelComponent } from "@shared/slideout/slideout-panel.component";
import { SlideoutContainerComponent } from "@shared/slideout/slideout.container.component";
import { getSelectedCompanyId } from "../index";
import { LoadPortfolioFailure, LoadPortfolioSuccess, PortfolioActionTypes, SearchCompany } from "../portfolio-dashboard/portfolio-dashboard.actions";
import { Action, select, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActivatedRoute, Router } from "@angular/router";
import { appRoutePaths } from "@app/app.routes";
import { catchError, concatMap, map, tap } from "rxjs/operators";
import { FlowActionTypes } from "./flow.actions";
import { ComponentFactoryResolver, Injectable, Injector, TemplateRef, Type } from "@angular/core";
import { NavigationBarLink } from "@shared/navigation-bar/navigation-bar-link";
import { Observable, of } from "rxjs";
import { GetAll, SetSelectedCompany } from "../company/company.actions";
import { SetSelectedCompanyLink, SetSelectedPortfolioLink, ToggleSlideout } from "../layout/layout.actions";
import { withLatestFrom } from "rxjs/operators";
import * as FlowActions from "./flow.actions";
import * as RouterActions from "@core/state/router/router.action";

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
        concatMap(() => [new RouterActions.GoToPortfolioDashboard(), new FlowActions.LoadPortfolio()]),
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
                    actions.push(new RouterActions.GoToPortfolioListing());
                    break;
                case appRoutePaths.portfolioDashboard:
                    actions.push(new RouterActions.GoToPortfolioDashboard());
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
        // concatMap((companyId) => [new ToggleSlideout(true), new RouterActions.GoToCompanyInfo()])
        concatMap((companyId) => [new ToggleSlideout(true)])
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

    // ------------------- TAKEAWAYS ---------------------------//
    /**
     * Handles the opening of the company info panel flow
     * TODO: BMR: 06/25/2019: Once we understand how to load the company, set the state, etc - add those actions in here
     */
    @Effect()
    openTakeawaysPanel: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.OpenTakeawaysPanel>(FlowActionTypes.OpenTakeawaysPanel),
        map((action) => action.payload),
        // concatMap((companyId: string) => [new ToggleSlideout(true), new RouterActions.GoToTakeaways()])
        // tap((companyId: string) => {
        //
        //
        //     const factory = this.resolver.resolveComponentFactory(SlideoutContainerComponent);
        //     const ngContent = this.resolveNgContent(TakeawaysContainer);
        //     const componentRef = factory.create(this.injector, ngContent);
        //
        //     componentRef.hostView.detectChanges();
        //
        //     return companyId;
        // }),
        concatMap((companyId: string) => [new ToggleSlideout(true, TakeawaysComponent)])
    );

    /**
     * Handles closing the company info panel flow
     * TODO: BMR: 06/25/2019: Once we understand how to clear the company, set the state, etc - add those actions in here
     */
    @Effect()
    closeTakeawaysPanel: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.CloseTakeawaysPanel>(FlowActionTypes.CloseTakeawaysPanel),
        map((action) => action.payload),
        concatMap((companyId: string) => [
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
                    actions.push(new RouterActions.GoToCompanyDashboard(companyId));
                    break;
                case appRoutePaths.companyFinancials:
                    actions.push(new RouterActions.GoToCompanyFinancials(companyId));
                    break;
                case appRoutePaths.companyDocuments:
                    actions.push(new RouterActions.GoToCompanyDocuments(companyId));
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
            actions.push(new RouterActions.UpdateUrlParams({ id: companyId }));
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
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private resolver: ComponentFactoryResolver,
        private injector: Injector
    ) {}

    private resolveNgContent<T>(content: any) {
        // if (typeof content === 'string') {
        //     const element = this.document.createTextNode(content);
        //     return [[element]];
        // }

        if (content instanceof TemplateRef) {
            const viewRef = content.createEmbeddedView(null);
            console.log(viewRef);
            // In earlier versions, you may need to add this line
            // this.appRef.attachView(viewRef);
            return [viewRef.rootNodes];
        }

        const factory = this.resolver.resolveComponentFactory(content);
        const componentRef = factory.create(this.injector);
        // return [[componentRef.location.nativeElement], [this.document.createTextNode('Second ng-content')]];
    }
}
