import {
    Portfolio,
    PortfolioInvestmentSummary,
    PortfolioRelativePerformance,
    PortfolioRelativePerformanceRequest
} from "@core/domain/portfolio.model";
import { Action } from "@ngrx/store";
import { Company } from "@core/domain/company.model";
import { CompanyActionTypes } from "../company/company.actions";

export enum PortfolioActionTypes {
    LoadPortfolio = "[Portfolio] Load",
    LoadPortfolioFailure = "[Portfolio] Load - Failure",
    LoadPortfolioSuccess = "[Portfolio] Load - Success",

    LoadPortfolioInvestmentSummary = "[Portfolio] Load Investment Summary",
    LoadPortfolioInvestmentSummaryFailure = "[Portfolio] Load Investment Summary- Success",
    LoadPortfolioInvestmentSummarySuccess = "[Portfolio] Load Investment Summary- Success",

    LoadPortfolioRelativePerformance = "[Portfolio] Load Relative Performance",
    LoadPortfolioRelativePerformanceFailure = "[Portfolio] Load Relative Performance - Success",
    LoadPortfolioRelativePerformanceSuccess = "[Portfolio] Load Relative Performance - Success"
}

export class LoadPortfolio implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolio;
    constructor(public payload: string) {}
}

export class LoadPortfolioFailure implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioFailure;
    constructor(public payload?: any) {}
}

export class LoadPortfolioSuccess implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioSuccess;
    constructor(public payload: Portfolio) {}
}

export class LoadPortfolioInvestmentSummary implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioInvestmentSummary;
    constructor(public payload: { id: string; asOf?: string }) {}
}

export class LoadPortfolioInvestmentSummaryFailure implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioInvestmentSummaryFailure;
    constructor(public payload?: any) {}
}

export class LoadPortfolioInvestmentSummarySuccess implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioInvestmentSummarySuccess;
    constructor(public payload: PortfolioInvestmentSummary) {}
}

export class LoadPortfolioRelativePerformance implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioRelativePerformance;
    constructor(public payload: PortfolioRelativePerformanceRequest) {}
}

export class LoadPortfolioRelativePerformanceFailure implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioRelativePerformanceFailure;
    constructor(public payload?: any) {}
}

export class LoadPortfolioRelativePerformanceSuccess implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioRelativePerformanceSuccess;
    constructor(public payload: PortfolioRelativePerformance) {}
}

export type PortfolioActions =
    | LoadPortfolio
    | LoadPortfolioFailure
    | LoadPortfolioSuccess
    | LoadPortfolioInvestmentSummary
    | LoadPortfolioInvestmentSummaryFailure
    | LoadPortfolioInvestmentSummarySuccess
    | LoadPortfolioRelativePerformance
    | LoadPortfolioRelativePerformanceFailure
    | LoadPortfolioRelativePerformanceSuccess;
