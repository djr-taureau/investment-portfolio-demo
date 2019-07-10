import { OpenTeamMemberDetailPanel } from "@core/state/flow/company-flow.actions";
import * as TeamMemberActions from "./team-member.actions";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, concatMap } from "rxjs/operators";
import { GetTeamMemberResponse } from "@core/domain/company.model";
import { GetTeamMemberSuccess, GetTeamMemberFailure } from "./../team-member/team-member.actions";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { TeamMemberActionTypes } from "@core/state/team-member/team-member.actions";
import { TeamService } from "@core/service/team.service";

@Injectable()
export class TeamMemberEffects {
    @Effect()
    getTeamMember$: Observable<Action> = this.actions$.pipe(
        ofType<TeamMemberActions.GetTeamMember>(TeamMemberActionTypes.GetTeamMember),
        map((action) => action.payload),
        exhaustMap((request: any) =>
            this.teamService.getTeamMember(request.memberId, request.companyId).pipe(
                concatMap((result: GetTeamMemberResponse) => [new GetTeamMemberSuccess(result.data), new OpenTeamMemberDetailPanel(result.data)]),
                catchError((error) => of(new GetTeamMemberFailure(error)))
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
