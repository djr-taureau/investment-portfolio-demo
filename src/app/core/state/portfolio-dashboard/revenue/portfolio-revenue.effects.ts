import { ChartDataPeriod } from "@core/domain/company.model";
import { PortfolioMetricTypes, PortfolioPerformanceChartDataRequest } from "@core/domain/portfolio.model";
import { PortfolioService } from "@core/service/portfolio.service";
import { PortfolioRevenueActionTypes } from "@core/state/portfolio-dashboard/revenue/portfolio-revenue.actions";
import { Observable, of } from "rxjs";
import { Action, select, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, withLatestFrom } from "rxjs/operators";
import { Injectable } from "@angular/core";
import * as PortfolioRevenueActions from "@core/state/portfolio-dashboard/revenue/portfolio-revenue.actions";
import * as fromPortfolioDashboard from "@core/state/portfolio-dashboard";
import * as _ from "lodash";

@Injectable()
export class PortfolioRevenueEffects {
    @Effect()
    getPortfolioRevenue$: Observable<Action> = this.actions$.pipe(
        ofType<PortfolioRevenueActions.Get>(PortfolioRevenueActionTypes.Get),
        withLatestFrom(this.store$.pipe(select(fromPortfolioDashboard.getSelectedPeriod))),
        map(
            ([action, period]): PortfolioPerformanceChartDataRequest => {
                // const date = action ? action.period.date : period ? period.date : "";
                const asof = _.get(action, "period.date", "2018-03-31");
                return {
                    id: action.payload.id,
                    date: asof,
                    metric_type: PortfolioMetricTypes.REVENUE
                };
            }
        ),
        exhaustMap((request) =>
            this.portfolioService.getPerformanceByMetric(request).pipe(
                map((result: any) => new PortfolioRevenueActions.GetSuccess(result as ChartDataPeriod)),
                catchError((error) => of(new PortfolioRevenueActions.GetFailure(error)))
            )
        )
    );

    /**
     * Constructor.
     * @param actions$
     * @param PortfolioService
     * @param store$
     */
    constructor(private actions$: Actions, private portfolioService: PortfolioService, private store$: Store<any>) {}
}
