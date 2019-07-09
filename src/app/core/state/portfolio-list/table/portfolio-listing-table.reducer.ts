import { PortfolioListingTableActions, PortfolioListingTableActionTypes } from "./portfolio-listing-table.actions";

export interface PortfolioListingLayoutState {
    search: string;
}

export const initialState: PortfolioListingLayoutState = {
    search: ""
};

function search(value: string, state: PortfolioListingLayoutState = initialState): PortfolioListingLayoutState {
    return {
        ...state,
        search: value
    };
}

export function reducer(state: PortfolioListingLayoutState = initialState, action: PortfolioListingTableActions): PortfolioListingLayoutState {
    switch (action.type) {
        case PortfolioListingTableActionTypes.Search:
            return search(action.payload, state);

        default:
            return state;
    }
}

export const getSearch = (state: PortfolioListingLayoutState) => state.search;
