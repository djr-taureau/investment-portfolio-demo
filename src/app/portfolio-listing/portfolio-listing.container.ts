import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { appRoutePaths } from "../app.routes";
import { Company } from "../core/domain/company.model";
import { CorePortfolioContainer } from "../shared/portfolio/core-portfolio.container";
import { Logger } from "../util/logger";
import { PortfolioActions } from "../core/state/portfolio/actions-index";
import * as fromCompanyState from "../core/state/portfolio";

@Component({
    selector: "sbp-portfolio-listing-container",
    template: `
        <sbp-portfolio-listing [companies]="companies$ | async" [mocks]="mocks$ | async" (loadCompanies)="loadCompanies($event)">
        </sbp-portfolio-listing>
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
     * TODO: REMOVE: BME: Mock data stream from the Mock API.
     */
    public mocks$: Observable<any[]>;

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        PortfolioListingContainer.logger.debug(`ngOnInit()`);
        this.companies$ = this.store$.pipe(select(fromCompanyState.getPortfolioCompanies));
        this.mocks$ = this.store$.pipe(select(fromCompanyState.getMocks));
        this.store$.dispatch(PortfolioActions.loadPortfolio());
    }

    /**
     * Mock method to loads companies.
     * @param event
     */
    public loadCompanies(event?: any): void {
        PortfolioListingContainer.logger.debug(`loadCompanies()`);
        this.store$.dispatch(PortfolioActions.loadMockPortfolio());
    }

    /**
     * Constructor.
     * @param store$
     */
    constructor(public store$: Store<fromCompanyState.State>) {
        super(store$, appRoutePaths.portfolioListing);
    }
}
