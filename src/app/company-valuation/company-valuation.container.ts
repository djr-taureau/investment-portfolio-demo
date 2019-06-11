import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-valuation-container",
    template: `
        <sbp-company-valuation></sbp-company-valuation>
    `
})
export class CompanyValuationContainer {
    constructor(private store$: Store<any>) {}
}
