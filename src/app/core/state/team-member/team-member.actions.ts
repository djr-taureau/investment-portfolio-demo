import { TeamMember } from "@core/domain/company.model";
import { Action } from "@ngrx/store";

export enum TeamMemberActionTypes {
    GetTeamMember = "[Team] Get TeamMember",
    GetTeamMemberFailure = "[Team] Get  Failure TeamMember",
    GetTeamMemberSuccess = "[Team] Get Success TeamMember",
    SetSelectedTeamMember = "[Team] Set Selected TeamMember"
}

export class GetTeamMember implements Action {
    readonly type = TeamMemberActionTypes.GetTeamMember;
    constructor(public payload: any) {}
}

export class GetTeamMemberFailure implements Action {
    readonly type = TeamMemberActionTypes.GetTeamMemberFailure;
    constructor(public payload?: any) {}
}

export class GetTeamMemberSuccess implements Action {
    readonly type = TeamMemberActionTypes.GetTeamMemberSuccess;
    constructor(public payload: TeamMember) {}
}

export class SetSelectedTeamMember implements Action {
    readonly type = TeamMemberActionTypes.SetSelectedTeamMember;
    constructor(public payload: TeamMember) {}
}

export type TeamMemberActions = GetTeamMember | GetTeamMemberFailure | GetTeamMemberSuccess | SetSelectedTeamMember;
