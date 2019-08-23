import { ChartDataPeriod } from "@core/domain/company.model";
import { PortfolioMetricTypes, PortfolioPerformanceChartDataRequest } from "@core/domain/portfolio.model";
import { PortfolioService } from "@core/service/portfolio.service";
import { PortfolioEbitdaActionTypes } from "@core/state/portfolio-dashboard/ebitda/portfolio-ebitda.actions";
import * as _ from "lodash";
import { Observable, of } from "rxjs";
import { Action, select, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, withLatestFrom } from "rxjs/operators";
import { Injectable } from "@angular/core";
import * as PortfolioEbitdaActions from "@core/state/portfolio-dashboard/ebitda/portfolio-ebitda.actions";
import * as fromPortfolioDashboard from "@core/state/portfolio-dashboard";

@Injectable()
export class PortfolioEbitdaEffects {
    @Effect()
    getPortfolioEbitda$: Observable<Action> = this.actions$.pipe(
        ofType<PortfolioEbitdaActions.Get>(PortfolioEbitdaActionTypes.Get),
        withLatestFrom(this.store$.pipe(select(fromPortfolioDashboard.getSelectedPeriod))),
        map(
            ([action, period]): PortfolioPerformanceChartDataRequest => {
                // const date = action ? action.period.date : period ? period.date : "";
                const asof = _.get(action, "period.date", "2018-03-31");
                return {
                    id: action.payload.id,
                    date: asof,
                    metric_type: PortfolioMetricTypes.EBITDA
                };
            }
        ),
        exhaustMap((request) =>
            this.portfolioService.getPerformanceByMetric(request).pipe(
                map((result: any) => new PortfolioEbitdaActions.GetSuccess(result as ChartDataPeriod)),
                catchError((error) => of(new PortfolioEbitdaActions.GetFailure(error)))
            )
        )
    );

    /**
     * Constructor.
     * @param actions$
     * @param companyService
     * @param store$
     */
    constructor(private actions$: Actions, private portfolioService: PortfolioService, private store$: Store<any>) {}
}
