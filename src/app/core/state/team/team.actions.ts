import { TeamMemberGroup, TeamMember } from "./../../domain/company.model";
import { Action, createAction, props, union } from "@ngrx/store";
import { Team } from "../../domain/company.model";

export enum TeamActionTypes {
    GetAll = "[Team] Get All",
    GetAllFailure = "[Team] Get All Failure",
    GetAllSuccess = "[Team] Get All Success",
    SetSelectedTeamMemberGroup = "[Team] Set Selected TeamMemberGroup"
}

export class GetAll implements Action {
    readonly type = TeamActionTypes.GetAll;
    constructor(public payload: string | number) {}
}

export class GetAllFailure implements Action {
    readonly type = TeamActionTypes.GetAllFailure;
    constructor(public payload?: any) {}
}

export class GetAllSuccess implements Action {
    readonly type = TeamActionTypes.GetAllSuccess;
    constructor(public payload: TeamMemberGroup[]) {}
}

export class SetSelectedTeamMemberGroup implements Action {
    readonly type = TeamActionTypes.SetSelectedTeamMemberGroup;
    constructor(public payload: TeamMemberGroup) {}
}

export type TeamActions = GetAll | GetAllFailure | GetAllSuccess | SetSelectedTeamMemberGroup;
