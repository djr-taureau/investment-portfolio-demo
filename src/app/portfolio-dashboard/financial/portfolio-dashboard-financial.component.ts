import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-portfolio-dashboard-financial",
    templateUrl: "./portfolio-dashboard-financial.component.html",
    styleUrls: ["./portfolio-dashboard-financial.component.scss"]
})
export class PortfolioDashboardFinancialComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardFinancialComponent");

    /**
     * Constructor.
     */
    constructor() {}

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {}
}
