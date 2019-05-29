import { Action, createAction, props } from "@ngrx/store";
import { Company } from "../../../domain/company.model";

export const loadCompany = createAction("[Company Exists Guard] Load Company", props<{ company: Company }>());

export enum CompanyActionTypes {
    Search = "[Company] Search",
    SearchComplete = "[Company] Search Complete",
    SearchError = "[Company] Search Error",
    Load = "[Company] Load",
    Select = "[Company] Select"
}
export class Search implements Action {
    readonly type = CompanyActionTypes.Search;

    constructor(public payload: string) {}
}

export class SearchComplete implements Action {
    readonly type = CompanyActionTypes.SearchComplete;

    constructor(public payload: Company[]) {}
}

export class SearchError implements Action {
    readonly type = CompanyActionTypes.SearchError;

    constructor(public payload: string) {}
}

export class Load implements Action {
    readonly type = CompanyActionTypes.Load;

    constructor(public payload: Company) {}
}

export class Select implements Action {
    readonly type = CompanyActionTypes.Select;

    constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CompanyActions = Search | SearchComplete | SearchError | Load | Select;

export type CompanyActionsUnion = ReturnType<typeof loadCompany>;
