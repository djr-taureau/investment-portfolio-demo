import * as fromPortfolioListingState from "@core/state/portfolio-list";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

@Component({
    selector: "sbp-portfolio-listing-summary-container",
    template: `
        <sbp-portfolio-listing-summary
            [companyCount]="companyCount$ | async"
            [invested]="invested$ | async"
            [irr]="irr$ | async"
            [moic]="moic$ | async"
            [totalFund]="totalFund$ | async"
            [valuation]="valuation$ | async"
        ></sbp-portfolio-listing-summary>
    `
})
export class PortfolioListingSummaryContainer implements OnInit {
    /**
     * The total number of companies in the portfolio
     */
    public companyCount$: Observable<number>;

    /**
     * The total amount invested in the portfolio
     */
    public invested$: Observable<number>;

    /**
     * The total amount of the funding for the portfolio
     */
    public totalFund$: Observable<number>;

    /**
     * The total current valuation for the portfolio
     */
    public valuation$: Observable<number>;

    /**
     * The MOIC for the portfolio
     */
    public moic$: Observable<number | string>;

    /*
     * The IRR for the portfolio
     */
    public irr$: Observable<number>;

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.companyCount$ = this.store$.pipe(select(fromPortfolioListingState.getCompanyCount));
        this.invested$ = this.store$.pipe(select(fromPortfolioListingState.getInvested));
        this.totalFund$ = this.store$.pipe(select(fromPortfolioListingState.getTotalFund));
        this.valuation$ = this.store$.pipe(select(fromPortfolioListingState.getValuation));
        this.moic$ = this.store$.pipe(select(fromPortfolioListingState.getMoic));
        this.irr$ = this.store$.pipe(select(fromPortfolioListingState.getIrr));
    }

    constructor(private store$: Store<any>) {}
}
