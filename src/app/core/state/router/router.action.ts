import { Action } from "@ngrx/store";
import { appRoutePaths } from "../../../app.routes";

export enum RouterActionTypes {
    Go = "[Router] Go",
    Back = "[Router] Back",
    Forward = "[Router] Forward",

    // Specific routing to keep knowledge out of other components.
    GotoLogin = "[Router] GotoLogin",
    GotoRegister = "[Router] GotoRegister",
    GoToPortfolioDashboard = "[Router] Go to Portfolio Dashboard",
    GoToPortfolioListing = "[Router] Go to Portfolio Listing",
    GoToCompanyInfo = "[Router] Go to Company Info"
}

export class Go implements Action {
    readonly type = RouterActionTypes.Go;

    constructor(public payload: any) {}
}

export class Back implements Action {
    readonly type = RouterActionTypes.Back;

    constructor() {}
}

export class Forward implements Action {
    readonly type = RouterActionTypes.Forward;

    constructor() {}
}

// Shorthand action creators for specific routes
export class GotoLogin implements Action {
    readonly type = RouterActionTypes.Go;
    readonly payload = { path: appRoutePaths.login };

    constructor() {}
}

export class GotoRegister implements Action {
    readonly type = RouterActionTypes.Go;
    readonly payload = { path: appRoutePaths.register };

    constructor() {}
}

export class GoToPortfolioListing implements Action {
    readonly type = RouterActionTypes.Go;
    readonly payload = { path: appRoutePaths.portfolioListing };

    constructor() {}
}

export class GoToPortfolioDashboard implements Action {
    readonly type = RouterActionTypes.Go;
    readonly payload = { path: appRoutePaths.portfolioDashboard };

    constructor() {}
}

export class GoToCompanyInfo implements Action {
    readonly type = RouterActionTypes.Go;
    readonly payload = { path: appRoutePaths.companyInfo, extras: { queryParamsHandling: "preserve", skipLocationChange: true } };

    constructor() {}
}

// TODO: BMR: 05/07/2019: Make this actually work as right now these aren't being used.
export type RouterActions = Go | Back | Forward | GotoLogin | GoToCompanyInfo | GotoRegister | GoToPortfolioDashboard | GoToPortfolioListing;
