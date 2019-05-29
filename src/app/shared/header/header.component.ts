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
     * Dispatches an event when user selects a role.
     */
    @Output()
    public selectCompany: EventEmitter<Company> = new EventEmitter<Company>();

    @Output()
    public toggleSlideout: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Selected company.
     */
    public selectedCompany: Company = null;

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
        this.selectedCompany = event.value;
        HeaderComponent.logger.debug(`onCompanySelect( ${this.selectedCompany.name} )`);
        this.selectCompany.emit(this.selectedCompany);
    }

    public onToggleSlideout(event: any) {
        HeaderComponent.logger.debug(`onToggleSlideout()`);
        this.toggleSlideout.emit(!this.slideoutOpen);
    }
}
