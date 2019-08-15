import { Action } from "@ngrx/store";
import { Company } from "@core/domain/company.model";

export enum PortfolioCompanyListActionTypes {
    LoadPortfolioCompanies = "[PortCo List] Load Portfolio Companies",
    LoadPortfolioCompaniesFailure = "[PortCo List] Load Portfolio Companies - Failure",
    LoadPortfolioCompaniesSuccess = "[PortCo List] Load Portfolio Companies - Success",

    SearchCompany = "[PortCo List] Company Search",
    SearchCompanyFailure = "[PortCo List] Company Search - Failure",
    SearchCompanySuccess = "[PortCo List] Company Search - Success"
}

export class LoadPortfolioCompanies implements Action {
    readonly type = PortfolioCompanyListActionTypes.LoadPortfolioCompanies;
    constructor(public payload?: any) {}
}
export class LoadPortfolioCompaniesFailure implements Action {
    readonly type = PortfolioCompanyListActionTypes.LoadPortfolioCompaniesFailure;
    constructor(public payload?: any) {}
}
export class LoadPortfolioCompaniesSuccess implements Action {
    readonly type = PortfolioCompanyListActionTypes.LoadPortfolioCompaniesSuccess;
    constructor(public payload?: any) {}
}

export class SearchCompany implements Action {
    readonly type = PortfolioCompanyListActionTypes.SearchCompany;
    constructor(public payload: string) {}
}

export class SearchCompanyFailure implements Action {
    readonly type = PortfolioCompanyListActionTypes.SearchCompanyFailure;
    constructor(public payload: any) {}
}

export class SearchCompanySuccess implements Action {
    readonly type = PortfolioCompanyListActionTypes.SearchCompanySuccess;
    constructor(public payload: Company[]) {}
}
export type PortfolioCompanyListActions =
    | LoadPortfolioCompanies
    | LoadPortfolioCompaniesFailure
    | LoadPortfolioCompaniesSuccess
    | SearchCompany
    | SearchCompanyFailure
    | SearchCompanySuccess;
