import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Company } from "../core/domain/company.model";
import { Logger } from "../util/logger";
import * as fromCompanyState from "../core/state/portfolio";
import { PortfolioActions } from "../core/state/portfolio/actions-index";
import * as TestUti from "../util/test.util";

@Component({
    selector: "sbp-portfolio-listing-container",
    template: `
        <sbp-portfolio-listing [companies]="companies$ | async"> </sbp-portfolio-listing>
    `
})
export class PortfolioListingContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioListingContainerComponent");

    /**
     * The list of companies as an observable stream.
     */
    public companies$: Observable<Company[]>;

    /**
     * Constructor.
     * @param store$
     */
    constructor(private store$: Store<fromCompanyState.State>) {
        PortfolioListingContainer.logger.debug(`constructor()`);
        this.companies$ = store$.pipe(select(fromCompanyState.getPortfolioCompanies));
    }
    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.store$.dispatch(PortfolioActions.loadPortfolio());
    }
}
