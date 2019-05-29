import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { asyncScheduler, EMPTY as empty, Observable, of } from "rxjs";
import { catchError, debounceTime, map, skip, switchMap, takeUntil } from "rxjs/operators";
import { CompanyService } from "./../../../service/company.service";
import { CompanyApiActions } from "../portfolio-company";
import { FindCompanyActions } from "../search";
import { Company } from "./../../../domain/company.model";

@Injectable()
export class CompanyEffects {
    @Effect()
    search$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<Action> =>
        this.actions$.pipe(
            ofType(FindCompanyActions.searchCompanies.type),
            debounceTime(debounce, scheduler),
            switchMap(({ query }) => {
                if (query === "") {
                    return empty;
                }

                const nextSearch$ = this.actions$.pipe(
                    ofType(FindCompanyActions.searchCompanies.type),
                    skip(1)
                );

                return this.companyService.searchCompanies(query).pipe(
                    takeUntil(nextSearch$),
                    map((companies: Company[]) => CompanyApiActions.searchSuccess({ companies })),
                    catchError((err) => of(CompanyApiActions.searchFailure({ errorMsg: err })))
                );
            })
        )

    constructor(private actions$: Actions<FindCompanyActions.FindCompanyPageActionsUnion>, private companyService: CompanyService) {}
}
