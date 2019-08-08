import { Component, OnInit } from "@angular/core";
import { PortfolioDashboardNavBarLink } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Logger } from "@util/logger";
import * as fromPortfolioDashboardOverviewLayout from "@core/state/portfolio-dashboard";
import * as PortfolioDashboardOverviewLayoutActions from "@core/state/portfolio-dashboard/portfolio-dashboard-overview-layout.actions";
import * as PortfolioFlowActions from "@core/state/flow/portfolio-flow.actions";

@Component({
    selector: "sbp-portfolio-dashboard-nav-bar-container",
    template: `
        <sbp-portfolio-dashboard-nav-bar [links]="links$ | async" [selectedLink]="selectedLink$ | async" (linkClick)="onLinkClick($event)">
        </sbp-portfolio-dashboard-nav-bar>
    `,
    styleUrls: ["./portfolio-dashboard.nav-bar.container.scss"]
})
export class PortfolioDashboardNavBarContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardNavBarContainer");

    /**
     * The links for the bar
     */
    public links$: Observable<PortfolioDashboardNavBarLink[]>;

    /**
     * Reference to the selected link
     */
    public selectedLink$: Observable<PortfolioDashboardNavBarLink>;

    /**
     * Handles clicking a link
     * @param link
     */
    public onLinkClick(link: PortfolioDashboardNavBarLink): void {
        this.store$.dispatch(new PortfolioFlowActions.PortfolioDashboardOverviewNavigationItemClicked(link));
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.links$ = this.store$.pipe(select(fromPortfolioDashboardOverviewLayout.getOverviewNavLinks));
        this.selectedLink$ = this.store$.pipe(select(fromPortfolioDashboardOverviewLayout.getOverviewSelectedNavLink));
    }

    constructor(private store$: Store<any>) {}
}
