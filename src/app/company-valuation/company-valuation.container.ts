import { ActivatedRoute } from "@angular/router";
import { appRoutePaths } from "../app.routes";
import { Component } from "@angular/core";
import { CoreCompanyContainer } from "../shared/company/core-company.container";
import { Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-valuation-container",
    template: `
        <sbp-company-valuation></sbp-company-valuation>
    `
})
export class CompanyValuationContainer extends CoreCompanyContainer {
    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$, appRoutePaths.companyValuation);
    }
}
