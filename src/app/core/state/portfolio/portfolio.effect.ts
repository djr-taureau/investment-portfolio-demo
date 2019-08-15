import { Injectable } from "@angular/core";
import { Portfolio, PortfolioInvestmentSummary } from "@core/domain/portfolio.model";
import { PortfolioService } from "@core/service/portfolio.service";
import { PortfolioActionTypes } from "@core/state/portfolio/portfolio.actions";
import * as PortfolioActions from "@core/state/portfolio/portfolio.actions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, concatMap, exhaustMap, map } from "rxjs/operators";

@Injectable()
export class PortfolioEffect {
    @Effect()
    loadPortfolio$: Observable<Action> = this.actions$.pipe(
        ofType<PortfolioActions.LoadPortfolio>(PortfolioActionTypes.LoadPortfolio),
        map((action) => action.payload),
        exhaustMap((id: string) =>
            this.portfolioService.getPortfolio(id).pipe(
                concatMap((result: Portfolio) => {
                    return [new PortfolioActions.LoadPortfolioSuccess(result)];
                }),
                catchError((error) => of(new PortfolioActions.LoadPortfolioFailure(error)))
            )
        )
    );

    @Effect()
    loadPortfolioInvestmentSymary$: Observable<Action> = this.actions$.pipe(
        ofType<PortfolioActions.LoadPortfolioInvestmentSummary>(PortfolioActionTypes.LoadPortfolioInvestmentSummary),
        map((action) => action.payload),
        exhaustMap((payload: { id: string; asof: string }) =>
            this.portfolioService.getInvestmentSummary(payload.id, payload.asof).pipe(
                concatMap((result: PortfolioInvestmentSummary) => {
                    return [new PortfolioActions.LoadPortfolioInvestmentSummarySuccess(result)];
                }),
                catchError((error) => of(new PortfolioActions.LoadPortfolioInvestmentSummaryFailure(error)))
            )
        )
    );

    constructor(private actions$: Actions, private store$: Store<any>, private portfolioService: PortfolioService) {}
}
