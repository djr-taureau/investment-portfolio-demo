import * as fromPortfolioDashboard from "@core/state/portfolio-dashboard";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-info-summary-container",
    template: `
        <sbp-portfolio-company-info-summary
            fxFlex
            [companyCount]="companyCount$ | async"
            [invested]="totalInvested$ | async"
            [irr]="irr$ | async"
            [moic]="moic$ | async"
            [totalFund]="totalFund$ | async"
            [totalApproved]="totalApproved$ | async"
            [valuation]="valuation$ | async"
            [chartData]="companyCountByType$ | async"
        ></sbp-portfolio-company-info-summary>
    `
})
export class PortfolioCompanySummaryInfoContainer implements OnInit {
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
        this.companyCount$ = this.store$.pipe(select(fromPortfolioDashboard.getInvestmentSummaryCompanyCount));
        this.companyCountByType$ = this.store$.pipe(select(fromPortfolioDashboard.getInvestmentSummaryCountsByType));
        this.totalInvested$ = this.store$.pipe(select(fromPortfolioDashboard.getInvestmentSummaryInvested));
        this.totalFund$ = this.store$.pipe(select(fromPortfolioDashboard.getInvestmentSummaryTotalFund));
        this.totalApproved$ = this.store$.pipe(select(fromPortfolioDashboard.getInvestmentSummaryApproved));
        this.valuation$ = this.store$.pipe(select(fromPortfolioDashboard.getInvestmentSummaryTotalValue));
        this.moic$ = this.store$.pipe(select(fromPortfolioDashboard.getInvestmentSummaryMOIC));
        this.irr$ = this.store$.pipe(select(fromPortfolioDashboard.getInvestmentSummaryGrossIRR));
    }

    constructor(private store$: Store<any>) {}
}
