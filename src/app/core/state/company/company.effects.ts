import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import * as _ from "lodash";
import * as CompanyActions from "../company/company.actions";
import * as ValuationActions from "./../valuation/valuation.actions";
import * as RevenueActions from "./../revenue/revenue.actions";
import { Observable, of } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, concatMap } from "rxjs/operators";
import { Company, GetCompanyResponse } from "@core/domain/company.model";
import { CompanyActionTypes } from "@core/state/company/company.actions";
import { CompanyService } from "@core/service/company.service";
import { DashboardAsOfDateChanged, DashboardCurrencyChanged } from "@core/state/flow/company-flow.actions";
import { Injectable } from "@angular/core";

@Injectable()
export class CompanyEffects {
    @Effect()
    getCompanies$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.GetAll>(CompanyActionTypes.GetAll),
        exhaustMap(() =>
            this.companyService.getCompanies().pipe(
                map((result: Company[]) => {
                    return new CompanyActions.GetAllSuccess(result);
                }),
                catchError((error) => of(new CompanyActions.GetAllFailure(error)))
            )
        )
    );

    @Effect()
    getCompany$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.Get>(CompanyActionTypes.Get),
        map((action) => action.payload),
        exhaustMap((id: string) =>
            this.companyService.getCompany(id).pipe(
                concatMap((result: GetCompanyResponse) => {
                    return [new CompanyActions.GetSuccess(result.data), new ValuationActions.GetAll(id), new RevenueActions.GetAll(id)];
                }),
                catchError((error) => of(new CompanyActions.GetFailure(error)))
            )
        )
    );

    @Effect()
    getCompany$Success: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.GetSuccess>(CompanyActionTypes.GetSuccess),
        map((action) => action.payload),
        concatMap((result: Company) => {
            const comp = result as Company;
            // TODO: Gman - update this to use the latest NON-FUTURE available period (once appropriate data for doing so is returned from API)
            const lastPeriod = _.takeRight(_.get(comp, "availablePeriods", []), 1)[0] as SelectorPeriod;
            return [new DashboardAsOfDateChanged(lastPeriod), new DashboardCurrencyChanged(comp.defaultCurrency)];
        }),
        catchError((error) => of(new CompanyActions.GetFailure(error)))
    );

    /**
     * Constructor.
     * @param actions$
     * @param companyService
     * @param store$
     */
    constructor(private actions$: Actions, private companyService: CompanyService, private store$: Store<any>) {}
}
