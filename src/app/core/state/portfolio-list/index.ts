import { companies } from "@app/portfolio-listing/portfolio-listing-table/sample-data";
import * as _ from "lodash";
import { Company, CompanyTypeEnum, Sector } from "@core/domain/company.model";
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
    fromCompanyState.getAllCompanies,
    (allCompanies) => {
        return allCompanies.length || 0;
    }
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

export const getGroupBy = createSelector(
    selectPortfolioListingTableState,
    fromPortfolioListingTable.getGroupBy
);

export const getGroupByOptions = createSelector(
    selectPortfolioListingTableState,
    fromPortfolioListingTable.getGroupingOptions
);

export const getSortBy = createSelector(
    selectPortfolioListingTableState,
    fromPortfolioListingTable.getSortBy
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
    (allComps: Company[], search: string) => {
        // Create the table data from the list of companies.
        const tableData: PortfolioTableItem[] = (allComps || []).map((company: Company) => {
            const secs: string[] = (company.sectors || []).map((sector: Sector, index: number) => sector.name || "N/A");
            const pti: PortfolioTableItem = {
                logo: company.logo || "assets/image/slack.png",
                companyId: company.id,
                companyName: company.name,
                teamLeadAvatar: "TODO",
                teamLeadName: company.teamLead,
                sectors: secs,
                sectorsAdditional: { value: "", visible: false },
                region: company.region || "TODO",
                countryFlag: "assets/image/flag.png",
                country: "TODO",
                invested: company.invested,
                totalValue: company.totalValue,
                moic: company.moic,
                irr: company.irr,
                type: company.type
            };
            return pti;
        });

        return !search ? tableData : tableData.filter((item: PortfolioTableItem) => StringUtil.contains(item.companyName, search, "*", true));
    }
);

export const getCompanyCountsByType = createSelector(
    fromCompanyState.getAllCompanies,
    (allComps) => {
        const companiesByType = _.groupBy(allComps, "type");
        const result = [
            { value: _.get(companiesByType, "PUBLIC", []).length, name: CompanyTypeEnum.PUBLIC.toLowerCase(), color: "#124f8c" },
            { value: _.get(companiesByType, "PRIVATE", []).length, name: CompanyTypeEnum.PRIVATE.toLowerCase(), color: "#47a2d6" },
            { value: _.get(companiesByType, "JOINT_VENTURE", []).length, name: CompanyTypeEnum.JOINT_VENTURE.toLowerCase(), color: "#1d2759" },
            { value: _.get(companiesByType, "EXITED", []).length, name: CompanyTypeEnum.EXITED.toLowerCase(), color: "#dbe3f1" }
        ];
        return result;
    }
);
