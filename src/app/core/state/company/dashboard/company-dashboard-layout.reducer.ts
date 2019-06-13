import { CompanyDashboardLayoutActions, CompanyDashboardLayoutActionTypes } from "./company-dashboard-layout.actions";

export interface CompanyDashboardLayout {
    collapsed: boolean;
}

export const initialState: CompanyDashboardLayout = {
    collapsed: true
};

function expandOrCollapse(state: CompanyDashboardLayout = initialState): CompanyDashboardLayout {
    return {
        ...state,
        collapsed: !state.collapsed
    };
}

export function reducer(state: CompanyDashboardLayout = initialState, action: CompanyDashboardLayoutActions): CompanyDashboardLayout {
    switch (action.type) {
        case CompanyDashboardLayoutActionTypes.ExpandOrCollapse:
            return expandOrCollapse(state);
        default:
            return state;
    }
}

export const getCollapsed = (state: CompanyDashboardLayout) => state.collapsed;
