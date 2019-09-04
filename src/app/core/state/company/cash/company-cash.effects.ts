import { CompanyChartDataRequest } from "@core/domain/company.model";
import { CompanyCash } from "@core/domain/cash.model";
import { CompanyCashActionTypes } from "@core/state/company/cash/company-cash.actions";
import { Observable, of } from "rxjs";
import { Action, select, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, withLatestFrom } from "rxjs/operators";
import { CompanyService } from "@core/service/company.service";
import { Injectable } from "@angular/core";
import * as fromCompanyDashboard from "@core/state/company/dashboard";
import * as CompanyCashActions from "@core/state/company/cash/company-cash.actions";

@Injectable()
export class CompanyCashEffects {
    @Effect()
    getCash$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyCashActions.GetCash>(CompanyCashActionTypes.GetCash),
        withLatestFrom(this.store$.pipe(select(fromCompanyDashboard.getSelectedPeriod))),
        map(
            ([action, period]): CompanyChartDataRequest => {
                const date = action ? action.period.date : period ? period.date : "";
                return {
                    id: action.payload,
                    date
                };
            }
        ),
        exhaustMap((request) =>
            this.companyService.getCash(request).pipe(
                map((result: CompanyCash) => new CompanyCashActions.GetCashSuccess(result)),
                catchError((error) => of(new CompanyCashActions.GetCashFailure(error)))
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
