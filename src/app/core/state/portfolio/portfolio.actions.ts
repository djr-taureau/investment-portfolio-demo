import { createAction } from "@ngrx/store";

/**
 * Load Portfolio Action
 */
export const loadPortfolio = createAction("[PortCo List] Load Portfolio");

export type PortfolioPageActionsUnion = ReturnType<typeof loadPortfolio>;
