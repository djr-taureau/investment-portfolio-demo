import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { CoreCompanyContainer } from "../shared/company/core-company.container";

@Component({
    selector: "sbp-company-documents-container",
    template: `
        <sbp-company-documents></sbp-company-documents>
    `
})
export class CompanyDocumentsContainer extends CoreCompanyContainer {
    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$);
    }
}
