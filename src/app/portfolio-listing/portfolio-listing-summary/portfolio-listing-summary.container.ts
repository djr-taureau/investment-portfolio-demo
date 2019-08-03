import { Company } from "@core/domain/company.model";
import * as fromPortfolioListingState from "@core/state/portfolio-list";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

@Component({
    selector: "sbp-portfolio-listing-summary-container",
    template: `
        <sbp-portfolio-listing-summary
            fxFlex
            [companyCount]="companyCount$ | async"
            [invested]="totalInvested$ | async"
            [irr]="irr$ | async"
            [moic]="moic$ | async"
            [totalFund]="totalFund$ | async"
            [totalApproved]="totalApproved$ | async"
            [valuation]="valuation$ | async"
            [chartData]="companyCountByType$ | async"
        ></sbp-portfolio-listing-summary>
    `
})
export class PortfolioListingSummaryContainer implements OnInit {
    /**
     * The total number of companies in the portfolio
     */
    public companyCount$: Observable<number>;

    /**
     * The companies displayed by the table (filtered
     */
    public companyCountByType$: Observable<any>;

    /**
     * The total amount invested in the portfolio
     */
    public totalInvested$: Observable<number>;

    /**
     * The total amount of the funding for the portfolio
     */
    public totalFund$: Observable<number>;

    /**
     * The total amount of the approved funding for the portfolio
     */
    public totalApproved$: Observable<number>;

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
        this.companyCountByType$ = this.store$.pipe(select(fromPortfolioListingState.getCompanyCountsByType));
        this.totalInvested$ = this.store$.pipe(select(fromPortfolioListingState.getTotalInvested));
        this.totalFund$ = this.store$.pipe(select(fromPortfolioListingState.getTotalFund));
        this.totalApproved$ = this.store$.pipe(select(fromPortfolioListingState.getTotalApproved));
        this.valuation$ = this.store$.pipe(select(fromPortfolioListingState.getValuation));
        this.moic$ = this.store$.pipe(select(fromPortfolioListingState.getMoic));
        this.irr$ = this.store$.pipe(select(fromPortfolioListingState.getIrr));
    }

    constructor(private store$: Store<any>) {}
}
