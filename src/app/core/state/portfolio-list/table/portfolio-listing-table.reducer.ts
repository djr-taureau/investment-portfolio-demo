import { IconizedItem } from "@shared/iconized-searchable-combo/iconized-item";
import { PortfolioListingTableActions, PortfolioListingTableActionTypes } from "./portfolio-listing-table.actions";

export interface PortfolioListingLayoutState {
    search: string;
    groupingOptions: IconizedItem[];
    selectedGroupingOption: IconizedItem;
    sortOptions: IconizedItem[];
    selectedSortOption: IconizedItem;
}

export const initialState: PortfolioListingLayoutState = {
    search: "",
    groupingOptions: [
        {
            id: "NONE",
            icon: "",
            text: "No Grouping"
        },
        {
            id: "REGION",
            icon: "",
            text: "Group By Region"
        },
        {
            id: "SECTOR",
            icon: "",
            text: "Group By Sector"
        },
        {
            id: "STAGE",
            icon: "",
            text: "Group By State"
        },
        {
            id: "MOIC",
            icon: "",
            text: "Group By MOIC"
        },
        {
            id: "IRR",
            icon: "",
            text: "Group By IRR"
        },
        {
            id: "INVESTED",
            icon: "",
            text: "Group By Amount Invested"
        },
        {
            id: "VALUATION",
            icon: "",
            text: "Group By Valuation"
        }
    ],
    selectedGroupingOption: {
        id: "NONE",
        icon: "",
        text: "No Grouping"
    },
    sortOptions: [
        {
            id: "DEFAULT",
            icon: "",
            text: "Sort By Default"
        },
        {
            id: "VALUATION",
            icon: "",
            text: "Sort By Valuation"
        },
        {
            id: "INVESTMENT",
            icon: "",
            text: "Sort By Invesment"
        },
        {
            id: "DEFAULT",
            icon: "",
            text: "Default Sort"
        }
    ],
    selectedSortOption: {
        id: "DEFAULT",
        icon: "",
        text: "Sort By Default"
    }
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
export const getGroupingOptions = (state: PortfolioListingLayoutState) => state.groupingOptions;
export const getSelectedGroupingOption = (state: PortfolioListingLayoutState) => state.selectedGroupingOption;
export const getSortOptions = (state: PortfolioListingLayoutState) => state.sortOptions;
export const getSelectedSortOption = (state: PortfolioListingLayoutState) => state.selectedSortOption;
