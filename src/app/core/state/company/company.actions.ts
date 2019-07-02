import { Action } from "@ngrx/store";
import { Company } from "../../domain/company.model";

export enum CompanyActionTypes {
    GetAll = "[Company] Get All",
    GetAllFailure = "[Company] Get All Failure",
    GetAllSuccess = "[Company] Get All Success",
    Get = "[Company] Get",
    GetFailure = "[Company] Get Failure",
    GetSuccess = "[Company] Get Success",
    SetSelectedCompany = "[Company] Set Selected Company"
}

export class GetAll implements Action {
    readonly type = CompanyActionTypes.GetAll;
    constructor() {}
}

export class GetAllFailure implements Action {
    readonly type = CompanyActionTypes.GetAllFailure;
    constructor(public payload?: any) {}
}

export class GetAllSuccess implements Action {
    readonly type = CompanyActionTypes.GetAllSuccess;
    constructor(public payload: Company[]) {}
}

export class Get implements Action {
    readonly type = CompanyActionTypes.Get;
    constructor(public payload: string | number) {}
}

export class GetFailure implements Action {
    readonly type = CompanyActionTypes.GetFailure;
    constructor(public payload?: any) {}
}

export class GetSuccess implements Action {
    readonly type = CompanyActionTypes.GetSuccess;
    constructor(public payload: Company) {}
}

export class SetSelectedCompany implements Action {
    readonly type = CompanyActionTypes.SetSelectedCompany;
    constructor(public payload: number | string) {}
}

export type CompanyActions = GetAll | GetAllFailure | GetAllSuccess | Get | GetFailure | GetSuccess | SetSelectedCompany;
