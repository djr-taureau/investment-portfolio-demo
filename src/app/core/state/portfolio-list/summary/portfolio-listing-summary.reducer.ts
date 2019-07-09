import { PortfolioListingSummaryActions } from "./portfolio-listing-summary.actions";

export interface PortfolioListingSummaryState {
    companyCount: number;
    invested: number;
    totalFund: number;
    valuation: number;
    moic: number | string;
    irr: number;
}
export const initialState: PortfolioListingSummaryState = {
    companyCount: 100,
    invested: 98.58,
    totalFund: 120.0,
    valuation: 116,
    moic: "4.4x",
    irr: 0.353
};

export function reducer(state: PortfolioListingSummaryState = initialState, action: PortfolioListingSummaryActions): PortfolioListingSummaryState {
    switch (action.type) {
        default:
            return state;
    }
}

export const getCompanyCount = (state: PortfolioListingSummaryState) => state.companyCount;
export const getInvested = (state: PortfolioListingSummaryState) => state.invested;
export const getTotalFund = (state: PortfolioListingSummaryState) => state.totalFund;
export const getValuation = (state: PortfolioListingSummaryState) => state.valuation;
export const getMOIC = (state: PortfolioListingSummaryState) => state.moic;
export const getIRR = (state: PortfolioListingSummaryState) => state.irr;
