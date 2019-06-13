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
        <sbp-navigation-bar [links]="links$ | async" [selectedLink]="selectedLink$ | async" (linkClick)="onLinkClick($event)"></sbp-navigation-bar>
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
     * Handles clicking a link
     * @param link
     */
    public onLinkClick(link: NavigationBarLink): void {
        this.store$.dispatch(new CompanyNavigationItemClicked(link));
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.links$ = this.store$.pipe(select(fromState.getComnpanyNavLinks));
        this.selectedLink$ = this.store$.pipe(select(fromState.getSelectedCompanyNavLink));
    }

    constructor(private store$: Store<any>) {}
}
