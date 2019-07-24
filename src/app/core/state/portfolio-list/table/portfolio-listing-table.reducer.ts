import { IconizedItem } from "@shared/iconized-searchable-combo/iconized-item";
import { PortfolioListingTableActions, PortfolioListingTableActionTypes } from "./portfolio-listing-table.actions";

export interface PortfolioListingLayoutState {
    search: string;
    groupBy: string;
    sortBy: string;
    groupingOptions: IconizedItem[];
    selectedGroupingOption: IconizedItem;
    sortOptions: IconizedItem[];
    selectedSortOption: IconizedItem;
}

export const initialState: PortfolioListingLayoutState = {
    search: "",
    groupBy: "",
    sortBy: "",
    groupingOptions: [
        {
            id: "",
            icon: "",
            text: "No Grouping"
        },
        {
            id: "region",
            icon: "",
            text: "Region"
        },
        {
            id: "teamLeadName",
            icon: "",
            text: "Deal Lead"
        },
        {
            id: "sectorsGroup",
            icon: "",
            text: "Sector"
        },
        {
            id: "country",
            icon: "",
            text: "Country"
        },
        {
            id: "investedGroup",
            icon: "",
            text: "Amount Invested"
        },
        {
            id: "valueGroup",
            icon: "",
            text: "Valuation"
        },
        {
            id: "moicGroup",
            icon: "",
            text: "MOIC"
        },
        {
            id: "irrGroup",
            icon: "",
            text: "IRR"
        }
    ],
    selectedGroupingOption: {
        id: "",
        icon: "",
        text: "No Grouping"
    },
    sortOptions: [
        {
            id: "totalValue",
            icon: "",
            text: "Current Valuation"
        },
        {
            id: "companyName",
            icon: "",
            text: "Company Name (A-Z)"
        },
        {
            id: "invested",
            icon: "",
            text: "Amount Invested"
        },
        {
            id: "moic",
            icon: "",
            text: "MOIC"
        },
        {
            id: "irr",
            icon: "",
            text: "IRR"
        }
    ],
    selectedSortOption: {
        id: "totalValue",
        icon: "",
        text: "Current Valuation"
    }
};

function search(value: string, state: PortfolioListingLayoutState = initialState): PortfolioListingLayoutState {
    return {
        ...state,
        search: value
    };
}

function groupBy(value: string, state: PortfolioListingLayoutState = initialState): PortfolioListingLayoutState {
    return {
        ...state,
        groupBy: value
    };
}

function sortBy(value: string, state: PortfolioListingLayoutState = initialState): PortfolioListingLayoutState {
    return {
        ...state,
        sortBy: value
    };
}

export function reducer(state: PortfolioListingLayoutState = initialState, action: PortfolioListingTableActions): PortfolioListingLayoutState {
    switch (action.type) {
        case PortfolioListingTableActionTypes.Search:
            return search(action.payload, state);

        case PortfolioListingTableActionTypes.GroupBy:
            return groupBy(action.payload, state);

        case PortfolioListingTableActionTypes.SortBy:
            return sortBy(action.payload, state);

        default:
            return state;
    }
}

export const getSearch = (state: PortfolioListingLayoutState) => state.search;
export const getGroupBy = (state: PortfolioListingLayoutState) => state.groupBy;
export const getSortBy = (state: PortfolioListingLayoutState) => state.sortBy;
export const getGroupingOptions = (state: PortfolioListingLayoutState) => state.groupingOptions;
export const getSelectedGroupingOption = (state: PortfolioListingLayoutState) => state.selectedGroupingOption;
export const getSortOptions = (state: PortfolioListingLayoutState) => state.sortOptions;
export const getSelectedSortOption = (state: PortfolioListingLayoutState) => state.selectedSortOption;
