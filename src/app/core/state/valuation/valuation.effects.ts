import { Valuation } from "@app/core/domain/company.model";
import { concatMap, catchError } from "rxjs/operators";
import { ValuationService } from "./../../service/valuation.service";
import { Actions, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Effect } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import * as ValuationActions from "./valuation.actions";
import { ValuationActionTypes } from "./valuation.actions";
import { map, exhaustMap } from "rxjs/operators";

@Injectable()
export class ValuationEffects {
    @Effect()
    getAllValuations$: Observable<Action> = this.actions$.pipe(
        ofType<ValuationActions.GetAll>(ValuationActionTypes.GetAll),
        map((action) => action.payload),
        exhaustMap((companyId: string) =>
            this.valuationService.getValuations(companyId).pipe(
                concatMap((result: Valuation) => [
                    new ValuationActions.GetAllSuccess(result),
                    new ValuationActions.SetSelectedValuation(result.companyId)
                ]),
                catchError((error) => of(new ValuationActions.GetAllFailure(error)))
            )
        )
    );

    constructor(private actions$: Actions, private valuationService: ValuationService) {}
}
