import { createAction, props, union } from "@ngrx/store";

export enum PortfolioListingSummaryActionTypes {
    Init = "[PortfolioListingSummary] Initialize",
    GetPortfolioListSummary = "[PortfolioListingSummary] Get Summary",
    GetPortfolioListSummaryFailure = "[PortfolioListingSummary] Get Summary - Failure",
    GetPortfolioListSummarySuccess = "[PortfolioListingSummary] Get Summary - Success"
}

export const init = createAction(PortfolioListingSummaryActionTypes.Init, props<{}>());
export const getPortfolioListSummary = createAction(PortfolioListingSummaryActionTypes.GetPortfolioListSummary, props<{}>());
export const getPortfolioListSummaryFailure = createAction(PortfolioListingSummaryActionTypes.GetPortfolioListSummaryFailure, props<{}>());
export const getPortfolioListSummarySuccess = createAction(
    PortfolioListingSummaryActionTypes.GetPortfolioListSummarySuccess,
    props<{ errorMsg: string }>()
);

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
const all = union({ init, getPortfolioListSummary, getPortfolioListSummaryFailure, getPortfolioListSummarySuccess });
export type PortfolioListingSummaryActions = typeof all;
