import * as CompanyActions from "../company/company.actions";
import * as FlowActions from "./portfolio-flow.actions";
import * as RouterActions from "@core/state/router/router.action";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActivatedRoute, Router } from "@angular/router";
import { appRoutePaths } from "../../../app.routes";
import { catchError, concatMap, map } from "rxjs/operators";
import { ComponentFactoryResolver, Injectable, Injector, TemplateRef } from "@angular/core";
import { LoadPortfolioFailure, LoadPortfolioSuccess, PortfolioActionTypes, SearchCompany } from "../portfolio-dashboard/portfolio-dashboard.actions";
import { NavigationBarLink } from "../../../shared/navigation-bar/navigation-bar-link";
import { Observable, of } from "rxjs";
import { PortfolioFlowActionTypes } from "./portfolio-flow.actions";
import { SetSelectedPortfolioLink } from "../layout/layout.actions";

@Injectable()
export class PortfolioFlowEffect {
    // ------------------- PORTFOLIO ---------------------------//
    /**
     * Handles loading a portfolio
     */
    @Effect()
    loadPortfolio$: Observable<Action> = this.actions$.pipe(
        ofType(PortfolioFlowActionTypes.LoadPortfolio),
        concatMap(() => [new CompanyActions.GetAll(), new LoadPortfolioSuccess()]),
        catchError((err) => of(new LoadPortfolioFailure(err)))
    );

    /**
     * Handles going to the portfolio
     */
    @Effect()
    goToPortfolio$: Observable<Action> = this.actions$.pipe(
        ofType(PortfolioFlowActionTypes.GoToPortfolio),
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
        ofType<FlowActions.PortfolioNavigationItemClicked>(PortfolioFlowActionTypes.PortfolioNavigationItemClicked),
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
