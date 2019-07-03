import { SelectAsOfDate, SelectCurrency, SelectDatePart } from "@core/state/company/dashboard/company-dashboard-layout.actions";
import * as CompanyFlowActions from "@core/state/flow/company-flow.actions";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyFlowActionTypes } from "@core/state/flow/company-flow.actions";
import { ComponentFactoryResolver, Injectable, Injector, TemplateRef } from "@angular/core";
import { concatMap, map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class CompanyFlowEffect {
    @Effect()
    dashboardCurrencyChanged$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyFlowActions.DashboardCurrencyChanged>(CompanyFlowActionTypes.DashboardCurrencyChanged),
        map((action) => action.payload),
        concatMap((selectedCurrency) => [new SelectCurrency(selectedCurrency)])
    );

    @Effect()
    dashboardDatePartChanged$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyFlowActions.DashboardDatePartChanged>(CompanyFlowActionTypes.DashboardDatePartChanged),
        map((action) => action.payload),
        concatMap((selectedDatePart) => [new SelectDatePart(selectedDatePart)])
    );

    @Effect()
    dashboardAsOfDateChanged$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyFlowActions.DashboardAsOfDateChanged>(CompanyFlowActionTypes.DashboardAsOfDateChanged),
        map((action) => action.payload),
        concatMap((selectedPeriod) => [new SelectAsOfDate(selectedPeriod)])
    );

    // TODO: GMAN - Commenting the rest of these out for now until we have two separate flows (portfolio and company) so as not to execute effects 2x

    // ------------------- COMPANY: INFO PANEL ---------------------------//
    /**
     * Handles the opening of the company info panel flow
     * TODO: GMAN - Once we understand how to load the company, set the state, etc - add those actions in here
     */
    // @Effect()
    // openCompanyInfoPanel$: Observable<Action> = this.actions$.pipe(
    //     ofType<FlowActions.OpenCompanyInfoPanel>(FlowActionTypes.OpenCompanyInfoPanel),
    //     map((action) => action.payload),
    //     concatMap((companyId) => [new ToggleSlideout(true, CompanyInfoContainer)])
    // );

    /**
     * Handles closing the company info panel flow
     * TODO: GMAN - Once we understand how to clear the company, set the state, etc - add those actions in here
     */
    // @Effect()
    // closeCompanyInfoPanel$: Observable<Action> = this.actions$.pipe(
    //     ofType<FlowActions.CloseCompanyInfoPanel>(FlowActionTypes.CloseCompanyInfoPanel),
    //     map((action) => action.payload),
    //     concatMap((companyId) => [new ToggleSlideout(false)])
    // );

    // ------------------- TAKEAWAYS ---------------------------//
    /**
     * Handles the opening of the company info panel flow
     * TODO: BMR: 06/25/2019: Once we understand how to load the company, set the state, etc - add those actions in here
     */
    // @Effect()
    // openTakeawaysPanel: Observable<Action> = this.actions$.pipe(
    //     ofType<FlowActions.OpenTakeawaysPanel>(FlowActionTypes.OpenTakeawaysPanel),
    //     map((action) => action.payload),
    //     concatMap((companyId: string) => [new ToggleSlideout(true, TakeawaysContainer)])
    // );

    /**
     * Handles closing the company info panel flow
     * TODO: BMR: 06/25/2019: Once we understand how to clear the company, set the state, etc - add those actions in here
     */
    // @Effect()
    // closeTakeawaysPanel: Observable<Action> = this.actions$.pipe(
    //     ofType<FlowActions.CloseTakeawaysPanel>(FlowActionTypes.CloseTakeawaysPanel),
    //     map((action) => action.payload),
    //     concatMap((companyId: string) => [new ToggleSlideout(false)])
    // );

    // ------------------- COMPANY: NAVIGATION ---------------------------//
    /**
     * Handles clicks to go to company navigation bar
     */
    // @Effect()
    // companyNavigationLinkClicked: Observable<Action> = this.actions$.pipe(
    //     ofType<FlowActions.CompanyNavigationItemClicked>(FlowActionTypes.CompanyNavigationItemClicked),
    //     withLatestFrom(this.store$.pipe(select(getSelectedCompanyId))),
    //     concatMap(([action, companyId]) => {
    //         const actions = [];
    //         // select the correct tab
    //         actions.push(new SetSelectedCompanyLink(action.payload.route));
    //
    //         // navigate to the correct route
    //         switch (action.payload.route) {
    //             case appRoutePaths.companyDashboard:
    //                 actions.push(new RouterActions.GoToCompanyDashboard(companyId));
    //                 break;
    //             case appRoutePaths.companyFinancials:
    //                 actions.push(new RouterActions.GoToCompanyFinancials(companyId));
    //                 break;
    //             case appRoutePaths.companyDocuments:
    //                 actions.push(new RouterActions.GoToCompanyDocuments(companyId));
    //                 break;
    //             default:
    //                 break;
    //         }
    //         return actions;
    //     })
    // );

    // @Effect()
    // selectCompany$: Observable<Action> = this.actions$.pipe(
    //     ofType<FlowActions.SelectCompany>(FlowActionTypes.SelectCompany),
    //     map((action) => action.payload),
    //     concatMap((companyId) => {
    //         const actions = [];
    //         // set the selected company
    //         actions.push(new SetSelectedCompany(companyId));
    //         actions.push(new RouterActions.UpdateUrlParams({ id: companyId }));
    //         // go to the current url but with the new id
    //         // actions.push(new CompanyNavigationItemClicked())
    //         return actions;
    //     })
    // );

    // @Effect()
    // findCompanies: Observable<Action> = this.actions$.pipe(
    //     ofType<FlowActions.FindCompanies>(FlowActionTypes.FindCompanies),
    //     map((action) => action.query),
    //     concatMap((query) => {
    //         const actions = [];
    //         // set the selected company
    //         actions.push(new SearchCompany(query));
    //         return actions;
    //     })
    // );

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
