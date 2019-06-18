import { ActivatedRoute } from "@angular/router";
import { appRoutePaths } from "../app.routes";
import { Component } from "@angular/core";
import { CoreCompanyContainer } from "@shared/company/core-company.container";
import { Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-financials-container",
    template: `
        <sbp-company-financials></sbp-company-financials>
    `
})
export class CompanyFinancialsContainer extends CoreCompanyContainer {
    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$, appRoutePaths.companyFinancials);
    }
}
