import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import "zone.js";

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

    parseDate = d3.timeParse("%m/%d/%Y");
    dateAccessor: any;
    categoryAccessor: any;
    yAccessor: any;
    budgetAccessor: any;
    forecastAccessor: any;

    /**
     * Constructor.
     * @param store$
     * @param route$
     */
    // TODO::Pass in DataSeries Array
    @Input() data: TimelineDataPointFin[];

    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        CompanyKpiDetailComponent.logger.debug(`constructor()`);
    }
    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyKpiDetailComponent.logger.debug(`ngOnInit()`);
        this.dateAccessor = (v) => this.parseDate(v.date);
        this.categoryAccessor = (v) => `${v.quarter}Q${v.year}`;
        this.yAccessor = (v) => v.amountInUSD;
    }
}
