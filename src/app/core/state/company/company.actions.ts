import { Action, createAction, props, union } from "@ngrx/store";
import { Company } from "../../domain/company.model";

export const loadCompany = createAction("[Company Exists Guard] Load Company", props<{ company: Company }>());
export const sortCompanies = createAction("[Company] Sort Company", props<{ sortValue: string }>());
export const sortCompaniesSuccess = createAction("[Company] Sort Company Success", props<{ sortValue: string }>());
export const setSelectedCompany = createAction("[Company] Set Selected Company", props<{ id: string }>());
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types and
 */

const all = union({
    loadCompany,
    sortCompanies,
    sortCompaniesSuccess,
    setSelectedCompany
});
export type CompanyActionsUnion = typeof all;
