import { Action } from "@ngrx/store";

export enum CompanyEbitdaActionTypes {
    Get = "[CompanyEbitda] Get",
    GetFailure = "[CompanyEbitda] Get Failure",
    GetSuccess = "[CompanyEbitda] Get Success"
}

export class Get implements Action {
    readonly type = CompanyEbitdaActionTypes.Get;
    constructor(public payload: string, public period?) {}
}

export class GetSuccess implements Action {
    readonly type = CompanyEbitdaActionTypes.GetSuccess;
    // TODO: BMR: What type is the payload?
    constructor(public payload: any) {}
}

export class GetFailure implements Action {
    readonly type = CompanyEbitdaActionTypes.GetFailure;
    // TODO: BMR: What type is the payload?
    constructor(public payload?: any) {}
}

export type CompanyEbitdaActions = Get | GetFailure | GetSuccess;
