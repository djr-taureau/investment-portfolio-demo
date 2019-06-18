import * as fromCompanyState from "../core/state/";
import { appRoutePaths } from "../app.routes";
import { Company } from "../core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { CorePortfolioContainer } from "../shared/portfolio/core-portfolio.container";
import { Logger } from "../util/logger";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

@Component({
    selector: "sbp-portfolio-listing-container",
    template: `
        <sbp-portfolio-listing [companies]="companies$ | async"></sbp-portfolio-listing>
    `
})
export class PortfolioListingContainer extends CorePortfolioContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioListingContainerComponent");

    /**
     * The list of companies as an observable stream.
     */
    public companies$: Observable<Company[]>;

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        PortfolioListingContainer.logger.debug(`ngOnInit()`);
        this.companies$ = this.store$.pipe(select(fromCompanyState.getAllCompanies));
        super.ngOnInit();
    }

    /**
     * Constructor.
     * @param store$
     */
    constructor(public store$: Store<any>) {
        super(store$, appRoutePaths.portfolioListing);
    }
}
