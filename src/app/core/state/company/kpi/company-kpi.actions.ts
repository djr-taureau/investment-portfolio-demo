import { Action } from "@ngrx/store";

export enum CompanyKpiActionTypes {
    Get = "[CompanyKpi] Get",
    GetFailure = "[CompanyKpi] Get Failure",
    GetSuccess = "[CompanyKpi] Get Success"
}

export class Get implements Action {
    readonly type = CompanyKpiActionTypes.Get;
    constructor(public payload: string, public period?) {}
}

export class GetSuccess implements Action {
    readonly type = CompanyKpiActionTypes.GetSuccess;
    // TODO: BMR: What type is the payload?
    constructor(public payload: any) {}
}

export class GetFailure implements Action {
    readonly type = CompanyKpiActionTypes.GetFailure;
    // TODO: BMR: What type is the payload?
    constructor(public payload?: any) {}
}

export type CompanyKpiActions = Get | GetFailure | GetSuccess;
