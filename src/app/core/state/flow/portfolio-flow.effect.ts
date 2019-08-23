import { PortfolioDashboardNavBarLink } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import { getSelectedCompanyId } from "@core/state";
import { getPortfolio } from "@core/state/portfolio-dashboard";
import { SelectAsOfDate, SelectCurrency, SelectDatePart } from "@core/state/portfolio-dashboard/portfolio-dashboard-overview-layout.actions";
import * as PortfolioDashboardOverviewLayoutActions from "@core/state/portfolio-dashboard/portfolio-dashboard-overview-layout.actions";
import { LoadPortfolio, LoadPortfolioInvestmentSummary } from "@core/state/portfolio/portfolio.actions";
import * as CompanyActions from "../company/company.actions";
import * as FlowActions from "./portfolio-flow.actions";
import * as RouterActions from "@core/state/router/router.action";
import * as PortfolioRevenueActions from "@core/state/portfolio-dashboard/revenue/portfolio-revenue.actions";
import * as PortfolioEbitdaActions from "@core/state/portfolio-dashboard/ebitda/portfolio-ebitda.actions";
import { Action, select, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActivatedRoute, Router } from "@angular/router";
import { appRoutePaths } from "@app/app.routes";
import { catchError, concatMap, map, withLatestFrom } from "rxjs/operators";
import { ComponentFactoryResolver, Injectable, Injector, TemplateRef } from "@angular/core";
import { LoadPortfolioCompaniesSuccess } from "../portfolio-dashboard/company-list/portfolio-company-list.actions";
import { NavigationBarLink } from "@shared/navigation-bar/navigation-bar-link";
import { Observable, of } from "rxjs";
import { PortfolioFlowActionTypes } from "./portfolio-flow.actions";
import { SetSelectedPortfolioLink } from "../layout/layout.actions";
import * as _ from "lodash";

@Injectable()
export class PortfolioFlowEffect {
    // ------------------- PORTFOLIO ---------------------------//
    /**
     * Handles loading a portfolio
     */
    @Effect()
    loadPortfolioFlow$: Observable<Action> = this.actions$.pipe(
        ofType(PortfolioFlowActionTypes.LoadPortfolioFlow),
        concatMap(() => [
            new CompanyActions.GetAll(),
            new LoadPortfolioCompaniesSuccess(),
            new LoadPortfolio("1")
            // new PortfolioEbitdaActions.Get("1"),
            // new PortfolioRevenueActions.Get("1"),
            // new LoadPortfolioInvestmentSummary({ id: "1" })
        ])
    );

    /**
     * Handles going to the portfolio
     */
    @Effect()
    goToPortfolio$: Observable<Action> = this.actions$.pipe(
        ofType(PortfolioFlowActionTypes.GoToPortfolio),
        concatMap(() => [new RouterActions.GoToPortfolioDashboard(), new FlowActions.LoadPortfolioFlow()])
    );

    /**
     * Handles failures when loading a portfolio
     */
    @Effect()
    loadPortfolioFlowFailure$: Observable<Action> = this.actions$.pipe(
        ofType(PortfolioFlowActionTypes.LoadPortfolioFlowFailure),
        concatMap(() => [])
    );

    /**
     * Handles success when loading a portfolio
     */
    @Effect()
    loadPortfolioFlowSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.LoadPortfolioFlowSuccess>(PortfolioFlowActionTypes.LoadPortfolioFlowSuccess),
        map((action) => action.payload),
        concatMap((portfolio) => {
            if (!portfolio) {
                return [];
            }
            const actions = [];
            const lastPeriod = _.takeRight(_.get(portfolio, "funds[0].availablePeriods", []), 1)[0] as string;
            actions.push(new PortfolioEbitdaActions.Get({ id: String(portfolio.id), asOf: lastPeriod }));
            actions.push(new PortfolioRevenueActions.Get({ id: String(portfolio.id), asOf: lastPeriod }));
            actions.push(new LoadPortfolioInvestmentSummary({ id: String(portfolio.id), asOf: lastPeriod }));
            return actions;
        })
    );

    /**
     * Handles clicks to go to the portfolio navigation bar
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
     * Handles clicks to go to the portfolio dashboard navigation bar.
     */
    @Effect()
    portfolioDashboardOverviewNavigationLinkClicked: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.PortfolioDashboardOverviewNavigationItemClicked>(PortfolioFlowActionTypes.PortfolioDashboardOverviewNavigationItemClicked),
        map((action) => action.payload),
        concatMap((link: PortfolioDashboardNavBarLink) => {
            const actions = [];
            actions.push(new PortfolioDashboardOverviewLayoutActions.SelectNavLink(link));

            switch (link.route) {
                case appRoutePaths.portfolioDashboardInvestment:
                    actions.push(new RouterActions.GoToPortfolioDashboardInvestment());
                    break;
                case appRoutePaths.portfolioDashboardFinancials:
                    actions.push(new RouterActions.GoToPortfolioDashboardFinancials());
                    break;
                default:
                    break;
            }
            return actions;
        })
    );

    // ------------------- PORTFOLIO: DASHBOARD ---------------------------//
    @Effect()
    dashboardCurrencyChanged$: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.DashboardCurrencyChanged>(PortfolioFlowActionTypes.DashboardCurrencyChanged),
        map((action) => action.payload),
        concatMap((selectedCurrency) => [new SelectCurrency(selectedCurrency)])
    );

    @Effect()
    dashboardDatePartChanged$: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.DashboardDatePartChanged>(PortfolioFlowActionTypes.DashboardDatePartChanged),
        map((action) => action.payload),
        concatMap((payload) => [new SelectDatePart(payload)])
    );

    @Effect()
    dashboardAsOfDateChanged$: Observable<Action> = this.actions$.pipe(
        ofType<FlowActions.DashboardAsOfDateChanged>(PortfolioFlowActionTypes.DashboardAsOfDateChanged),
        withLatestFrom(this.store$.pipe(select(getPortfolio))),
        map(([action, portfolio]) => {
            return {
                selectedPeriod: action.payload,
                date: action.payload.date,
                id: portfolio.id,
                portfolio
            };
        }),
        concatMap((request) => [
            new SelectAsOfDate(request.selectedPeriod),
            new PortfolioEbitdaActions.Get({ id: String(request.portfolio.id), asOf: request.selectedPeriod.date }),
            new PortfolioRevenueActions.Get({ id: String(request.portfolio.id), asOf: request.selectedPeriod.date }),
            new LoadPortfolioInvestmentSummary({ id: String(request.portfolio.id), asOf: request.selectedPeriod.date })
        ])
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
            // In earlier versions, you may need to add this line
            // this.appRef.attachView(viewRef);
            return [viewRef.rootNodes];
        }

        const factory = this.resolver.resolveComponentFactory(content);
        const componentRef = factory.create(this.injector);
        // return [[componentRef.location.nativeElement], [this.document.createTextNode('Second ng-content')]];
    }
}
