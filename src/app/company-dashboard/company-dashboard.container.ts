import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { CoreCompanyContainer } from "../shared/company/core-company.container";

@Component({
    selector: "sbp-company-dashboard-container",
    template: `
        <sbp-company-dashboard></sbp-company-dashboard>
    `
})
export class CompanyDashboardContainer extends CoreCompanyContainer {
    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$);
    }
}
