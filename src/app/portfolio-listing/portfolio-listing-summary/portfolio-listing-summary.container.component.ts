import { Component, Input, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromState from "../../core/state";

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
export class PortfolioListingSummaryContainerComponent implements OnInit {
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
        this.companyCount$ = this.store$.pipe(select(fromState.getCompanyCount));
        this.invested$ = this.store$.pipe(select(fromState.getInvested));
        this.totalFund$ = this.store$.pipe(select(fromState.getTotalFund));
        this.valuation$ = this.store$.pipe(select(fromState.getValuation));
        this.moic$ = this.store$.pipe(select(fromState.getMOIC));
        this.irr$ = this.store$.pipe(select(fromState.getIRR));
    }

    constructor(private store$: Store<any>) {}
}
