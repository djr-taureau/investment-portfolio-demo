import { ActivatedRoute } from "@angular/router";
import { appRoutePaths } from "../app.routes";
import { Component } from "@angular/core";
import { CoreCompanyContainer } from "../shared/company/core-company.container";
import { Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-dashboard-container",
    template: `
        <sbp-company-dashboard></sbp-company-dashboard>
    `
})
export class CompanyDashboardContainer extends CoreCompanyContainer {
    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$, appRoutePaths.companyDashboard);
    }
}
