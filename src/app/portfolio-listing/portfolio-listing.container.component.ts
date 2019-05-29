import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Logger } from "../util/logger";

@Component({
    selector: "sbp-portfolio-listing-container",
    template: "<sbp-portfolio-listing></sbp-portfolio-listing>"
})
export class PortfolioListingContainerComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioCompaniesContainerComponent");

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {}

    constructor(private store$: Store<any>) {}
}
