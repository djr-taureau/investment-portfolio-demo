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

    @Input()
    public slideoutOpen: boolean;

    /**
     * List of team members.
     */
    @Input()
    public teamMembers: Company[] = null;

    @Output()
    public toggleSlideout: EventEmitter<boolean> = new EventEmitter<boolean>();

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

    public onToggleSlideout(event: any) {
        HeaderComponent.logger.debug(`onToggleSlideout()`);
        this.toggleSlideout.emit(!this.slideoutOpen);
    }
}
