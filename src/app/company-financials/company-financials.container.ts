import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { CoreCompanyContainer } from "../shared/company/core-company.container";

@Component({
    selector: "sbp-company-financials-container",
    template: `
        <sbp-company-financials></sbp-company-financials>
    `
})
export class CompanyFinancialsContainer extends CoreCompanyContainer {
    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$);
    }
}
