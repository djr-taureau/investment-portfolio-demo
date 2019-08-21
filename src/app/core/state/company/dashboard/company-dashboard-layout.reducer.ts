import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType, DatePartTypeEnum } from "@core/domain/enum/date-part-type.enum";
import { CompanyDashboardLayoutActions, CompanyDashboardLayoutActionTypes } from "./company-dashboard-layout.actions";

export interface CompanyDashboardLayoutState {
    collapsed: boolean;
    selectedCurrency: CurrencyType;
    selectedDatePart: DatePartType;
    selectedPeriod: SelectorPeriod;
    showRevenueDetail: boolean;
    showCashDetail: boolean;
    showEbitdaDetail: boolean;
    showKpiDetail: boolean;
}

export const initialState: CompanyDashboardLayoutState = {
    collapsed: true,
    selectedCurrency: CurrencyTypeEnum.USD,
    selectedDatePart: DatePartTypeEnum.QTR,
    selectedPeriod: null,
    showRevenueDetail: false,
    showCashDetail: false,
    showEbitdaDetail: false,
    showKpiDetail: false
};

function toggleRevenueDetail(state: CompanyDashboardLayoutState = initialState): CompanyDashboardLayoutState {
    return {
        ...state,
        showRevenueDetail: !state.showRevenueDetail,
        showCashDetail: false,
        showEbitdaDetail: false,
        showKpiDetail: false
    };
}

function toggleEbitdaDetail(state: CompanyDashboardLayoutState = initialState): CompanyDashboardLayoutState {
    return {
        ...state,
        showRevenueDetail: false,
        showCashDetail: false,
        showEbitdaDetail: !state.showEbitdaDetail,
        showKpiDetail: false
    };
}

function toggleCashDetail(state: CompanyDashboardLayoutState = initialState): CompanyDashboardLayoutState {
    return {
        ...state,
        showRevenueDetail: false,
        showCashDetail: !state.showCashDetail,
        showEbitdaDetail: false,
        showKpiDetail: false
    };
}

function toggleKpiDetail(state: CompanyDashboardLayoutState = initialState): CompanyDashboardLayoutState {
    return {
        ...state,
        showRevenueDetail: false,
        showCashDetail: false,
        showEbitdaDetail: false,
        showKpiDetail: !state.showKpiDetail
    };
}

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
        case CompanyDashboardLayoutActionTypes.ToggleCashDetailExpanded:
            return toggleCashDetail(state);

        case CompanyDashboardLayoutActionTypes.ToggleEbitdaDetailExpanded:
            return toggleEbitdaDetail(state);

        case CompanyDashboardLayoutActionTypes.ToggleRevenueDetailExpanded:
            return toggleRevenueDetail(state);

        case CompanyDashboardLayoutActionTypes.ToggleKpiExpanded:
            return toggleKpiDetail(state);

        default:
            return state;
    }
}

export const getCollapsed = (state: CompanyDashboardLayoutState) => state.collapsed;
export const getSelectedCurrency = (state: CompanyDashboardLayoutState) => state.selectedCurrency;
export const getSelectedDatePart = (state: CompanyDashboardLayoutState) => state.selectedDatePart;
export const getSelectedPeriod = (state: CompanyDashboardLayoutState) => state.selectedPeriod;
export const getShowCashDetail = (state: CompanyDashboardLayoutState) => state.showCashDetail;
export const getShowEBITDADetail = (state: CompanyDashboardLayoutState) => state.showEbitdaDetail;
export const getShowRevenueDetail = (state: CompanyDashboardLayoutState) => state.showRevenueDetail;
export const getShowKpiDetail = (state: CompanyDashboardLayoutState) => state.showKpiDetail;
