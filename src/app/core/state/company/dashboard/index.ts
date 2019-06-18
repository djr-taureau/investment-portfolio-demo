import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import { CompanyDashboardLayoutActions } from "./company-dashboard-layout.actions";
import * as fromRoot from "../../";
import * as fromCompanyDashboardLayout from "./company-dashboard-layout.reducer";

export interface CompanyDashboard {
    layout: fromCompanyDashboardLayout.CompanyDashboardLayout;
}

export interface State extends fromRoot.AppState {
    companyDashboard: CompanyDashboard;
}

export const reducers: ActionReducerMap<CompanyDashboard, CompanyDashboardLayoutActions> = {
    layout: fromCompanyDashboardLayout.reducer
};

export const selectCompanyDashboard = createFeatureSelector<State, CompanyDashboard>("companyDashboard");

export const selectCompanyDashboardLayoutState = createSelector(
    selectCompanyDashboard,
    (state: CompanyDashboard) => state.layout
);

export const getCollapsed = createSelector(
    selectCompanyDashboardLayoutState,
    fromCompanyDashboardLayout.getCollapsed
);

export const getExpanded = createSelector(
    getCollapsed,
    (collapsed: boolean) => !collapsed
);
