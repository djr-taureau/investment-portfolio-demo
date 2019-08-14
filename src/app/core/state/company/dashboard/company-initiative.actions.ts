import { GetAllCompanyInitiativesResponse, Person } from "@core/domain/company.model";
import { Initiative, InitiativeStatusEnum } from "@core/domain/initiative.model";
import { Action } from "@ngrx/store";

export enum CompanyInitiativeActionTypes {
    GetAllInitiatives = "[Company Initiatives] Get All Initiatives",
    GetAllInitiativesFailure = "[Company Initiatives] Get All Initiatives - Failure",
    GetAllInitiativesSuccess = "[Company Initiatives] Get All Initiatives - Success",
    FilterByOwner = "[Company Initiatives] Filter By Owner",
    FilterByStatus = "[Company Initiatives] Filer By Status"
}

export class GetAllInitiatives implements Action {
    readonly type = CompanyInitiativeActionTypes.GetAllInitiatives;
    constructor(public payload: any) {}
}

export class GetAllInitiativesFailure implements Action {
    readonly type = CompanyInitiativeActionTypes.GetAllInitiativesFailure;
    constructor(public payload: any) {}
}

export class GetAllInitiativesSuccess implements Action {
    readonly type = CompanyInitiativeActionTypes.GetAllInitiativesSuccess;
    constructor(public payload: Initiative[]) {}
}

export class FilterByOwner implements Action {
    readonly type = CompanyInitiativeActionTypes.FilterByOwner;
    constructor(public payload: Person) {}
}

export class FilterByStatus implements Action {
    readonly type = CompanyInitiativeActionTypes.FilterByStatus;
    constructor(public payload: InitiativeStatusEnum) {}
}

export type CompanyInitiativeActions = GetAllInitiatives | GetAllInitiativesFailure | GetAllInitiativesSuccess | FilterByOwner | FilterByStatus;
