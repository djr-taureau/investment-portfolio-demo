import "zone.js";
import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Logger } from "@util/logger";
import { ebitda, revenue, cashburn } from "../financials-data";
import { TimelineDataPointFin, TimelineDataPoint } from "@shared/chart-components/interfaces/types";

@Component({
    selector: "sbp-company-kpi-container",
    styles: [
        `
            .chart {
                padding: 10px;
            }
        `
    ],
    template: `
        <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="20px">
            <div class="chart">
                <sbp-kpi-summary
                    [data]="timelineData"
                    [title]="'Revenue'"
                    [denomination]="'USD'"
                    [value]="325.3"
                    [pyLabel]="'vs PY'"
                    [pyValue]="-44.1"
                    [icLabel]="'vs Bud'"
                    [icValue]="'-42'"
                >
                </sbp-kpi-summary>
            </div>
            <div class="chart">
                <sbp-kpi-summary
                    [data]="timelineData2"
                    [title]="'EBITDA'"
                    [denomination]="'USD'"
                    [value]="-81.2"
                    [pyLabel]="'vs PY'"
                    [pyValue]="+10.0"
                    [icLabel]="'vs Bud'"
                    [icValue]="'-5.0'"
                >
                </sbp-kpi-summary>
            </div>
            <div class="chart">
                <sbp-kpi-summary
                    [data]="timelineData3"
                    [title]="'Cash Burn'"
                    [denomination]="'USD'"
                    [value]="-34.6"
                    [pyLabel]="'vs PY'"
                    [pyValue]="+10.0"
                    [icLabel]="'vs Bud'"
                    [icValue]="'-5.0'"
                >
                </sbp-kpi-summary>
            </div>
        </div>
    `
})
export class CompanyKpiContainer implements OnInit {
    private static logger: Logger = Logger.getLogger("CompanyKpiContainer");

    timelineData: TimelineDataPointFin[];
    timelineData2: TimelineDataPointFin[];
    timelineData3: TimelineDataPointFin[];
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
    }
}
