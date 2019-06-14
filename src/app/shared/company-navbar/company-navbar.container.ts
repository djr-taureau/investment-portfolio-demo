import * as CompanyDashboardLayoutActions from "../../core/state/company/dashboard/company-dashboard-layout.actions";
import * as fromCompanyDashboardLayout from "../../core/state/company/dashboard";
import * as fromState from "../../core/state/";
import { CompanyNavigationItemClicked } from "../../core/state/flow/flow.actions";
import { Component, OnInit } from "@angular/core";
import { Logger } from "../../util/logger";
import { NavigationBarLink } from "../navigation-bar/navigation-bar-link";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-navbar-container",
    template: `
        <sbp-navigation-bar [links]="links$ | async" [selectedLink]="selectedLink$ | async" (linkClick)="onLinkClick($event)">
            <button (click)="onExpandOrCollapse($event)">{{ collapsed$ | async | expandOrCollapse }}</button>
        </sbp-navigation-bar>
    `,
    styleUrls: ["./company-navbar.container.scss"]
})
export class CompanyNavbarContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyNavbarContainer");

    /**
     * The links for the bar
     */
    public links$: Observable<NavigationBarLink[]>;

    /**
     * Reference to the selected link
     */
    public selectedLink$: Observable<string>;

    /**
     * Boolean indicating if the summary is collapsed.
     */
    public collapsed$: Observable<boolean>;

    /**
     * Handles clicking a link
     * @param link
     */
    public onLinkClick(link: NavigationBarLink): void {
        CompanyNavbarContainer.logger.debug(`onLinkClick( ${JSON.stringify(link)} )`);
        this.store$.dispatch(new CompanyNavigationItemClicked(link));
    }

    /**
     * Expand or collapse the
     * @param $event
     */
    public onExpandOrCollapse($event): void {
        CompanyNavbarContainer.logger.debug(`expandOrCollapse()`);
        // @ts-ignore
        this.store$.dispatch(new CompanyDashboardLayoutActions.ExpandOrCollapse());
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.links$ = this.store$.pipe(select(fromState.getComnpanyNavLinks));
        this.selectedLink$ = this.store$.pipe(select(fromState.getSelectedCompanyNavLink));
        this.collapsed$ = this.store$.pipe(select(fromCompanyDashboardLayout.getCollapsed));
    }

    constructor(private store$: Store<any>) {}
}