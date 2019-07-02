import "zone.js";
import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ebitda, revenue, cashburn } from "./financials-data";
import { TimelineDataPointFin, TimelineDataPoint } from "@shared/chart-components/interfaces/types";

@Component({
    selector: "sbp-company-dashboard",
    templateUrl: "./company-dashboard.component.html",
    styleUrls: ["./company-dashboard.component.scss"]
})
export class CompanyDashboardComponent implements OnInit {
    constructor(private store$: Store<any>) {}
    ngOnInit() {}
}
