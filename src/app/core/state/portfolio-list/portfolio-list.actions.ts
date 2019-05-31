import { createAction, props, union } from "@ngrx/store";

export enum PortfolioListActionTypes {
    Init = "[PortfolioList] Initialize",
    GetPortfolioListSummary = "[PortfolioList] Get Summary",
    GetPortfolioListSummaryFailure = "[PortfolioList] Get Summary - Failure",
    GetPortfolioListSummarySuccess = "[PortfolioList] Get Summary - Success"
}

export const Init = createAction(PortfolioListActionTypes.Init, props<{}>());
export const GetPortfolioListSummary = createAction(PortfolioListActionTypes.GetPortfolioListSummary, props<{}>());
export const GetPortfolioListSummaryFailure = createAction(PortfolioListActionTypes.GetPortfolioListSummaryFailure, props<{}>());
export const GetPortfolioListSummarySuccess = createAction(PortfolioListActionTypes.GetPortfolioListSummarySuccess, props<{ errorMsg: string }>());

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({ Init, GetPortfolioListSummary, GetPortfolioListSummaryFailure, GetPortfolioListSummarySuccess });
export type PortfolioListActions = typeof all;
