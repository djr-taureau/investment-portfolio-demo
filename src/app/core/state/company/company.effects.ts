import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { asyncScheduler, EMPTY as empty, Observable, of } from "rxjs";
import { catchError, debounceTime, exhaustMap, map, skip, switchMap, takeUntil } from "rxjs/operators";
import { Company, GetAllCompaniesResponse } from "../../domain/company.model";
import { CompanyActionTypes, GetAllFailure, GetAllSuccess } from "./company.actions";
import { CompanyService } from "../../service/company.service";
import { Injectable } from "@angular/core";
import { PortfolioActionTypes, SearchCompanyFailure, SearchCompanySuccess } from "../portfolio-dashboard/portfolio-dashboard.actions";

@Injectable()
export class CompanyEffects {
    @Effect()
    getCompanies$: Observable<Action> = this.actions$.pipe(
        ofType(CompanyActionTypes.GetAll),
        exhaustMap(() =>
            this.companyService.getCompanies(false).pipe(
                map((result: GetAllCompaniesResponse) => {
                    return new GetAllSuccess(result.data);
                }),
                catchError((error) => of(new GetAllFailure(error)))
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

    constructor(private actions$: Actions, private companyService: CompanyService) {}
}
