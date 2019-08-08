import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PortfolioDashboardNavBarLink } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar-link";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-portfolio-dashboard-nav-bar",
    templateUrl: "./portfolio-dashboard.nav-bar.component.html",
    styleUrls: ["./portfolio-dashboard.nav-bar.component.scss"]
})
export class PortfolioDashboardNavBarComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardNavBarComponent");

    /**
     * The links for the navigation bar
     */
    @Input()
    public links: PortfolioDashboardNavBarLink[];

    /**
     * The selected link
     */
    @Input()
    public selectedLink: PortfolioDashboardNavBarLink;

    /**
     * Emits link clicks
     */
    @Output()
    public linkClick: EventEmitter<PortfolioDashboardNavBarLink> = new EventEmitter<PortfolioDashboardNavBarLink>();

    public hovered = "";

    /**
     * Tracks the loop for performance
     * @param index
     * @param item
     */
    public trackByFn(index, item) {
        return index;
    }

    /**
     * Handles clicks to navigation links
     * @param link
     */
    public onLinkClick(link: PortfolioDashboardNavBarLink): void {
        if (link.enabled) {
            this.linkClick.emit(link);
        }
    }

    /**
     * Moving the complex styling logic here
     * @param link
     */
    // public calculateClasses(link: NavigationBarLink): object {
    //     const result = {
    //         selected: link.route === this.selectedLink,
    //         disabled: link.route !== this.selectedLink && link.route !== this.hovered,
    //         hovered: link.route !== this.selectedLink && link.route === this.hovered
    //     };
    //     return result;
    // }

    /**
     * Ways to keep track of which link is currently hovered
     * @param link
     */
    public onMouseOver(link: PortfolioDashboardNavBarLink) {
        this.hovered = link.route;
    }
    public onMouseOut(link: PortfolioDashboardNavBarLink) {
        this.hovered = "";
    }
    /**
     * Initialize the component.
     */
    public ngOnInit(): void {}

    constructor() {}
}
