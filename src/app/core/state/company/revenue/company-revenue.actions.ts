import { Action } from "@ngrx/store";

export enum CompanyRevenueActionTypes {
    Get = "[Company Revenue] Get",
    GetFailure = "[Company Revenue] Get - Failure",
    GetSuccess = "[Company Revenue] Get - Success"
}

export class Get implements Action {
    readonly type = CompanyRevenueActionTypes.Get;
    constructor(public payload: string, public period?) {}
}

export class GetSuccess implements Action {
    readonly type = CompanyRevenueActionTypes.GetSuccess;
    // TODO: BMR: What type is the payload?
    constructor(public payload: any) {}
}

export class GetFailure implements Action {
    readonly type = CompanyRevenueActionTypes.GetFailure;
    // TODO: BMR: What type is the payload?
    constructor(public payload?: any) {}
}

export type CompanyRevenueActions = Get | GetFailure | GetSuccess;
