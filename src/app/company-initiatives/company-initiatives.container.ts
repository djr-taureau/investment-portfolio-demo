import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { CoreCompanyContainer } from "../shared/company/core-company.container";

@Component({
    selector: "sbp-company-initiatives-container",
    template: `
        <sbp-company-initiatives></sbp-company-initiatives>
    `
})
export class CompanyInitiativesContainer extends CoreCompanyContainer {
    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$);
    }
}
