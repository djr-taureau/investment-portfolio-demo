import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { asyncScheduler, EMPTY as empty, Observable, of } from "rxjs";
import { catchError, debounceTime, exhaustMap, map, skip, switchMap, takeUntil } from "rxjs/operators";
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
                map((result: GetAllCompaniesResponse) => {
                    return new CompanyActions.GetAllSuccess(result.data);
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
                map((result: GetCompanyResponse) => {
                    return new CompanyActions.GetSuccess(result.data);
                }),
                catchError((error) => of(new CompanyActions.GetFailure(error)))
            )
        )
    );

    @Effect()
    search$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<Action> =>
        this.actions$.pipe(
            ofType(PortfolioActionTypes.SearchCompany),
            debounceTime(debounce, scheduler),
            switchMap(({ query }) => {
                if (query === "") {
                    return empty;
                }

                const nextSearch$ = this.actions$.pipe(
                    ofType(PortfolioActionTypes.SearchCompany),
                    skip(1)
                );

                return this.companyService.searchCompanies(query).pipe(
                    takeUntil(nextSearch$),
                    map((companies: Company[]) => new SearchCompanySuccess(companies)),
                    catchError((err) => of(new SearchCompanyFailure(err)))
                );
            })
        )

    /**
     * Constructor.
     * @param actions$
     * @param companyService
     * @param store$
     */
    constructor(private actions$: Actions, private companyService: CompanyService, private store$: Store<any>) {}
}
