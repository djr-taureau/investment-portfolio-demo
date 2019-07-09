import { Action } from "@ngrx/store";
import { Company } from "@core/domain/company.model";
import { CompanyActionTypes } from "../company/company.actions";

export enum PortfolioActionTypes {
    LoadPortfolio = "[PortCo List] Load Portfolio",
    LoadPortfolioFailure = "[PortCo List] Load Portfolio - Failure",
    LoadPortfolioSuccess = "[PortCo List] Load Portfolio - Success",
    SearchCompany = "[PortCo List] Company Search",
    SearchCompanyFailure = "[PortCo List] Company Search - Failure",
    SearchCompanySuccess = "[PortCo List] Company Search - Success"
}

export class LoadPortfolio implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolio;
    constructor(public payload?: any) {}
}
export class LoadPortfolioFailure implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioFailure;
    constructor(public payload?: any) {}
}
export class LoadPortfolioSuccess implements Action {
    readonly type = PortfolioActionTypes.LoadPortfolioSuccess;
    constructor(public payload?: any) {}
}

export class SearchCompany implements Action {
    readonly type = PortfolioActionTypes.SearchCompany;
    constructor(public payload: string) {}
}

export class SearchCompanyFailure implements Action {
    readonly type = PortfolioActionTypes.SearchCompanyFailure;
    constructor(public payload: any) {}
}

export class SearchCompanySuccess implements Action {
    readonly type = PortfolioActionTypes.SearchCompanySuccess;
    constructor(public payload: Company[]) {}
}
export type PortfolioDashboardActions =
    | LoadPortfolio
    | LoadPortfolioFailure
    | LoadPortfolioSuccess
    | SearchCompany
    | SearchCompanyFailure
    | SearchCompanySuccess;
