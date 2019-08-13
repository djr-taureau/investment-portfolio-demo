import { CompanyService } from "@core/service/company.service";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { catchError, map, exhaustMap } from "rxjs/operators";
import { of, Observable } from "rxjs";

import * as RevenueActions from "./revenue.actions";
import { RevenueActionTypes, GetAllSuccess, GetAllFailure } from "@core/state/revenue/revenue.actions";
import { RevenueSeries } from "@app/core/domain/company.model";

@Injectable()
export class RevenueEffects {
    // TODO: TJM: Do we need this?
    // @Effect()
    // loadRevenues$: Observable<Action> = this.actions$.pipe(
    //     ofType<RevenueActions.GetAll>(RevenueActionTypes.GetAll),
    //     map((action) => action.payload),
    //     exhaustMap((companyId: string) =>
    //         this.companyService.getCompanyRevenue(companyId).pipe(
    //             map((result: RevenueSeries[]) => {
    //                 return new GetAllSuccess(result);
    //             }),
    //             catchError((error) => of(new GetAllFailure(error)))
    //         )
    //     )
    // );

    constructor(private actions$: Actions, private companyService: CompanyService) {}
}
