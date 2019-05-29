import { createAction, union, props } from "@ngrx/store";
import { Company } from "../../../domain/company.model";

export const searchSuccess = createAction("[Companies/API] Search Success", props<{ companies: Company[] }>());

export const searchFailure = createAction("[Companies/API] Search Failure", props<{ errorMsg: string }>());

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({ searchSuccess, searchFailure });
export type CompaniesApiActionsUnion = typeof all;
