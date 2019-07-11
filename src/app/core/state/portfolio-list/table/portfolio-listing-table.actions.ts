import { Action } from "@ngrx/store";

export enum PortfolioListingTableActionTypes {
    Search = "[PortfolioListingTable] Search",
    GroupBy = "[PortfolioListingTable] GroupBy"
}

export class Search implements Action {
    readonly type = PortfolioListingTableActionTypes.Search;

    constructor(public payload: string) {}
}

export class GroupBy implements Action {
    readonly type = PortfolioListingTableActionTypes.GroupBy;

    constructor(public payload: string) {}
}

export type PortfolioListingTableActions = Search | GroupBy;
