import { Person } from "@core/domain/company.model";
import { CompanyDocumentTypeEnum, CompanyDocument } from "@core/domain/document.model";
import { Action } from "@ngrx/store";

export enum CompanyDocumentActionTypes {
    GetAllDocuments = "[Company Documents] Get All Documents",
    GetAllDocumentsFailure = "[Company Documents] Get All Documents - Failure",
    GetAllDocumentsSuccess = "[Company Documents] Get All Documents - Success",
    FilterByOwner = "[Company Documents] Filter By Owner",
    FilterByType = "[Company Documents] Filer By Type"
}

export class GetAllDocuments implements Action {
    readonly type = CompanyDocumentActionTypes.GetAllDocuments;
    constructor(public payload: string) {}
}

export class GetAllDocumentsFailure implements Action {
    readonly type = CompanyDocumentActionTypes.GetAllDocumentsFailure;
    constructor(public payload: any) {}
}

export class GetAllDocumentsSuccess implements Action {
    readonly type = CompanyDocumentActionTypes.GetAllDocumentsSuccess;
    constructor(public payload: CompanyDocument[]) {}
}

export class FilterByOwner implements Action {
    readonly type = CompanyDocumentActionTypes.FilterByOwner;
    constructor(public payload: Person) {}
}

export class FilterByType implements Action {
    readonly type = CompanyDocumentActionTypes.FilterByType;
    constructor(public payload: CompanyDocumentTypeEnum) {}
}

export type CompanyDocumentsActions = GetAllDocuments | GetAllDocumentsFailure | GetAllDocumentsSuccess | FilterByOwner | FilterByType;
