import * as ValuationActions from "./../valuation/valuation.actions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { asyncScheduler, EMPTY as empty, Observable, of } from "rxjs";
import { catchError, debounceTime, exhaustMap, map, skip, switchMap, takeUntil, concatMap } from "rxjs/operators";
import { Company, GetAllCompaniesResponse, GetCompanyResponse } from "@core/domain/company.model";
import { CompanyActionTypes } from "@core/state/company/company.actions";
import { CompanyService } from "@core/service/company.service";
import { Injectable } from "@angular/core";
import { PortfolioActionTypes, SearchCompanyFailure, SearchCompanySuccess } from "@core/state/portfolio-dashboard/portfolio-dashboard.actions";
import * as CompanyActions from "../company/company.actions";

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
                    return [new CompanyActions.GetSuccess(result.data), new ValuationActions.GetAll(id)];
                }),
                catchError((error) => of(new CompanyActions.GetFailure(error)))
            )
        )
    );

    /**
     * Constructor.
     * @param actions$
     * @param companyService
     * @param store$
     */
    constructor(private actions$: Actions, private companyService: CompanyService, private store$: Store<any>) {}
}
