import { TeamMemberGroup } from "./../../domain/company.model";
import { Action, createAction, props, union } from "@ngrx/store";
import { Team } from "../../domain/company.model";

export enum TeamActionTypes {
    GetAll = "[Team] Get All",
    GetAllFailure = "[Team] Get All Failure",
    GetAllSuccess = "[Team] Get All Success",
    GetTeamMember = "[Team] Get TeamMember",
    GetTeamMemberFailure = "[Team] Get  Failure TeamMember",
    GetTeamMemberSuccess = "[Team] Get Success TeamMember"
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

export class GetTeamMember implements Action {
    readonly type = TeamActionTypes.GetTeamMember;
    constructor(public payload: string | number) {}
}

export class GetTeamMemberFailure implements Action {
    readonly type = TeamActionTypes.GetTeamMemberFailure;
    constructor(public payload?: any) {}
}

export class GetTeamMemberSuccess implements Action {
    readonly type = TeamActionTypes.GetTeamMemberSuccess;
    constructor(public payload: Team) {}
}

export type TeamActions = GetAll | GetAllFailure | GetAllSuccess | GetTeamMember | GetTeamMemberFailure | GetTeamMemberSuccess;
