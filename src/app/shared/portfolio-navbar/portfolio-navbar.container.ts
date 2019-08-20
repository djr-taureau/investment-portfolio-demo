import * as fromState from "@core/state/";
import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { PortfolioNavigationItemClicked } from "@core/state/flow/portfolio-flow.actions";
import { Logger } from "@util/logger";
import { NavigationBarLink } from "../navigation-bar/navigation-bar-link";

@Component({
    selector: "sbp-portfolio-navbar-container",
    template: `
        <sbp-navigation-bar
            [links]="links$ | async"
            [selectedLink]="selectedLink$ | async"
            (linkClick)="onLinkClick($event)"
            [showContent]="false"
        ></sbp-navigation-bar>
    `,
    styleUrls: ["./portfolio-navbar.container.component.scss"]
})
export class PortfolioNavbarContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortolioNavbarContainerComponent");

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
        this.store$.dispatch(new PortfolioNavigationItemClicked(link));
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.links$ = this.store$.pipe(select(fromState.getPortfolioNavLinks));
        this.selectedLink$ = this.store$.pipe(select(fromState.getSelectedPortfolioNavLink));
    }

    constructor(private store$: Store<any>) {}
}
