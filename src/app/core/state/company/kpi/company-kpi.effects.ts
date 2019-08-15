import { CompanyChartDataRequest } from "@core/domain/company.model";
import { CompanyKpiActionTypes } from "@core/state/company/kpi/company-kpi.actions";
import { Observable, of } from "rxjs";
import { Action, select, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, withLatestFrom } from "rxjs/operators";
import { CompanyService } from "@core/service/company.service";
import { Injectable } from "@angular/core";
import * as CompanyKpiActions from "@core/state/company/kpi/company-kpi.actions";
import * as fromCompanyDashboard from "@core/state/company/dashboard";

@Injectable()
export class CompanyKpiEffects {
    @Effect()
    getCompanyKpi$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyKpiActions.Get>(CompanyKpiActionTypes.Get),
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
            this.companyService.getKpi(request).pipe(
                map((result: any) => new CompanyKpiActions.GetSuccess(result)),
                catchError((error) => of(new CompanyKpiActions.GetFailure(error)))
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
