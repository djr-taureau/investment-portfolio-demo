import { Injectable } from "@angular/core";
import { PortfolioExposure } from "@core/domain/portfolio.model";
import { PortfolioService } from "@core/service/portfolio.service";
import { PortfolioExposureActionTypes } from "@core/state/portfolio-dashboard/exposures/portfolio-exposure.actions";
import * as PortfolioExposureActions from "@core/state/portfolio-dashboard/exposures/portfolio-exposure.actions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import * as _ from "lodash";
import { Observable, of } from "rxjs";
import { catchError, concatMap, exhaustMap, map } from "rxjs/operators";

@Injectable()
export class PortfolioExposureEffect {
    @Effect()
    loadPortfolioFxExposure$: Observable<Action> = this.actions$.pipe(
        ofType<PortfolioExposureActions.LoadPortfolioRevenueFxExposures>(PortfolioExposureActionTypes.LoadPortfolioRevenueFxExposures),
        map((action) => action.payload),
        exhaustMap((payload) =>
            this.portfolioService.getExposureByMetric(payload).pipe(
                concatMap((result) => {
                    const exposures = (result || []).map((exp: PortfolioExposure) => {
                        return _.extend(exp, {
                            id: payload.metric_type + "_" + payload.by + "_" + exp.label,
                            type: payload.by,
                            metric: payload.metric_type
                        });
                    });
                    return [new PortfolioExposureActions.LoadPortfolioRevenueFxExposuresSuccess(exposures)];
                }),
                catchError((error) => of(new PortfolioExposureActions.LoadPortfolioRevenueFxExposuresFailure(error)))
            )
        )
    );

    @Effect()
    loadPortfolioSectorExposure$: Observable<Action> = this.actions$.pipe(
        ofType<PortfolioExposureActions.LoadPortfolioRevenueSectorExposures>(PortfolioExposureActionTypes.LoadPortfolioRevenueSectorExposures),
        map((action) => action.payload),
        exhaustMap((payload) =>
            this.portfolioService.getExposureByMetric(payload).pipe(
                concatMap((result) => {
                    const exposures = (result || []).map((exp: PortfolioExposure) => {
                        return _.extend(exp, {
                            id: payload.metric_type + "_" + payload.by + "_" + exp.label,
                            type: payload.by,
                            metric: payload.metric_type
                        });
                    });
                    return [new PortfolioExposureActions.LoadPortfolioRevenueSectorExposuresSuccess(exposures)];
                }),
                catchError((error) => of(new PortfolioExposureActions.LoadPortfolioRevenueSectorExposuresFailure(error)))
            )
        )
    );

    constructor(private actions$: Actions, private store$: Store<any>, private portfolioService: PortfolioService) {}
}
