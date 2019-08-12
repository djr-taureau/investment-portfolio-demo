import { GetAllCompanyInitiativesResponse } from "@core/domain/company.model";
import { Initiative } from "@core/domain/initiative.model";
import { CompanyInitiativeActionTypes } from "@core/state/company/dashboard/company-initiative.actions";
import * as CompanyInitiativeActions from "@core/state/company/dashboard/company-initiative.actions";
import { Observable, of } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, concatMap } from "rxjs/operators";
import { CompanyService } from "@core/service/company.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CompanyInitiativeEffects {
    @Effect()
    getInitiatives$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyInitiativeActions.GetAllInitiatives>(CompanyInitiativeActionTypes.GetAllInitiatives),
        exhaustMap(() =>
            this.companyService.getCompanyInitiatives().pipe(
                map((result: Initiative[]) => {
                    return new CompanyInitiativeActions.GetAllInitiativesSuccess({ data: result } as GetAllCompanyInitiativesResponse);
                }),
                catchError((error) => of(new CompanyInitiativeActions.GetAllInitiativesFailure(error)))
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
