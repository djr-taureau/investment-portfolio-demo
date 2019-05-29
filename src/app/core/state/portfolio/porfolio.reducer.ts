import { PortfolioActions, PortfolioApiActions } from "./actions-index";

export interface State {
    loaded: boolean;
    loading: boolean;
    ids: string[];
}

const initialState: State = {
    loaded: false,
    loading: false,
    ids: []
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
                loaded: true,
                loading: false,
                ids: action.companies.map((company) => company.id.toString())
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
