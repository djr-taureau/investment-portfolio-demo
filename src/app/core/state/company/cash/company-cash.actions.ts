import { Action } from "@ngrx/store";
import { CompanyCash } from "@core/domain/cash.model";

export enum CompanyCashActionTypes {
    GetCash = "[Company Cash] Get Cash",
    GetCashFailure = "[Company Cash] Get Cash - Failure",
    GetCashSuccess = "[Company Cash] Get Cash - Success"
}

export class GetCash implements Action {
    readonly type = CompanyCashActionTypes.GetCash;
    constructor(public payload: string, public period?) {}
}

export class GetCashFailure implements Action {
    readonly type = CompanyCashActionTypes.GetCashFailure;
    constructor(public payload: any) {}
}

export class GetCashSuccess implements Action {
    readonly type = CompanyCashActionTypes.GetCashSuccess;
    constructor(public payload: CompanyCash) {}
}

export type CompanyCashActions = GetCash | GetCashFailure | GetCashSuccess;
