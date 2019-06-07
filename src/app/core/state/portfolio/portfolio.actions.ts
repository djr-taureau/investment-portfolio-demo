import { createAction } from "@ngrx/store";

/**
 * Load Portfolio Action
 */
export const loadPortfolio = createAction("[PortCo List] Load Portfolio");
export const loadMockPortfolio = createAction("[PortCo List] MOCK >> Load Portfolio");

export type PortfolioPageActionsUnion = ReturnType<typeof loadPortfolio>;
