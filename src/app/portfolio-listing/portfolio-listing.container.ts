import * as CompanyFlowActions from "@core/state/flow/company-flow.actions";
import { GoToCompanyDashboard } from "@core/state/router/router.action";
import { appRoutePaths } from "@app/app.routes";
import { Company } from "@core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { CorePortfolioContainer } from "@shared/portfolio/core-portfolio.container";
import { Logger } from "@util/logger";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { PortfolioTableItem } from "@app/core/domain/portfolio-table-item.model";
import * as TeamActions from "@app/core/state/team/team.actions";
import * as CompanyActions from "@app/core/state/company/company.actions";
import * as fromCompanyState from "@core/state/";
import * as fromPortfolioListingState from "@core/state/portfolio-list";

@Component({
    selector: "sbp-portfolio-listing-container",
    template: `
        <sbp-portfolio-listing
            [companies]="companies$ | async"
            [tableData]="tableData$ | async"
            [groupBy]="groupBy$ | async"
            [sortBy]="sortBy$ | async"
            (openCompanyDashboard)="openCompanyDashboard($event)"
        >
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
     * The list of company type data for table
     */
    public tableData$: Observable<PortfolioTableItem[]>;

    /**
     * The group by property for the table data.
     */
    public groupBy$: Observable<string>;

    /**
     * The sort by property for the table data.
     */
    public sortBy$: Observable<string>;

    /**
     * Switches to the company dashboard view for the company selected
     */
    public openCompanyDashboard(companyId: string) {
        this.store$.dispatch(new CompanyActions.Get(companyId));
        this.store$.dispatch(new GoToCompanyDashboard(companyId));
        this.store$.dispatch(new TeamActions.GetAll(companyId));
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        PortfolioListingContainer.logger.debug(`ngOnInit()`);
        this.store$.dispatch(new CompanyFlowActions.SortCompanies("totalValue"));

        this.companies$ = this.store$.pipe(select(fromCompanyState.getAllCompanies));
        this.tableData$ = this.store$.pipe(select(fromPortfolioListingState.getTableData));
        this.groupBy$ = this.store$.pipe(select(fromPortfolioListingState.getGroupBy));
        this.sortBy$ = this.store$.pipe(select(fromPortfolioListingState.getSortBy));

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
