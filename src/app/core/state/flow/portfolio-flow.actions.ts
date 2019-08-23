import { SelectorPeriod } from "@app/company-dashboard/period-selector/period-selector.component";
import { PortfolioDashboardNavBarLink } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { DatePartType } from "@core/domain/enum/date-part-type.enum";
import { Portfolio } from "@core/domain/portfolio.model";
import { Action } from "@ngrx/store";
import { NavigationBarLink } from "@shared/navigation-bar/navigation-bar-link";

export enum PortfolioFlowActionTypes {
    LoadPortfolioFlow = "[Portfolio Flow] Load Portfolio",
    LoadPortfolioFlowFailure = "[Portfolio Flow] Load Portfolio - Failure",
    LoadPortfolioFlowSuccess = "[Portfolio Flow] Load Portfolio - Success",

    GoToPortfolio = "[Portfolio Flow] Go To Portfolio",

    PortfolioNavigationItemClicked = "[Portfolio Flow] Portfolio Navigation Item Clicked",
    PortfolioDashboardOverviewNavigationItemClicked = "[Portfolio Flow] Portfolio Dashboard Overview Navigation Item Clicked",

    DashboardCurrencyChanged = "[Portfolio Flow] Dashboard - Currency Changed",
    DashboardDatePartChanged = "[Portfolio Flow] Dashboard - Date Part Changed",
    DashboardAsOfDateChanged = "[Portfolio Flow] Dashboard - As of Date Changed"
}

export class GoToPortfolio implements Action {
    readonly type = PortfolioFlowActionTypes.GoToPortfolio;

    constructor(public payload?: string) {}
}

export class LoadPortfolioFlow implements Action {
    readonly type = PortfolioFlowActionTypes.LoadPortfolioFlow;

    constructor(public payload?: string) {}
}

export class LoadPortfolioFlowFailure implements Action {
    readonly type = PortfolioFlowActionTypes.LoadPortfolioFlowFailure;

    constructor(public payload?: string) {}
}

export class LoadPortfolioFlowSuccess implements Action {
    readonly type = PortfolioFlowActionTypes.LoadPortfolioFlowSuccess;

    constructor(public payload: Portfolio) {}
}

export class PortfolioNavigationItemClicked implements Action {
    readonly type = PortfolioFlowActionTypes.PortfolioNavigationItemClicked;

    constructor(public payload: NavigationBarLink) {}
}

export class PortfolioDashboardOverviewNavigationItemClicked implements Action {
    readonly type = PortfolioFlowActionTypes.PortfolioDashboardOverviewNavigationItemClicked;

    constructor(public payload: PortfolioDashboardNavBarLink) {}
}

export class DashboardAsOfDateChanged implements Action {
    readonly type = PortfolioFlowActionTypes.DashboardAsOfDateChanged;
    constructor(public payload: SelectorPeriod) {}
}

export class DashboardCurrencyChanged implements Action {
    readonly type = PortfolioFlowActionTypes.DashboardCurrencyChanged;
    constructor(public payload: CurrencyType) {}
}

export class DashboardDatePartChanged implements Action {
    readonly type = PortfolioFlowActionTypes.DashboardDatePartChanged;
    constructor(public payload: DatePartType) {}
}

export type PortfolioFlowActions =
    | DashboardAsOfDateChanged
    | DashboardCurrencyChanged
    | DashboardDatePartChanged
    | GoToPortfolio
    | LoadPortfolioFlow
    | LoadPortfolioFlowFailure
    | LoadPortfolioFlowSuccess
    | PortfolioNavigationItemClicked
    | PortfolioDashboardOverviewNavigationItemClicked;
