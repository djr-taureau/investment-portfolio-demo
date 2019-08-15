import { CompanyRevenueRequest } from "@core/domain/company.model";
import { CompanyRevenueActionTypes } from "@core/state/company/revenue/company-revenue.actions";
import { Observable, of } from "rxjs";
import { Action, select, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, withLatestFrom } from "rxjs/operators";
import { CompanyService } from "@core/service/company.service";
import { Injectable } from "@angular/core";
import * as CompanyRevenueActions from "@core/state/company/revenue/company-revenue.actions";
import * as fromCompanyDashboard from "@core/state/company/dashboard";

@Injectable()
export class CompanyRevenueEffects {
    @Effect()
    getCompanyRevenue$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyRevenueActions.Get>(CompanyRevenueActionTypes.Get),
        withLatestFrom(this.store$.pipe(select(fromCompanyDashboard.getSelectedPeriod))),
        map(
            ([action, period]): CompanyRevenueRequest => {
                const date = action ? action.period.date : period ? period.date : "";
                return {
                    id: action.payload,
                    date
                };
            }
        ),
        exhaustMap((request) =>
            this.companyService.getCompanyRevenue(request).pipe(
                map((result: any) => new CompanyRevenueActions.GetSuccess(result)),
                catchError((error) => of(new CompanyRevenueActions.GetFailure(error)))
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
