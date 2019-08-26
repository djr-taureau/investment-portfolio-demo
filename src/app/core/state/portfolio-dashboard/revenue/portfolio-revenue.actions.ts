import { ChartDataPeriod } from "@core/domain/company.model";
import { Action } from "@ngrx/store";

export enum PortfolioRevenueActionTypes {
    Get = "[Portfolio Revenue] Get",
    GetFailure = "[Portfolio Revenue] Get - Failure",
    GetSuccess = "[Portfolio Revenue] Get - Success"
}

export class Get implements Action {
    readonly type = PortfolioRevenueActionTypes.Get;
    constructor(public payload: { id: string; asOf?: string }) {}
}

export class GetSuccess implements Action {
    readonly type = PortfolioRevenueActionTypes.GetSuccess;
    constructor(public payload: ChartDataPeriod) {}
}

export class GetFailure implements Action {
    readonly type = PortfolioRevenueActionTypes.GetFailure;
    // TODO: BMR: What type is the payload?
    constructor(public payload?: any) {}
}

export type PortfolioRevenueActions = Get | GetFailure | GetSuccess;
