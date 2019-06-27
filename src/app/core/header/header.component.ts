import * as _ from "lodash";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Company } from "@core/domain/company.model";
import { IconizedItem } from "@shared/iconized-searchable-combo/iconized-item";
import { Logger } from "@util/logger";
import { PopupConfig } from "@shared/iconized-searchable-combo/popup-config";

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

    private _companies: Company[];

    public listItems: Array<IconizedItem>[];

    /**
     * List of companies.
     */
    @Input()
    public set companies(value) {
        this._companies = value;
        const asIconized = value.map((c: Company) => {
            return { id: Number(c.id), icon: _.get(c, "logo", "https://via.placeholder.com/30"), text: c.name } as IconizedItem;
        });
        this.listItems = asIconized;
    }

    /**
     * The currently selected company
     */
    @Input()
    public selectedCompany: Company = null;

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
     * Alerts the parent component that the user has clicked the  'portfolio' breadcrumb
     */
    @Output()
    public portfolioClick: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Controls the width and height of the popup when the combo is clicked
     */
    public popupSettings: PopupConfig = { width: 195 };

    /**
     * Used to hide the company combo when not in /portfoli* routes
     */
    @Input()
    public showCompanyCombo = true;

    /**
     * Constructor.
     */
    constructor() {
        HeaderComponent.logger.debug(`constructor()`);
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

    /**
     * Handles the portfolio breadcrumb click
     */
    public onPortfolioClick(): void {
        this.portfolioClick.emit();
    }
}
