import "zone.js";
import * as CompanyDashboardLayoutActions from "@core/state/company/dashboard/company-dashboard-layout.actions";
import * as d3 from "d3";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { PopupService, PopupRef } from "@progress/kendo-angular-popup";
import { Logger } from "@util/logger";
import { Store } from "@ngrx/store";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";

@Component({
    selector: "sbp-company-kpi-detail-component",
    templateUrl: "./company-kpi-detail.component.html",
    styleUrls: ["./company-kpi-detail.component.scss"]
})
export class CompanyKpiDetailComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyKpiDetailComponent");
    private popupRef: PopupRef;

    public show: boolean;

    public enabled = true;
    public duration = 200;
    public type = "slide";
    public direction = "down";

    parseDate = d3.timeParse("%m/%d/%Y");
    dateAccessor: any;
    yAccessor: any;
    budgetAccessor: any;
    forecastAccessor: any;

    /**
     * Constructor.
     * @param store$
     * @param route$
     */

    @Input() data: TimelineDataPointFin[];

    constructor(public store$: Store<any>, public route$: ActivatedRoute, private popupService: PopupService, element: ElementRef) {
        CompanyKpiDetailComponent.logger.debug(`constructor()`);
    }
    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyKpiDetailComponent.logger.debug(`ngOnInit()`);
        this.dateAccessor = (v) => this.parseDate(v.date);
        this.yAccessor = (v) => v.amountInUSD;
        console.log(this.data);
    }
}
