import { CompanyDashboardLayoutActions, CompanyDashboardLayoutActionTypes } from "./company-dashboard-layout.actions";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType, DatePartTypeEnum } from "@core/domain/enum/date-part-type.enum";
import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";

export interface CompanyDashboardLayout {
    collapsed: boolean;
    selectedCurrency: CurrencyType;
    selectedDatePart: DatePartType;
    selectedPeriod: SelectorPeriod;
}

export const initialState: CompanyDashboardLayout = {
    collapsed: true,
    selectedCurrency: CurrencyTypeEnum.USD,
    selectedDatePart: DatePartTypeEnum.QTR,
    selectedPeriod: null
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

export const getCollapsed = (state: CompanyDashboardLayout) => state.collapsed;
export const getSelectedCurrency = (state: CompanyDashboardLayout) => state.selectedCurrency;
export const getSelectedDatePart = (state: CompanyDashboardLayout) => state.selectedDatePart;
export const getSelectedPeriod = (state: CompanyDashboardLayout) => state.selectedPeriod;
