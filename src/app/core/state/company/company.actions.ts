import { Action, createAction, props, union } from "@ngrx/store";
import { Company } from "../../domain/company.model";

export const loadCompany = createAction("[Company Exists Guard] Load Company", props<{ company: Company }>());
export const setSelectedCompany = createAction("[Company] Set Selected Company", props<{ id: number }>());
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types and
 */

const all = union({
    loadCompany,
    setSelectedCompany
});
export type CompanyActionsUnion = typeof all;
