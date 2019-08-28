import { PortfolioExposure, PortfolioExposureDataRequest } from "@core/domain/portfolio.model";
import { Action } from "@ngrx/store";

export enum PortfolioExposureActionTypes {
    LoadPortfolioRevenueFxExposures = "[Portfolio Revenue Fx Exposures] Load",
    LoadPortfolioRevenueFxExposuresFailure = "[Portfolio Revenue Fx Exposures] Load - Failure",
    LoadPortfolioRevenueFxExposuresSuccess = "[Portfolio Revenue Fx Exposures] Load - Success",
    LoadPortfolioRevenueSectorExposures = "[Portfolio Revenue Sector Exposures] Load",
    LoadPortfolioRevenueSectorExposuresFailure = "[Portfolio Revenue Sector Exposures] Load - Failure",
    LoadPortfolioRevenueSectorExposuresSuccess = "[Portfolio Revenue Sector Exposures] Load - Success"
}

export class LoadPortfolioRevenueFxExposures implements Action {
    readonly type = PortfolioExposureActionTypes.LoadPortfolioRevenueFxExposures;
    constructor(public payload: PortfolioExposureDataRequest) {}
}

export class LoadPortfolioRevenueFxExposuresFailure implements Action {
    readonly type = PortfolioExposureActionTypes.LoadPortfolioRevenueFxExposuresFailure;
    constructor(public payload?: any) {}
}

export class LoadPortfolioRevenueFxExposuresSuccess implements Action {
    readonly type = PortfolioExposureActionTypes.LoadPortfolioRevenueFxExposuresSuccess;
    constructor(public payload: PortfolioExposure[]) {}
}

export class LoadPortfolioRevenueSectorExposures implements Action {
    readonly type = PortfolioExposureActionTypes.LoadPortfolioRevenueSectorExposures;
    constructor(public payload: PortfolioExposureDataRequest) {}
}

export class LoadPortfolioRevenueSectorExposuresFailure implements Action {
    readonly type = PortfolioExposureActionTypes.LoadPortfolioRevenueSectorExposuresFailure;
    constructor(public payload?: any) {}
}

export class LoadPortfolioRevenueSectorExposuresSuccess implements Action {
    readonly type = PortfolioExposureActionTypes.LoadPortfolioRevenueSectorExposuresSuccess;
    constructor(public payload: PortfolioExposure[]) {}
}

export type PortfolioExposureActions =
    | LoadPortfolioRevenueFxExposures
    | LoadPortfolioRevenueFxExposuresFailure
    | LoadPortfolioRevenueFxExposuresSuccess
    | LoadPortfolioRevenueSectorExposures
    | LoadPortfolioRevenueSectorExposuresFailure
    | LoadPortfolioRevenueSectorExposuresSuccess;
