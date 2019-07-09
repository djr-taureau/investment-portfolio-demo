import { Component, Input, EventEmitter, Output } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { FormControl } from "@angular/forms";
import { Logger } from "@util/logger";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { CustomIconService } from "@core/service/custom-icon.service";
import * as EventUtil from "@util/event.util";

@Component({
    selector: "sbp-portfolio-listing-header",
    templateUrl: "./portfolio-listing-header.component.html",
    styleUrls: ["./portfolio-listing-header.component.scss"]
})
export class PortfolioListingHeaderComponent {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioListingHeaderComponent");

    public groupBy = new FormControl();

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private customIconService: CustomIconService) {
        customIconService.init();
    }

    @Input()
    public regions: any[];

    @Input()
    public sortCategories: any[];

    @Input()
    public companyFilter = "";

    @Output()
    public selectionChange: EventEmitter<MatSelectChange>;

    /**
     * Dispatches an event to filter the table.
     */
    @Output()
    public filter: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Dispatches an event to group the table.
     */
    @Output()
    public group = new EventEmitter<string>();

    /**
     * Dispatches an event to sort the table.
     */
    @Output()
    public sort = new EventEmitter<string>();

    /**
     * Event handler to filter the table.
     */
    public onFilter(event: KeyboardEvent): void {
        const value: string = EventUtil.getValueFromEvent(event) as string;
        this.filter.emit(value);
    }
}
