import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { CurrencyType, CurrencyTypeEnum } from "@core/domain/enum/currency-type.enum";
import { DatePartType, DatePartTypeEnum } from "@core/domain/enum/date-part-type.enum";
import { CompanyDashboardLayoutActions, CompanyDashboardLayoutActionTypes } from "./company-dashboard-layout.actions";

export enum WidgetTypeEnum {
    REVENUE = "revenue",
    EBITDA = "ebitda",
    KPI = "kpi",
    CASH = "cash"
}

export interface ToggleDetailPayload {
    type: string;
    id?: string;
}

export interface CompanyDashboardLayoutState {
    collapsed: boolean;
    selectedCurrency: CurrencyType;
    selectedDatePart: DatePartType;
    selectedPeriod: SelectorPeriod;
    showRevenueDetail: boolean;
    showCashDetail: boolean;
    showEbitdaDetail: boolean;
    showKpiDetail: boolean;
    selectedKpiId: string;
}

export const initialState: CompanyDashboardLayoutState = {
    collapsed: true,
    selectedCurrency: CurrencyTypeEnum.USD,
    selectedDatePart: DatePartTypeEnum.QTR,
    selectedPeriod: null,
    showRevenueDetail: false,
    showCashDetail: false,
    showEbitdaDetail: false,
    showKpiDetail: false,
    selectedKpiId: ""
};

function toggleDetail(state: CompanyDashboardLayoutState = initialState, payload: ToggleDetailPayload): CompanyDashboardLayoutState {
    switch (payload.type) {
        case WidgetTypeEnum.REVENUE:
            return toggleRevenueDetail(state);
            break;
        case WidgetTypeEnum.EBITDA:
            return toggleEbitdaDetail(state);
            break;
        case WidgetTypeEnum.CASH:
            return toggleCashDetail(state);
            break;
        case WidgetTypeEnum.KPI:
            return toggleKpiDetail(state, payload.id);
            break;
    }
}
function toggleRevenueDetail(state: CompanyDashboardLayoutState = initialState): CompanyDashboardLayoutState {
    return {
        ...state,
        showRevenueDetail: !state.showRevenueDetail,
        showCashDetail: false,
        showEbitdaDetail: false,
        showKpiDetail: false,
        selectedKpiId: ""
    };
}

function toggleEbitdaDetail(state: CompanyDashboardLayoutState = initialState): CompanyDashboardLayoutState {
    return {
        ...state,
        showRevenueDetail: false,
        showCashDetail: false,
        showEbitdaDetail: !state.showEbitdaDetail,
        showKpiDetail: false,
        selectedKpiId: ""
    };
}

function toggleCashDetail(state: CompanyDashboardLayoutState = initialState): CompanyDashboardLayoutState {
    return {
        ...state,
        showRevenueDetail: false,
        showCashDetail: !state.showCashDetail,
        showEbitdaDetail: false,
        showKpiDetail: false,
        selectedKpiId: ""
    };
}

function toggleKpiDetail(state: CompanyDashboardLayoutState = initialState, id: string): CompanyDashboardLayoutState {
    return {
        ...state,
        showRevenueDetail: false,
        showCashDetail: false,
        showEbitdaDetail: false,
        showKpiDetail: state.selectedKpiId === id || state.selectedKpiId === "" ? !state.showKpiDetail : state.showKpiDetail,
        selectedKpiId: state.selectedKpiId === id ? "" : id
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
            return toggleKpiDetail(state, action.payload);

        case CompanyDashboardLayoutActionTypes.ToggleDetailExpanded:
            return toggleDetail(state, action.payload);

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
export const getSelectedKpiId = (state: CompanyDashboardLayoutState) => state.selectedKpiId;
