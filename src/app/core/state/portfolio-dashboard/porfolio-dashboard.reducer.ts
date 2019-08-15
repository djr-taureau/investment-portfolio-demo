import { PortfolioCompanyListActions, PortfolioCompanyListActionTypes } from "./portfolio-company-list.actions";

export interface State {
    loaded: boolean;
    loading: boolean;
    searchResultsIds: string[];
    searching: boolean;
    searchError: string;
    searchQuery: string;
}

const initialState: State = {
    loaded: false,
    loading: false,
    searchResultsIds: [],
    searching: false,
    searchError: "",
    searchQuery: ""
};

export function reducer(state = initialState, action: PortfolioCompanyListActions): State {
    switch (action.type) {
        case PortfolioCompanyListActionTypes.LoadPortfolioCompanies:
            return {
                ...state,
                loading: true
            };

        case PortfolioCompanyListActionTypes.LoadPortfolioCompaniesSuccess:
            return {
                ...state,
                loaded: true,
                loading: false
            };
        case PortfolioCompanyListActionTypes.LoadPortfolioCompaniesFailure:
            return {
                ...state,
                loaded: false,
                loading: false
            };

        case PortfolioCompanyListActionTypes.SearchCompany:
            const query = action.payload;

            if (query === "") {
                return {
                    ...state,
                    searchResultsIds: [],
                    searching: false,
                    searchError: "",
                    searchQuery: query
                };
            }

            return {
                ...state,
                searching: true,
                searchError: "",
                searchQuery: query
            };

        case PortfolioCompanyListActionTypes.SearchCompanySuccess:
            return {
                ...state,
                searchResultsIds: action.payload.map((company) => company.id),
                searching: false,
                searchError: "",
                searchQuery: state.searchQuery
            };

        case PortfolioCompanyListActionTypes.SearchCompanyFailure:
            return {
                ...state,
                searching: false,
                searchError: action.payload
            };

        default: {
            return state;
        }
    }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getSearchResultIds = (state: State) => state.searchResultsIds;
export const getSearchQuery = (state: State) => state.searchQuery;
export const getSearching = (state: State) => state.searching;
export const getSearchError = (state: State) => state.searchError;
