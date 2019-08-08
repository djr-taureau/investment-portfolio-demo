import { PortfolioDashboardNavBarLink } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import { Action } from "@ngrx/store";
import { NavigationBarLink } from "@shared/navigation-bar/navigation-bar-link";

export enum PortfolioFlowActionTypes {
    ChangeCompanyListGroup = "[Flow] Change Company List Group",
    ChangeCompanyListSort = "[Flow] Change Company List Sort",

    LoadPortfolio = "[Flow] Load Portfolio",
    GoToPortfolio = "[Flow] Go To Portfolio",

    PortfolioNavigationItemClicked = "[Flow] Portfolio Navigation Item Clicked",
    PortfolioDashboardOverviewNavigationItemClicked = "[Flow] Portfolio Dashboard Overview Navigation Item Clicked"
}

export class GoToPortfolio implements Action {
    readonly type = PortfolioFlowActionTypes.GoToPortfolio;

    constructor(public payload?: string) {}
}

export class LoadPortfolio implements Action {
    readonly type = PortfolioFlowActionTypes.LoadPortfolio;

    constructor(public payload?: string) {}
}

export class PortfolioNavigationItemClicked implements Action {
    readonly type = PortfolioFlowActionTypes.PortfolioNavigationItemClicked;

    constructor(public payload: NavigationBarLink) {}
}

export class PortfolioDashboardOverviewNavigationItemClicked implements Action {
    readonly type = PortfolioFlowActionTypes.PortfolioDashboardOverviewNavigationItemClicked;

    constructor(public payload: PortfolioDashboardNavBarLink) {}
}

export type PortfolioFlowActions = GoToPortfolio | LoadPortfolio | PortfolioNavigationItemClicked | PortfolioDashboardOverviewNavigationItemClicked;
