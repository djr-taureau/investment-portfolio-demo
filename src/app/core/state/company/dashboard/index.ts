import { Company } from "@core/domain/company.model";
import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import { getSelectedCompany } from "../../";
import { CompanyDashboardLayoutActions } from "./company-dashboard-layout.actions";
import * as fromRoot from "../../";
import * as fromCompanyDashboardLayout from "./company-dashboard-layout.reducer";
import * as _ from "lodash";

export interface CompanyDashboard {
    layout: fromCompanyDashboardLayout.CompanyDashboardLayoutState;
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

export const getSelectedCurrency = createSelector(
    selectCompanyDashboardLayoutState,
    fromCompanyDashboardLayout.getSelectedCurrency
);

export const getSelectedDatePart = createSelector(
    selectCompanyDashboardLayoutState,
    fromCompanyDashboardLayout.getSelectedDatePart
);

export const getSelectedPeriod = createSelector(
    selectCompanyDashboardLayoutState,
    fromCompanyDashboardLayout.getSelectedPeriod
);

export const getExpanded = createSelector(
    getCollapsed,
    (collapsed: boolean) => !collapsed
);

/**
 * Returns the selected company's financial year end month
 */
export const getSelectedCompanyFYE = createSelector(
    getSelectedCompany,
    (selectedCompany: Company) =>
        _.get(selectedCompany, "fiscalYearEnd.month", "---")
            .substring(0, 3)
            .toUpperCase()
);

/**
 * Returns the available charting periods for the selected company
 */
export const getSelectedCompanyAvailablePeriods = createSelector(
    getSelectedCompany,
    (selectedCompany: Company) => {
        const periods = _.get(selectedCompany, "availablePeriods", []);
        return _.each(periods, (item) => {
            return _.extend(item, { id: "Q" + item.financialQuarter + " " + new Date(item.date).getFullYear() });
        });
    }
);

/**
 * Returns show flag for currency selector
 */
export const getShowCurrencySelector = createSelector(
    getSelectedCompany,
    (selectedCompany: Company) => _.get(selectedCompany, "defaultCurrency.name", "") !== "USD"
);

/**
 * Returns the selected company's default currency if different than USD
 */
export const getSelectedCompanyAlternateCurrency = createSelector(
    getSelectedCompany,
    (selectedCompany: Company) => {
        const defaultCurrency = _.get(selectedCompany, "defaultCurrency", "") as CurrencyType;
        return defaultCurrency.currencyCode !== "USD" ? defaultCurrency : null;
    }
);
