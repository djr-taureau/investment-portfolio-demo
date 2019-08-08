import { PortfolioDashboardNavBarLink } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import { Action } from "@ngrx/store";

export enum PortfolioDashboardOverviewLayoutActionTypes {
    SelectNavLink = "[Portfolio Dashboard Overview Layout Action] SelectNavLink"
}

export class SelectNavLink implements Action {
    readonly type = PortfolioDashboardOverviewLayoutActionTypes.SelectNavLink;
    constructor(public payload: PortfolioDashboardNavBarLink) {}
}

export type PortfolioDashboardOverviewLayoutActions = SelectNavLink;
