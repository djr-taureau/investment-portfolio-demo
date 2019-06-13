import { ActivatedRoute } from "@angular/router";
import { appRoutePaths } from "../app.routes";
import { Component } from "@angular/core";
import { CoreCompanyContainer } from "../shared/company/core-company.container";
import { Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-notes-container",
    template: "<sbp-company-notes></sbp-company-notes>"
})
export class CompanyNotesContainer extends CoreCompanyContainer {
    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$, appRoutePaths.companyNotes);
    }
}
