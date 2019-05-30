import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Company } from "../core/domain/company.model";
import { loadPortfolio } from "../core/state/portfolio/portfolio.actions";
import { Logger } from "../util/logger";
import * as fromCompanyState from "../core/state/portfolio/index";
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
    constructor(private store$: Store<any>) {
        PortfolioListingContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.store$.dispatch(loadPortfolio);

        // this.companies$ = this.store$.pipe(select(fromCompanyState.getPortfolioCompanies));
        this.companies$ = of([
            TestUti.getCompanyMock({ name: "Foo, Inc." }),
            TestUti.getCompanyMock({ name: "Bar, LLC." }),
            TestUti.getCompanyMock({ name: "Dogs and Cats" })
        ]);
    }
}
