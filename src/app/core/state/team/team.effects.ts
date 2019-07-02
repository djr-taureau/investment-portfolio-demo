import * as TeamActions from "./team.actions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { asyncScheduler, EMPTY as empty, Observable, of } from "rxjs";
import { catchError, debounceTime, exhaustMap, map, skip, switchMap, takeUntil } from "rxjs/operators";
import { GetAllTeamsResponse } from "@core/domain/company.model";
import { TeamActionTypes, GetAllFailure, GetAllSuccess } from "@core/state/team/team.actions";
import { TeamService } from "@core/service/team.service";
import { Injectable } from "@angular/core";
import { PortfolioActionTypes, SearchCompanyFailure, SearchCompanySuccess } from "@core/state/portfolio-dashboard/portfolio-dashboard.actions";

@Injectable()
export class TeamEffects {
    @Effect()
    getTeams$: Observable<Action> = this.actions$.pipe(
        ofType<TeamActions.GetAll>(TeamActionTypes.GetAll),
        map((action) => action.payload),
        exhaustMap((companyId: string) =>
            this.teamService.getTeams(companyId).pipe(
                map((result: GetAllTeamsResponse) => {
                    return new GetAllSuccess(result.data.teams);
                }),
                catchError((error) => of(new GetAllFailure(error)))
            )
        )
    );

    // @Effect()
    // search$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<Action> =>
    //     this.actions$.pipe(
    //         ofType(PortfolioActionTypes.SearchCompany),
    //         debounceTime(debounce, scheduler),
    //         switchMap(({ query }) => {
    //             if (query === "") {
    //                 return empty;
    //             }

    //             const nextSearch$ = this.actions$.pipe(
    //                 ofType(PortfolioActionTypes.SearchCompany),
    //                 skip(1)
    //             );

    //             return this.companyService.searchCompanies(query).pipe(
    //                 takeUntil(nextSearch$),
    //                 map((companies: Company[]) => new SearchCompanySuccess(companies)),
    //                 catchError((err) => of(new SearchCompanyFailure(err)))
    //             );
    //         })
    //     )

    constructor(private actions$: Actions, private teamService: TeamService, private store$: Store<any>) {}
}
