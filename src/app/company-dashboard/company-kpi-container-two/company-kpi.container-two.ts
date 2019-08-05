import { Component, OnInit } from "@angular/core";
import { ToggleCashDetail, ToggleEBITDADetail, ToggleRevenueDetail } from "@core/state/flow/company-flow.actions";
import { Store } from "@ngrx/store";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";
import { Logger } from "@util/logger";
import "zone.js";
import { ebitda, revenueMock2 } from "../financials-data";

@Component({
    selector: "sbp-company-kpi-container-two",
    styleUrls: ["./company-kpi.container-two.scss"],
    templateUrl: "./company-kpi.container-two.html"
})
export class CompanyKpiContainerTwo implements OnInit {
    /**
     * Constructor.
     */
    constructor(private store$: Store<any>) {
        CompanyKpiContainerTwo.logger.debug(`constructor()`);
    }
    private static logger: Logger = Logger.getLogger("CompanyKpiContainerTwo");

    timelineData: any[];
    timelineData2: TimelineDataPointFin[];
    timelineData3: TimelineDataPointFin[];

    /**
     * Internal logger.
     */

    public onRevenueClick() {
        this.store$.dispatch(new ToggleRevenueDetail());
    }

    public onEBITDAClick() {
        this.store$.dispatch(new ToggleEBITDADetail());
    }
    public onCashClick() {
        this.store$.dispatch(new ToggleCashDetail());
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyKpiContainerTwo.logger.debug(`ngOnInit()`);
        this.timelineData = revenueMock2.series;
        this.timelineData2 = ebitda;
        this.timelineData3 = ebitda;
    }
}
