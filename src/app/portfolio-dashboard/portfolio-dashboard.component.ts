import { Component, OnInit } from "@angular/core";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-portfolio-dashboard",
    templateUrl: "./portfolio-dashboard.component.html",
    styleUrls: ["./portfolio-dashboard.component.scss"]
})
export class PortfolioDashboardComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardComponent");

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {}

    constructor() {}
}
