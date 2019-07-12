import { take } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { Valuation } from "@app/core/domain/company.model";

export enum ValuationActionTypes {
    GetAll = "[Valuation] Get All",
    GetAllFailure = "[Valuation] Get All Failure",
    GetAllSuccess = "[Valuation] Get All Success",
    SetSelectedValuation = "[Valuation] Set Selected Valuation"
}

export class GetAll implements Action {
    readonly type = ValuationActionTypes.GetAll;
    constructor(public payload: string | number) {}
}

export class GetAllSuccess implements Action {
    readonly type = ValuationActionTypes.GetAllSuccess;
    constructor(public payload: Valuation) {}
}

export class GetAllFailure implements Action {
    readonly type = ValuationActionTypes.GetAllFailure;
    constructor(public payload?: string) {}
}

export class SetSelectedValuation implements Action {
    readonly type = ValuationActionTypes.SetSelectedValuation;
    constructor(public payload: string) {}
}

export type ValuationActions = GetAll | GetAllSuccess | GetAllFailure | SetSelectedValuation;
