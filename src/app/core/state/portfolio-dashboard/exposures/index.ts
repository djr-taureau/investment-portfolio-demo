import { PortfolioExposure, PortfolioExposureType, PortfolioMetricTypes } from "@core/domain/portfolio.model";
import * as fromRoot from "@core/state";
import { PortfolioExposureActions } from "@core/state/portfolio-dashboard/exposures/portfolio-exposure.actions";
import * as fromPortfolioExposures from "@core/state/portfolio-dashboard/exposures/portfolio-exposures.reducer";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

// export interface PortfolioExposureState {
//     data: fromPortfolioExposures.State;
// }
//
// export interface State extends fromRoot.AppState {
//     portfolioExposure: PortfolioExposure;
// }
//
// export const reducers: ActionReducerMap<PortfolioExposureState, PortfolioExposureActions> = {
//     data: fromPortfolioExposures.reducer
// };
//
// export const selectPortfolioRevenue = createFeatureSelector<any, any>("portfolioRevenue");
//
// export const selectPortfolioExposureDataState = createSelector(
//     selectPortfolioRevenue,
//     (state: PortfolioExposureState) => state.data
// );
//
// // export const selectAllExposures = createSelector(
// //     selectPortfolioExposureDataState,
// //     fromPortfolioExposures.getExposures
// // );
//
// // export const getAllPortfolioRevenueFxExposures = createSelector(
// //     selectAllExposures,
// //     (allExposures: PortfolioExposure[]) => {
// //         const result = (allExposures || []).filter(
// //             (e: PortfolioExposure) => e.metric === PortfolioMetricTypes.REVENUE && e.type === PortfolioExposureType.FX
// //         );
// //         return result;
// //     }
// // );
// //
// // export const getAllPortfolioRevenueSectorExposures = createSelector(
// //     selectAllExposures,
// //     (allExposures: PortfolioExposure[]) => {
// //         const result = allExposures.filter(
// //             (e: PortfolioExposure) => e.metric === PortfolioMetricTypes.REVENUE && e.type === PortfolioExposureType.SECTOR
// //         );
// //         return result;
// //     }
// // );
