import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatSelectChange } from "@angular/material";
import { Company } from "../../core/domain/company.model";
import { Logger } from "../../util/logger";
import { PopupConfig } from "../iconized-searchable-combo/popup-config";
import { IconizedItem } from "../iconized-searchable-combo/iconized-item";
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: "sbp-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("HeaderComponent");

    /**
     * List of companies.
     */
    @Input()
    public companies: Company[] = null;

    /**
     * Flag indicating if the slide-out panel is open.
     */
    @Input()
    public slideoutOpen: boolean;

    /**
     * Broadcasts an event indicating a toggle to the open or closed state of the slide-out.
     */
    @Output()
    public toggleSlideout: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Broadcasts an event to login.
     */
    @Output()
    public login: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Broadcasts an event to logout.
     */
    @Output()
    public logout: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Dispatches an event when user selects a role.
     */
    @Output()
    public selectCompany: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Controls the width and height of the popup when the combo is clicked
     */
    public popupSettings: PopupConfig = { width: 195 };

    /**
     * Used to hide the company combo when not in /portfoli* routes
     */
    @Input()
    public showCompanyCombo = true;

    // NOTE: fill in with real data when ready
    public listItems: Array<IconizedItem> = [
        { id: 0, text: "WASI", icon: "assets/image/nauset.jpg" },
        { id: 1, text: "Facebook", icon: "assets/image/notes.svg" }
    ];

    /**
     * Constructor.
     */
    constructor(private router: Router) {
        HeaderComponent.logger.debug(`constructor()`);

        // // listen to events from Router
        // this.router.events.subscribe((event) => {
        //     if (event instanceof NavigationEnd) {
        //         // event is an instance of NavigationEnd, get url!
        //         const url = event.urlAfterRedirects;
        //         HeaderComponent.logger.debug(`url is ${url}`);
        //         this.showCompanyCombo = url.indexOf("/portfolio-") > -1;
        //     }
        // });
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        HeaderComponent.logger.debug(`ngOnInit()`);
    }

    /**
     * Handles the selection of a company.
     * @param event
     */
    public onCompanySelect(event: IconizedItem) {
        HeaderComponent.logger.debug(`onCompanySelect( ${event} )`);
        this.selectCompany.emit(event.id);
    }

    /**
     * Handles the toggling of the slide-out to open or close.
     * @param event
     */
    public onToggleSlideout(event: any) {
        HeaderComponent.logger.debug(`onToggleSlideout()`);
        this.toggleSlideout.emit(!this.slideoutOpen);
    }

    /**
     * Handles the login button click.
     * @param event
     */
    public onLogin(event: any) {
        HeaderComponent.logger.debug(`onLogin()`);
        this.login.emit();
    }

    /**
     * Handles the logout button click.
     * @param event
     */
    public onLogout(event: any) {
        HeaderComponent.logger.debug(`onLogin()`);
        this.logout.emit();
    }
}
