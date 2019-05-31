import { Component, Input, OnInit } from "@angular/core";
import { Company } from "../core/domain/company.model";
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
     * List of companies to display.
     */
    @Input()
    public companies: Company[];

    /**
     * Constructor.
     */
    constructor() {
        PortfolioListingComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        PortfolioListingComponent.logger.debug(`ngOnInit()`);
    }
}
