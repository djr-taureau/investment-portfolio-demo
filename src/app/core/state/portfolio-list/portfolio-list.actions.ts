import { createAction, props, union } from "@ngrx/store";

export enum PortfolioListActionTypes {
    Init = "[PortfolioList] Initialize",
    GetPortfolioListSummary = "[PortfolioList] Get Summary",
    GetPortfolioListSummaryFailure = "[PortfolioList] Get Summary - Failure",
    GetPortfolioListSummarySuccess = "[PortfolioList] Get Summary - Success"
}

export const init = createAction(PortfolioListActionTypes.Init, props<{}>());
export const getPortfolioListSummary = createAction(PortfolioListActionTypes.GetPortfolioListSummary, props<{}>());
export const getPortfolioListSummaryFailure = createAction(PortfolioListActionTypes.GetPortfolioListSummaryFailure, props<{}>());
export const getPortfolioListSummarySuccess = createAction(PortfolioListActionTypes.GetPortfolioListSummarySuccess, props<{ errorMsg: string }>());

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({ init, getPortfolioListSummary, getPortfolioListSummaryFailure, getPortfolioListSummarySuccess });
export type PortfolioListActions = typeof all;
