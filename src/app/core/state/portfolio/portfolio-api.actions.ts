import { createAction, props, union } from "@ngrx/store";
import { Company } from "../../domain/company.model";

/**
 * Load Portfolio Actions
 */
export const loadCompaniesSuccess = createAction("[Portfolio/API] Load Companies Success", props<{ companies: Company[] }>());

export const loadCompaniesFailure = createAction("[Portfolio/API] Load Companies Failure", props<{ error: any }>());

const all = union({
    loadCompaniesSuccess,
    loadCompaniesFailure
});
export type PortfolioApiActionsUnion = typeof all;
