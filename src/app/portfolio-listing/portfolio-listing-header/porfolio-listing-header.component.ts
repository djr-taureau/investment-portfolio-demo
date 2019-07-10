import { Component, Input, EventEmitter, Output } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { FormControl } from "@angular/forms";
import { IconizedItem } from "@shared/iconized-searchable-combo/iconized-item";
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
    @Input() regions: any[];
    @Input() sortingOptions: IconizedItem[];
    @Input() groupingOptions: IconizedItem[];
    @Input() companyFilter = "";

    @Input() selectedGroupOption: IconizedItem;
    @Input() selectedSortOption: IconizedItem;

    /**
     * Filter List One popup settings
     */
    @Input()
    public popupSettings = { width: 200 };

    @Output() selectionChange: EventEmitter<MatSelectChange>;
    @Output() filter = new EventEmitter<string>();
    @Output() group = new EventEmitter<IconizedItem>();
    @Output() sort = new EventEmitter<IconizedItem>();

    /**
     * Handles changes to the group by selection
     * @param $event
     */
    public onGroupChange($event): void {
        PortfolioListingHeaderComponent.logger.debug(`onGroupChange(${JSON.stringify($event)})`);
    }

    /**
     * Handles changes to the sort by selection
     * @param $event
     */
    public onSortChange($event): void {
        PortfolioListingHeaderComponent.logger.debug(`onSortChange(${JSON.stringify($event)})`);
    }
    /**
     * Event handler to filter the table.
     */
    public onFilter(event: KeyboardEvent): void {
        const value: string = EventUtil.getValueFromEvent(event) as string;
        this.filter.emit(value);
    }
}
