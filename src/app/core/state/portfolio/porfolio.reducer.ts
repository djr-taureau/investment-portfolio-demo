import { PortfolioActions, PortfolioApiActions } from "./actions-index";

export interface State {
    loaded: boolean;
    loading: boolean;
    ids: string[];
    mocks: any[];
}

const initialState: State = {
    loaded: false,
    loading: false,
    ids: [],
    mocks: []
};

export function reducer(
    state = initialState,
    action: PortfolioActions.PortfolioPageActionsUnion | PortfolioApiActions.PortfolioApiActionsUnion
): State {
    switch (action.type) {
        case PortfolioActions.loadPortfolio.type: {
            return {
                ...state,
                loading: true
            };
        }
        case PortfolioApiActions.loadCompaniesSuccess.type: {
            return {
                ...state,
                loaded: true,
                loading: false,
                ids: action.companies.map((company) => company.id.toString())
            };
        }
        case PortfolioApiActions.loadMockCompaniesSuccess.type: {
            return {
                ...state,
                loaded: true,
                loading: false,
                mocks: action.companies
            };
        }
        default: {
            return state;
        }
    }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getIds = (state: State) => state.ids;
export const getMocks = (state: State) => state.mocks;
