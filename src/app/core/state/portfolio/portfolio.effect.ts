import { Injectable } from "@angular/core";
import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { Portfolio, PortfolioInvestmentSummary } from "@core/domain/portfolio.model";
import { PortfolioService } from "@core/service/portfolio.service";
import * as CompanyActions from "@core/state/company/company.actions";
import { DashboardAsOfDateChanged, LoadPortfolioFlowSuccess } from "@core/state/flow/portfolio-flow.actions";
import { PortfolioActionTypes } from "@core/state/portfolio/portfolio.actions";
import * as PortfolioActions from "@core/state/portfolio/portfolio.actions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import * as _ from "lodash";
import moment from "moment";
import { Observable, of } from "rxjs";
import { catchError, concatMap, exhaustMap, map } from "rxjs/operators";
import * as ObjectUtil from "@util/object.util";
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
    getPortfolioSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<PortfolioActions.LoadPortfolioSuccess>(PortfolioActionTypes.LoadPortfolioSuccess),
        map((action) => action.payload),
        concatMap((result: Portfolio) => {
            if (!result) {
                return [];
            }
            const actions = [];
            actions.push(new LoadPortfolioFlowSuccess(result));
            const portfolio = result as Portfolio;
            let periods: any[] = ObjectUtil.getNestedPropIfExists(portfolio, ["funds", "0", "availablePeriods"], []);
            periods = periods.map((p: string) => {
                const asDate = new Date(p);
                const qtr = moment(asDate).quarter();
                return {
                    date: p,
                    id: asDate.getFullYear(),
                    quarterLabel: "CQ" + String(qtr) + " " + asDate.getFullYear(),
                    yearLabel: "CY " + asDate.getFullYear()
                } as SelectorPeriod;
            });
            const lastPeriod = _.takeRight(periods, 1)[0] as SelectorPeriod;
            if (lastPeriod) {
                actions.push(new DashboardAsOfDateChanged(lastPeriod));
            }
            return actions;
        }),
        catchError((error) => of(new CompanyActions.GetFailure(error)))
    );

    @Effect()
    loadPortfolioInvestmentSummary$: Observable<Action> = this.actions$.pipe(
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
