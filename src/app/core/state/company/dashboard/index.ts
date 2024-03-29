import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { Company } from "@core/domain/company.model";
import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { DatePartType, DatePartTypeEnum } from "@core/domain/enum/date-part-type.enum";
import { CompanyInitiativeActions } from "@core/state/company/dashboard/company-initiative.actions";
import { CompanyDocumentsActions } from "@core/state/company/documents/company-documents.actions";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import { getSelectedCompany } from "../../";
import { CompanyDashboardLayoutActions } from "./company-dashboard-layout.actions";
import * as fromRoot from "../../";
import * as fromCompanyDashboardLayout from "./company-dashboard-layout.reducer";
import * as fromCompanyInitiatives from "./company-initiative.reducer";
import * as fromCompanyDocuments from "../documents/company-documents.reducer";
import * as _ from "lodash";
import * as ObjectUtil from "@util/object.util";
import * as ArrayUtil from "@util/array.util";

export interface CompanyDashboard {
    layout: fromCompanyDashboardLayout.CompanyDashboardLayoutState;
    initiatives: fromCompanyInitiatives.State;
    documents: fromCompanyDocuments.State;
}

export interface State extends fromRoot.AppState {
    companyDashboard: CompanyDashboard;
}

export const reducers: ActionReducerMap<any, any> = {
    layout: fromCompanyDashboardLayout.reducer,
    initiatives: fromCompanyInitiatives.reducer,
    documents: fromCompanyDocuments.reducer
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

export const getShowCashDetail = createSelector(
    selectCompanyDashboardLayoutState,
    fromCompanyDashboardLayout.getShowCashDetail
);

export const getShowEBITDADetail = createSelector(
    selectCompanyDashboardLayoutState,
    fromCompanyDashboardLayout.getShowEBITDADetail
);

export const getShowRevenueDetail = createSelector(
    selectCompanyDashboardLayoutState,
    fromCompanyDashboardLayout.getShowRevenueDetail
);

export const getShowKpiDetail = createSelector(
    selectCompanyDashboardLayoutState,
    fromCompanyDashboardLayout.getShowKpiDetail
);

export const getSelectedKpiId = createSelector(
    selectCompanyDashboardLayoutState,
    fromCompanyDashboardLayout.getSelectedKpiId
);

export const isKpiIdSelected = (id: string) =>
    createSelector(
        getSelectedKpiId,
        (selectedId: string) => id === selectedId
    );

export const getShowDetailWidget = (widget: string) =>
    createSelector(
        selectCompanyDashboardLayoutState,
        getShowRevenueDetail,
        getShowEBITDADetail,
        getShowKpiDetail,
        (state, revenue, ebitda, kpi) => {
            switch (widget) {
                case "revenue":
                    return revenue;
                case "ebitda":
                    return ebitda;
                case "kpi":
                    return kpi;
            }
        }
    );

/**
 * Returns the selected company's financial year end month
 */
export const getSelectedCompanyFYE = createSelector(
    getSelectedCompany,
    (selectedCompany: Company) =>
        ObjectUtil.getNestedPropIfExists(selectedCompany, ["fiscalYearEnd", "month"], "---")
            .substring(0, 3)
            .toUpperCase()
);

/**
 * Returns the available charting periods for the selected company
 */
export const getSelectedCompanyAvailablePeriods = createSelector(
    getSelectedCompany,
    getSelectedDatePart,
    (selectedCompany: Company, selectedDatePart: DatePartType) => {
        let periods: any[] = ObjectUtil.getNestedPropIfExists(selectedCompany, ["availablePeriods"], []);
        periods = periods.map((p: SelectorPeriod, index) => {
            return {
                ...p,
                quarterLabel: "FQ" + p.financialQuarter + " " + new Date(p.date).getFullYear(),
                yearLabel: "FY " + new Date(p.date).getFullYear()
            };
        });
        periods = periods.sort(ArrayUtil.sortDateYYYYMMDD("date")).reverse();
        return periods;
    }
);

/**
 * Returns show flag for currency selector
 */
export const getShowCurrencySelector = createSelector(
    getSelectedCompany,
    (selectedCompany: Company) => ObjectUtil.getNestedPropIfExists(selectedCompany, ["defaultCurrency", "name"], "") !== "USD"
);

/**
 * Returns the selected company's default currency if different than USD
 */
export const getSelectedCompanyAlternateCurrency = createSelector(
    getSelectedCompany,
    (selectedCompany: Company) => {
        const defaultCurrency = ObjectUtil.getNestedPropIfExists(selectedCompany, ["defaultCurrency"], "") as CurrencyType;
        return _.get(defaultCurrency, "currencyCode", "") !== "USD" ? defaultCurrency : null;
    }
);

///////////////////////////////////////////////////////////////////////////////////////////
// Initiatives Selectors
///////////////////////////////////////////////////////////////////////////////////////////
export const selectCompanyDashboardInitiativesState = createSelector(
    selectCompanyDashboard,
    (state: CompanyDashboard) => state.initiatives
);

export const {
    selectIds: getInitiativeIds,
    selectEntities: getInitiativeEntities,
    selectAll: getAllInitiatives,
    selectTotal: getTotalInitiatives
} = fromCompanyInitiatives.adapter.getSelectors(selectCompanyDashboardInitiativesState);

export const getInitiativeCount = createSelector(
    getAllInitiatives,
    (allInitiatives) => {
        return allInitiatives.length || 0;
    }
);

export const getTopInitiativesByCompanyId = createSelector(
    getAllInitiatives,
    getSelectedCompany,
    (allInitiatives, selectedCompany) => {
        if (selectedCompany) {
            allInitiatives = allInitiatives || [];
            // TOOD: taking the filter out for now until api works
            // return _.take(allInitiatives.filter((i) => i.companyId === Number(selectedCompany.id)), 3);
            return allInitiatives;
        } else {
            return [];
        }
    }
);

///////////////////////////////////////////////////////////////////////////////////////////
// Initiatives Selectors
///////////////////////////////////////////////////////////////////////////////////////////
export const selectCompanyDashboardDocumentsState = createSelector(
    selectCompanyDashboard,
    (state: CompanyDashboard) => state.documents
);

export const {
    selectIds: getDocumentIds,
    selectEntities: getDocumentEntities,
    selectAll: getAllDocuments,
    selectTotal: getTotalDocuments
} = fromCompanyDocuments.adapter.getSelectors(selectCompanyDashboardDocumentsState);

export const getDocumentCount = createSelector(
    getAllInitiatives,
    (allDocuments) => {
        return allDocuments.length || 0;
    }
);

export const getTopDocumentsByCompanyId = createSelector(
    getAllInitiatives,
    getSelectedCompany,
    (allDocuments, selectedCompany) => {
        return _.take(allDocuments.filter((i) => i.companyId === Number(selectedCompany.id)), 3);
    }
);
