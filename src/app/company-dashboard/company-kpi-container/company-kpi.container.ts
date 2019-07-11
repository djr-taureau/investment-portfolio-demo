import "zone.js";
import { Component, OnInit } from "@angular/core";
import { ebitda, revenue, cashburn } from "../financials-data";
import { TimelineDataPointFin, TimelineDataPoint, DataPoint } from "@shared/chart-components/interfaces/types";
import { Logger } from "@util/logger";
import { Store } from "@ngrx/store";
import { TimelineDataPointFin, TimelineDataPoint } from "@shared/chart-components/interfaces/types";


@Component({
    selector: "sbp-company-kpi-container",
    styleUrls: ["./company-kpi.container.scss"],
    templateUrl: "./company-kpi.container.html"
})
export class CompanyKpiContainer implements OnInit {
    private static logger: Logger = Logger.getLogger("CompanyKpiContainer");

    timelineData: TimelineDataPointFin[];
    timelineData2: TimelineDataPointFin[];
    timelineData3: TimelineDataPointFin[];
    chartData: Array<any>;
    /**
     * Internal logger.
     */

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>) {
        CompanyKpiContainer.logger.debug(`constructor()`);
        this.timelineData = [];
        this.timelineData2 = [];
        this.timelineData3 = [];
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyKpiContainer.logger.debug(`ngOnInit()`);
        this.timelineData = revenue;
        this.timelineData2 = ebitda;
        this.timelineData3 = cashburn;
        setTimeout(() => {
            this.generateData();

            // change the data periodically
            setInterval(() => this.generateData(), 3000);
        }, 1000);
    }

    generateData() {
        this.chartData = [];
        for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
            this.chartData.push([`Index ${i}`, Math.floor(Math.random() * 100)]);
        }
    }
}
