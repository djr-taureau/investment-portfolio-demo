import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Logger } from "../../util/logger";
import { NavigationBarLink } from "./navigation-bar-link";

@Component({
    selector: "sbp-navigation-bar",
    templateUrl: "./navigation-bar.component.html",
    styleUrls: ["./navigation-bar.component.scss"]
})
export class NavigationBarComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortolioNavbarComponent");

    /**
     * The links for the navigation bar
     */
    @Input()
    public links: NavigationBarLink[];

    /**
     * The selected link
     */
    @Input()
    public selectedLink: string;

    /**
     * Emits link clicks
     */
    @Output()
    public linkClick: EventEmitter<NavigationBarLink> = new EventEmitter<NavigationBarLink>();

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
    public onLinkClick(link: NavigationBarLink): void {
        if (link.enabled) {
            this.linkClick.emit(link);
        }
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {}

    constructor() {}
}
