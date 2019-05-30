import { Action, createAction, props } from "@ngrx/store";
import { Company } from "../../../domain/company.model";

export const loadCompany = createAction("[Company Exists Guard] Load Company", props<{ company: Company }>());
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CompanyActionsUnion = ReturnType<typeof loadCompany>;
