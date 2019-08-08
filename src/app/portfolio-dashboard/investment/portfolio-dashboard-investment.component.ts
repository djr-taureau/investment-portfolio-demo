import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-portfolio-dashboard-investment",
    templateUrl: "./portfolio-dashboard-investment.component.html",
    styleUrls: ["./portfolio-dashboard-investment.component.scss"]
})
export class PortfolioDashboardInvestmentComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardInvestmentComponent");

    /**
     * Constructor.
     */
    constructor() {}

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {}
}
