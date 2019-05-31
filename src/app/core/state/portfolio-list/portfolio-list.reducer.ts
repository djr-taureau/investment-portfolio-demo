import { PortfolioListActions } from "./portfolio-list.actions";

export interface State {
    companyCount: number;
    invested: number;
    totalFund: number;
    valuation: number;
    moic: number | string;
    irr: number;
}
export const initialState: State = {
    companyCount: 100,
    invested: 98.58,
    totalFund: 120.0,
    valuation: 116,
    moic: "4.4x",
    irr: 0.353
};

export function reducer(state: State = initialState, action: PortfolioListActions): State {
    switch (action.type) {
        default:
            return state;
    }
}

export const getCompanyCount = (state: State) => state.companyCount;
export const getInvested = (state: State) => state.invested;
export const getTotalFund = (state: State) => state.totalFund;
export const getValuation = (state: State) => state.valuation;
export const getMOIC = (state: State) => state.moic;
export const getIRR = (state: State) => state.irr;
