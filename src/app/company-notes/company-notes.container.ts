import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { CoreCompanyContainer } from "../shared/company/core-company.container";

@Component({
    selector: "sbp-company-notes-container",
    template: "<sbp-company-notes></sbp-company-notes>"
})
export class CompanyNotesContainer extends CoreCompanyContainer {
    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$);
    }
}
