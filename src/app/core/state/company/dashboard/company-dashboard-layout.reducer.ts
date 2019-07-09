import { CompanyDashboardLayoutActions, CompanyDashboardLayoutActionTypes } from "./company-dashboard-layout.actions";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType, DatePartTypeEnum } from "@core/domain/enum/date-part-type.enum";
import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";

export interface CompanyDashboardLayoutState {
    collapsed: boolean;
    selectedCurrency: CurrencyType;
    selectedDatePart: DatePartType;
    selectedPeriod: SelectorPeriod;
}

export const initialState: CompanyDashboardLayoutState = {
    collapsed: true,
    selectedCurrency: CurrencyTypeEnum.USD,
    selectedDatePart: DatePartTypeEnum.QTR,
    selectedPeriod: null
};

function expandOrCollapse(state: CompanyDashboardLayoutState = initialState): CompanyDashboardLayoutState {
    return {
        ...state,
        collapsed: !state.collapsed
    };
}

export function reducer(state: CompanyDashboardLayoutState = initialState, action: CompanyDashboardLayoutActions): CompanyDashboardLayoutState {
    switch (action.type) {
        case CompanyDashboardLayoutActionTypes.ExpandOrCollapse:
            return expandOrCollapse(state);
        case CompanyDashboardLayoutActionTypes.SelectAsOfDate:
            return {
                ...state,
                selectedPeriod: action.payload
            };
        case CompanyDashboardLayoutActionTypes.SelectCurrency:
            return {
                ...state,
                selectedCurrency: action.payload
            };
        case CompanyDashboardLayoutActionTypes.SelectDatePart:
            return {
                ...state,
                selectedDatePart: action.payload
            };
        default:
            return state;
    }
}

export const getCollapsed = (state: CompanyDashboardLayoutState) => state.collapsed;
export const getSelectedCurrency = (state: CompanyDashboardLayoutState) => state.selectedCurrency;
export const getSelectedDatePart = (state: CompanyDashboardLayoutState) => state.selectedDatePart;
export const getSelectedPeriod = (state: CompanyDashboardLayoutState) => state.selectedPeriod;
