import "zone.js";
import * as CompanyDashboardLayoutActions from "@core/state/company/dashboard/company-dashboard-layout.actions";
import * as d3 from "d3";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ElementRef, TemplateRef, ViewContainerRef, ViewChild, ViewEncapsulation, ComponentRef, Input } from "@angular/core";
import { PopupService, PopupRef } from "@progress/kendo-angular-popup";
import { Logger } from "@util/logger";
import { Store } from "@ngrx/store";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";

@Component({
    selector: "sbp-company-kpi-detail",
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
    public animate: boolean;

    parseDate = d3.timeParse("%m/%d/%Y");
    dateAccessor: any;
    financialsAccessor: any;
    timePeriodAccessor: any;
    valueAccessor: any;
    projectedAccessor: any;
    pyAccessor: any;
    icAccessor: any;
    /**
     * Constructor.
     * @param store$
     * @param route$
     */

    @Input() data: TimelineDataPointFin[];

    constructor(public store$: Store<any>, public route$: ActivatedRoute, private popupService: PopupService) {
        CompanyKpiDetailComponent.logger.debug(`constructor()`);
    }
    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyKpiDetailComponent.logger.debug(`ngOnInit()`);
        console.log(this.data);
    }
    /**
     * Expand or collapse the summary based on its current state.
     * @param $event
     */
}
