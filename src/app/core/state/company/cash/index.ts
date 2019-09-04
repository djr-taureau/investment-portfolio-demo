import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { CashMonth } from "@core/domain/cash.model";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import { CompanyCashActions } from "@core/state/company/cash/company-cash.actions";
import * as fromCompanyDashboard from "@core/state/company/dashboard";
import * as fromRoot from "@core/state";
import * as fromCompanyCash from "@core/state/company/cash/company-cash.reducer";
import * as ObjectUtil from "@util/object.util";

export interface CompanyCash {
    data: fromCompanyCash.State;
}

export interface State extends fromRoot.AppState {
    companyCash: CompanyCash;
}

export const reducers: ActionReducerMap<CompanyCash, CompanyCashActions> = {
    data: fromCompanyCash.reducer
};

export const selectCompanyCash = createFeatureSelector<any, any>("companyCash");

export const selectCompanyCashDataState = createSelector(
    selectCompanyCash,
    (state: CompanyCash) => state.data
);

export const getCashRunwayInMonths = createSelector(
    selectCompanyCashDataState,
    fromCompanyCash.getCashRunwayInMonths
);

export const getCashData = createSelector(
    selectCompanyCashDataState,
    fromCompanyCash.getCashData
);

export const getCashAsOf = createSelector(
    getCashData,
    fromCompanyDashboard.getSelectedPeriod,
    (cash: CashMonth[], period: SelectorPeriod) => {
        const year = !!period ? period.date.substring(0, 4) : "0";
        const quarter = !!period ? period.financialQuarter : 0;
        const cashAsOf = cash.find((item) => item.quarter === quarter && item.year === parseInt(year, 10));
        return !!cashAsOf ? cashAsOf.amountInUSD : 0;
    }
);
