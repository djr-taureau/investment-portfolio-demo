import { Component, EventEmitter, Output } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-dashboard",
    templateUrl: "./company-dashboard.component.html",
    styleUrls: ["./company-dashboard.component.scss"]
})
export class CompanyDashboardComponent {
    constructor(private store$: Store<any>) {}
}
