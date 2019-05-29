import { Component, OnInit } from "@angular/core";
import { Logger } from "../util/logger";

@Component({
    selector: "sbp-portfolio-listing",
    templateUrl: "./portfolio-listing.component.html",
    styleUrls: ["./portfolio-listing.component.scss"]
})
export class PortfolioListingComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioListingComponent");

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {}

    constructor() {}
}
