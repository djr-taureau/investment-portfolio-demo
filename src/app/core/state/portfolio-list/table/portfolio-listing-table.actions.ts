import { Action } from "@ngrx/store";

export enum PortfolioListingTableActionTypes {
    Search = "[PortfolioListingTable] Search"
}

export class Search implements Action {
    readonly type = PortfolioListingTableActionTypes.Search;

    constructor(public payload: string) {}
}

export type PortfolioListingTableActions = Search;
