import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
    selector: "sbp-portfolio-listing-summary",
    templateUrl: "./portfolio-listing-summary.component.html",
    styleUrls: ["./portfolio-listing-summary.component.scss"]
})
export class PortfolioListingSummaryComponent implements OnInit {
    @Input()
    public companyCount: number;

    @Input()
    public invested: number;

    @Input()
    public totalFund: number;

    @Input()
    public valuation: number;

    @Input()
    public moic: number | string;

    @Input()
    public irr: number;

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {}

    constructor() {}
}
