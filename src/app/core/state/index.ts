import { CompanyRelationshipTypes } from "@core/domain/company.model";
import * as ObjectUtil from "@util/object.util";
import * as _ from "lodash";
import * as fromAuth from "./auth/auth.reducer";
import * as fromCompany from "./company/company.reducer";
import * as fromLayout from "./layout/layout.reducer";
import * as fromPortfolioDashboard from "./portfolio-dashboard/porfolio-dashboard.reducer";
import * as fromRouter from "@ngrx/router-store";
import * as fromTeam from "./team/team.reducer";
import * as fromTeamMember from "./team-member/team-member.reducer";
import * as fromValuation from "./valuation/valuation.reducer";
import * as TestUtil from "@util/test.util";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { Company } from "@core/domain/company.model";
import { RouterStateUrl } from "./router/custom-router-state.serializer";

export interface AppState {
    auth: fromAuth.AuthState;
    company: fromCompany.State;
    layout: fromLayout.LayoutState;
    portfolioDashboard: fromPortfolioDashboard.State;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    team: fromTeam.State;
    teamMember: fromTeamMember.State;
    valuation: fromValuation.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    company: fromCompany.reducer,
    portfolioDashboard: fromPortfolioDashboard.reducer,
    layout: fromLayout.layoutReducer,
    router: fromRouter.routerReducer,
    team: fromTeam.reducer,
    teamMember: fromTeamMember.reducer,
    valuation: fromValuation.reducer
};

// -------------------------------------------------------------------
// AUTH SELECTORS
// -------------------------------------------------------------------
export const selectAuthState = createFeatureSelector<fromAuth.AuthState>("auth");

export const getUsername = createSelector(
    selectAuthState,
    fromAuth.getUsername
);

export const getPassword = createSelector(
    selectAuthState,
    fromAuth.getPassword
);

export const getAccessToken = createSelector(
    selectAuthState,
    fromAuth.getAccessToken
);

export const getIdToken = createSelector(
    selectAuthState,
    fromAuth.getIdToken
);

export const getIsLoggedIn = createSelector(
    selectAuthState,
    fromAuth.getIsLoggedIn
);

export const getError = createSelector(
    selectAuthState,
    fromAuth.getError
);

export const getPending = createSelector(
    selectAuthState,
    fromAuth.getPending
);

export const getSuccess = createSelector(
    selectAuthState,
    fromAuth.getSuccess
);

// -------------------------------------------------------------------
// LAYOUT SELECTORS
// -------------------------------------------------------------------
export const selectLayoutState = createFeatureSelector<fromLayout.LayoutState>("layout");

export const getShowSlideout = createSelector(
    selectLayoutState,
    fromLayout.getShowSlideout
);

export const getSlideoutComponent = createSelector(
    selectLayoutState,
    fromLayout.getSlideoutComponent
);

export const getPortfolioNavLinks = createSelector(
    selectLayoutState,
    fromLayout.getPortfolioNavLinks
);

export const getSelectedPortfolioNavLink = createSelector(
    selectLayoutState,
    fromLayout.getSelectedPortfolioNavLink
);

export const getCompanyNavLinks = createSelector(
    selectLayoutState,
    fromLayout.getCompanyNavLinks
);

export const getSelectedCompanyNavLink = createSelector(
    selectLayoutState,
    fromLayout.getSelectedCompanyyNavLink
);

export const getShowCompanyCombo = createSelector(
    selectLayoutState,
    fromLayout.getShowCompanyCombo
);

// -------------------------------------------------------------------
// COMPANY SELECTORS
// -------------------------------------------------------------------
export const selectCompanyState = createFeatureSelector<fromCompany.State>("company");

export const {
    selectIds: getCompanyIds,
    selectEntities: getCompanyEntities,
    selectAll: getAllCompanies,
    selectTotal: getTotalCompanies
} = fromCompany.adapter.getSelectors(selectCompanyState);

function sortByValuation(e1: Company, e2: Company) {
    return e1.currentValuation - e2.currentValuation;
}

export const getSelectedCompanyId = createSelector(
    selectCompanyState,
    fromCompany.getSelectedId
);

export const getSelectedCompany = createSelector(
    getCompanyEntities,
    getSelectedCompanyId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);

export const getCompanyTypes = createSelector(
    getAllCompanies,
    (allCompanies) => _.groupBy(allCompanies, "type")
);

export const getCompanySort = createSelector(
    selectCompanyState,
    fromCompany.getSortValue
);

export const getCompanySortOrder = createSelector(
    selectCompanyState,
    fromCompany.getSortOrder
);

export const getSelectedCompanyTakeaways = createSelector(
    getSelectedCompany,
    (company: Company) => (company ? company.takeaways : []) || []
);

export const getSelectedCompanyTakeawayDate = createSelector(
    getSelectedCompany,
    (company: Company) => (company ? company.takeawayDate : "") || ""
);

export const getSelectedCompanyCurrentValuation = createSelector(
    getSelectedCompany,
    (company: Company) => ObjectUtil.getNestedPropIfExists(company, ["valuation", "topLineValuations", "0", "current"], {})
);

export const getSelectedCompanyYearPlusOneValuation = createSelector(
    getSelectedCompany,
    (company: Company) => ObjectUtil.getNestedPropIfExists(company, ["valuation", "topLineValuations", "1", "year_plus_one"], {})
);

export const getSelectedCompanyYearExitValuation = createSelector(
    getSelectedCompany,
    (company: Company) => ObjectUtil.getNestedPropIfExists(company, ["valuation", "topLineValuations", "2", "exit"], {})
);

// -------------------------------------------------------------------
// TEAM MEMBER SELECTORS
// -------------------------------------------------------------------
export const selectTeamMemberState = createFeatureSelector<fromTeamMember.State>("teamMember");

export const getSelectedTeamMember = createSelector(
    selectTeamMemberState,
    fromTeamMember.getSelectedTeamMember
);

export const getSelectedTeamMemberAndRelatedCompanies = createSelector(
    getSelectedTeamMember,
    getCompanyEntities,
    (member, companies) => {
        member.companyRelationships.forEach((relation) => {
            if (relation.relationship === CompanyRelationshipTypes.BOARD_SEAT || relation.relationship === CompanyRelationshipTypes.COMPANY_COVERED) {
                relation.companyLogo = companies[relation.companyId].logo;
                relation.companyName = companies[relation.companyId].name;
            }
        });
        return member;
    }
);

// -------------------------------------------------------------------
// TEAM SELECTORS
// -------------------------------------------------------------------
export const selectTeamState = createFeatureSelector<fromTeam.State>("team");

export const {
    selectIds: getTeamIds,
    selectEntities: getTeamEntities,
    selectAll: getAllTeams,
    selectTotal: getTotalTeamss
} = fromTeam.adapter.getSelectors(selectTeamState);

export const getTeams = createSelector(
    getAllTeams,
    getSelectedCompanyId,
    (teams, selectedCompanyId) => {
        return teams.filter((team) => String(team.companyId) === selectedCompanyId);
    }
);

export const getSelectedTeamGroup = createSelector(
    selectTeamState,
    fromTeam.getSelectedTeamMemberGroup
);

// --------------------------------------------------
// PORTFOLIO DASHBOARD: SEARCH SELECTORS
// --------------------------------------------------
export const getPortfolioDashboardState = createFeatureSelector<fromPortfolioDashboard.State>("portfolioDashboard");

export const getSearchCompanyIds = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getSearchResultIds
);

export const getSearchQuery = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getSearchQuery
);

export const getSearchLoading = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getSearching
);

export const getSearchError = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getSearchError
);

export const getSearchResults = createSelector(
    getAllCompanies,
    getSearchCompanyIds,
    (companies, searchIds) => {
        return searchIds.map((id) => companies[id]);
    }
);
// --------------------------------------------------
// PORTFOLIO DASHBOARD: VIEW SELECTORS
// --------------------------------------------------

export const getPortfolioLoaded = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getLoaded
);

export const getPortfolioLoading = createSelector(
    getPortfolioDashboardState,
    fromPortfolioDashboard.getLoading
);

export const getFilteredCompanies = createSelector(
    getAllCompanies,
    getSearchQuery,
    (allCompanies, searchQuery) => {
        // const allCompanies = Object.values(companiesState.entities);
        return allCompanies.filter((co) => co.name.toLowerCase().includes(searchQuery.toString().toLowerCase()));
    }
);

export const sortCompaniesValuation = createSelector(
    getAllCompanies,
    getCompanySort,
    (allCompanies) => {
        // const allCompanies = Object.values(companiesState.entities);
        allCompanies.sort(sortByValuation);
        return allCompanies;
    }
);

// -------------------------------------------------------------------
// COMPANY SELECTORS
// -------------------------------------------------------------------
export const selectValuationState = createFeatureSelector<fromValuation.State>("valuation");

export const getSelectedValuation = createSelector(
    selectValuationState,
    fromValuation.getSelected
);
