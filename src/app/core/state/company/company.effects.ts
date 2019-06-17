import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { asyncScheduler, EMPTY as empty, Observable, of } from "rxjs";
import { catchError, debounceTime, map, skip, switchMap, takeUntil } from "rxjs/operators";
import { CompanyService } from "@core/service/company.service";
import { CompanyApiActions } from "./index";
import { FindCompanyActions } from "../portfolio/search";
import { Company } from "@core/domain/company.model";

@Injectable()
export class CompanyEffects {
    @Effect()
    search$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<Action> =>
        this.actions$.pipe(
            ofType(FindCompanyActions.filterCompanies.type),
            debounceTime(debounce, scheduler),
            switchMap(({ query }) => {
                if (query === "") {
                    return empty;
                }

                const nextSearch$ = this.actions$.pipe(
                    ofType(FindCompanyActions.filterCompanies.type),
                    skip(1)
                );

                return this.companyService.searchCompanies(query).pipe(
                    takeUntil(nextSearch$),
                    map((companies: Company[]) => CompanyApiActions.searchSuccess({ companies })),
                    catchError((err) => of(CompanyApiActions.searchFailure({ errorMsg: err })))
                );
            })
        )

    constructor(private actions$: Actions<FindCompanyActions.FindCompanyActionsUnion>, private companyService: CompanyService) {}
}
