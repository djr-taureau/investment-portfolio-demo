import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatSelectChange } from "@angular/material";
import { Company } from "../../core/domain/company.model";
import { Logger } from "../../util/logger";

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
     * List of team members.
     */
    @Input()
    public teamMembers: Company[] = null;

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
     * Currently selected company.
     */
    @Input()
    public selectedCompany: Company = null;

    /**
     * Dispatches an event when user selects a role.
     */
    @Output()
    public selectCompany: EventEmitter<Company> = new EventEmitter<Company>();

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
    public onCompanySelect(event: MatSelectChange) {
        const company = event.value;
        HeaderComponent.logger.debug(`onCompanySelect( ${company.name} )`);
        this.selectCompany.emit(company);
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
