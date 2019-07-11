import { Company, Sector } from "@core/domain/company.model";
import { PortfolioTableItem } from "@core/domain/portfolio-table-item.model";
import { PortfolioListingTableActions } from "@core/state/portfolio-list/table/portfolio-listing-table.actions";
import { PortfolioListingSummaryActions } from "@core/state/portfolio-list/summary/portfolio-listing-summary.actions";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from "@core/state";
import * as fromCompanyState from "@core/state/";
import * as fromPortfolioListingTable from "@core/state/portfolio-list/table/portfolio-listing-table.reducer";
import * as fromPortfolioListingSummary from "@core/state/portfolio-list/summary/portfolio-listing-summary.reducer";
import * as StringUtil from "@util/string.util";

///////////////////////////////////////////////////////////////////////////////////////////
// State Definition
///////////////////////////////////////////////////////////////////////////////////////////

// Define the combined state.
export interface PortfolioListing {
    summary: fromPortfolioListingSummary.PortfolioListingSummaryState;
    table: fromPortfolioListingTable.PortfolioListingLayoutState;
}

// Extend the root app state with the context specific state defined here.
export interface State extends fromRoot.AppState {
    portfolioListing: PortfolioListing;
}

// Define the combined reducers.
export const reducers: ActionReducerMap<PortfolioListing, PortfolioListingTableActions | PortfolioListingSummaryActions> = {
    summary: fromPortfolioListingSummary.reducer,
    table: fromPortfolioListingTable.reducer
};

// Expose the state as a feature selector.
export const selectPortfolioListing = createFeatureSelector<State, PortfolioListing>("portfolioListing");

///////////////////////////////////////////////////////////////////////////////////////////
// Summary Selectors
///////////////////////////////////////////////////////////////////////////////////////////

export const selectPortfolioListingSummaryState = createSelector(
    selectPortfolioListing,
    (state: PortfolioListing) => state.summary
);

export const getCompanyCount = createSelector(
    selectPortfolioListingSummaryState,
    fromPortfolioListingSummary.getCompanyCount
);
export const getInvested = createSelector(
    selectPortfolioListingSummaryState,
    fromPortfolioListingSummary.getInvested
);
export const getTotalFund = createSelector(
    selectPortfolioListingSummaryState,
    fromPortfolioListingSummary.getTotalFund
);
export const getValuation = createSelector(
    selectPortfolioListingSummaryState,
    fromPortfolioListingSummary.getValuation
);
export const getMoic = createSelector(
    selectPortfolioListingSummaryState,
    fromPortfolioListingSummary.getMOIC
);
export const getIrr = createSelector(
    selectPortfolioListingSummaryState,
    fromPortfolioListingSummary.getIRR
);

///////////////////////////////////////////////////////////////////////////////////////////
// Table Selectors
///////////////////////////////////////////////////////////////////////////////////////////

export const selectPortfolioListingTableState = createSelector(
    selectPortfolioListing,
    (state: PortfolioListing) => state.table
);

export const getSearch = createSelector(
    selectPortfolioListingTableState,
    fromPortfolioListingTable.getSearch
);

export const getGroupByOptions = createSelector(
    selectPortfolioListingTableState,
    fromPortfolioListingTable.getGroupingOptions
);
export const getSortOptions = createSelector(
    selectPortfolioListingTableState,
    fromPortfolioListingTable.getSortOptions
);
export const getSelectedGroupByOption = createSelector(
    selectPortfolioListingTableState,
    fromPortfolioListingTable.getSelectedGroupingOption
);
export const getSelectedSortOption = createSelector(
    selectPortfolioListingTableState,
    fromPortfolioListingTable.getSelectedSortOption
);
export const getTableData = createSelector(
    fromCompanyState.getAllCompanies,
    getSearch,
    (companies: Company[], search: string) => {
        // Create the table data from the list of companies.
        const tableData: PortfolioTableItem[] = (companies || []).map((company: Company) => {
            const secs: string[] = (company.sectors || []).map((sector: Sector, index: number) => sector.name);
            const pti: PortfolioTableItem = {
                logo: company.logo || "assets/image/slack.png",
                companyId: company.id,
                companyName: company.name,
                teamLeadAvatar: "TODO",
                teamLeadName: "TODO",
                sectors: secs,
                sectorsAdditional: { value: "", visible: false },
                region: company.region || "TODO",
                countryFlag: "assets/image/flag.png",
                country: "TODO",
                amountInvested: company.amountInvested,
                currentValuation: company.currentValuation,
                MOIC: company.MOIC,
                IRR: company.IRR
            };
            return pti;
        });

        return !search ? tableData : tableData.filter((item: PortfolioTableItem) => StringUtil.contains(item.companyName, search, "*", true));
    }
);
