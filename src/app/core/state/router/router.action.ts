import { Action } from "@ngrx/store";
import { appRoutePaths } from "@app/app.routes";

export enum RouterActionTypes {
    Go = "[Router] Go",
    Back = "[Router] Back",
    Forward = "[Router] Forward",
    UpdateUrlParams = "[Router] UpdateUrlParams"
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

export class GoToCompanyDashboard implements Action {
    readonly type = RouterActionTypes.Go;
    public payload = { path: "" };

    constructor(companyId: string | number) {
        this.payload.path = appRoutePaths.companyDashboard.replace(":id", String(companyId));
    }
}

export class GoToCompanyFinancials implements Action {
    readonly type = RouterActionTypes.Go;
    public payload = { path: "" };

    constructor(companyId: string | number) {
        this.payload.path = appRoutePaths.companyFinancials.replace(":id", String(companyId));
    }
}

export class GoToCompanyDocuments implements Action {
    readonly type = RouterActionTypes.Go;
    public payload = { path: "" };

    constructor(companyId: string | number) {
        this.payload.path = appRoutePaths.companyDocuments.replace(":id", String(companyId));
    }
}
export class UpdateUrlParams implements Action {
    readonly type = RouterActionTypes.UpdateUrlParams;

    constructor(public payload: any) {}
}

export type RouterActions =
    | Go
    | Back
    | Forward
    | GotoLogin
    | GoToCompanyDashboard
    | GoToCompanyDocuments
    | GoToCompanyFinancials
    | GoToCompanyInfo
    | GotoRegister
    | GoToPortfolioDashboard
    | GoToPortfolioListing
    | UpdateUrlParams;
