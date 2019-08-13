import { RevenueSeries } from "app/core/domain/company.model";
import { Action } from "@ngrx/store";

export enum RevenueActionTypes {
    GetAll = "[Revenue] Get All",
    GetAllFailure = "[Revenue] Get All Failure",
    GetAllSuccess = "[Revenue] Get All Success"
}

export class GetAll implements Action {
    readonly type = RevenueActionTypes.GetAll;
    constructor(public payload: string | number) {}
}

export class GetAllFailure implements Action {
    readonly type = RevenueActionTypes.GetAllFailure;
    constructor(public payload?: any) {}
}

export class GetAllSuccess implements Action {
    readonly type = RevenueActionTypes.GetAllSuccess;
    constructor(public payload: RevenueSeries[]) {}
}

export type RevenueActions = GetAll | GetAllFailure | GetAllSuccess;
