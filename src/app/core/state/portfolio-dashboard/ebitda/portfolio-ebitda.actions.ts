import { Action } from "@ngrx/store";

export enum PortfolioEbitdaActionTypes {
    Get = "[Portfolio Ebitda] Get",
    GetFailure = "[Portfolio Ebitda] Get Failure",
    GetSuccess = "[Portfolio Ebitda] Get Success"
}

export class Get implements Action {
    readonly type = PortfolioEbitdaActionTypes.Get;
    constructor(public payload: { id: string; asOf?: string }) {}
}

export class GetSuccess implements Action {
    readonly type = PortfolioEbitdaActionTypes.GetSuccess;
    // TODO: BMR: What type is the payload?
    constructor(public payload: any) {}
}

export class GetFailure implements Action {
    readonly type = PortfolioEbitdaActionTypes.GetFailure;
    // TODO: BMR: What type is the payload?
    constructor(public payload?: any) {}
}

export type PortfolioEbitdaActions = Get | GetFailure | GetSuccess;
